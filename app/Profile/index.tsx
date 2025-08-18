import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, Image, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
  const [location, setLocation] = useState<string>("Fetching location...");
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [form, setForm] = useState({
    name: "Chitti Dev",
    email: "chitti@camelq.in",
    dob: "1999-09-18",
    gender: "Male",
    phone: "+91 9553026345",
    address: "H.No: 1-95/A, Kunchavelli, Telangana, India",
    lastLogin: "13/08/25 09:02",
    avatar: "https://i.pravatar.cc/150?img=12",
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation("Permission Denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const { name, street, city, region, postalCode, country } = reverseGeocode[0];
        setLocation(`${name || ""} ${street || ""}, ${city || ""}, ${region || ""}, ${postalCode || ""}, ${country || ""}`);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("profile_url", {
      uri: form.avatar,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);
    formData.append("fullname", form.name);
    formData.append("email", form.email);
    formData.append("DateofBirth", form.dob);
    formData.append("Gender", form.gender);
    try {
      const res = await fetch("http://192.168.0.32:3000/profile/send-otp?phone=9553026345", {
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (!res.ok) throw new Error("");
      Alert.alert("✅ Updated Successfully!");
      setModalVisible(false);
    } catch (err: any) {
      Alert.alert("❌ Failed", err.message);
    }
  };

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return Alert.alert("Permission Denied!");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setForm({ ...form, avatar: result.assets[0].uri });
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      setForm({ ...form, dob: dateStr });
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header Card */}
      <View className="bg-white rounded-xl mx-4 mt-5 p-4 shadow-sm">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{ uri: form.avatar }}
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
          </TouchableOpacity>
          <View className="ml-4">
            <Text className="text-lg font-semibold">{form.name}</Text>
            <Text className="text-sm text-gray-500">Last Login: {form.lastLogin}</Text>
          </View>
        </View>
      </View>

      {/* Details Card */}
      <View className="bg-white rounded-xl mx-4 mt-5 p-4 shadow-sm">
        <Text className="text-gray-700 mb-2">📱 Phone Number</Text>
        <Text className="font-medium">{form.phone}</Text>

        <View className="border-b border-gray-200 my-3" />

        <Text className="text-gray-700 mb-2">📧 Email</Text>
        <Text className="font-medium">{form.email}</Text>

        <View className="border-b border-gray-200 my-3" />

        <Text className="text-gray-700 mb-2">🏠 Address</Text>
        <Text className="font-medium">{location}</Text>

        <View className="border-b border-gray-200 my-3" />

        <Text className="text-gray-700 mb-2">📅 DOB</Text>
        <Text className="font-medium">{form.dob}</Text>

        <View className="border-b border-gray-200 my-3" />

        <Text className="text-gray-700 mb-2">⚧ Gender</Text>
        <Text className="font-medium">{form.gender}</Text>
      </View>

      {/* Update Button */}
      <TouchableOpacity
        className="my-6 mx-4 bg-blue-600 py-3 rounded-xl shadow-md"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-center font-bold text-lg">Update Profile</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl w-11/12">
            <Text className="text-xl font-bold text-blue-700 mb-4">Update Profile</Text>

            <TextInput
              className="border border-blue-400 rounded-lg p-2 mb-3"
              placeholder="Name"
              value={form.name}
              onChangeText={(val) => setForm({ ...form, name: val })}
            />
            <TextInput
              className="border border-blue-400 rounded-lg p-2 mb-3"
              placeholder="Email"
              value={form.email}
              onChangeText={(val) => setForm({ ...form, email: val })}
              keyboardType="email-address"
            />

            {/* DOB Date Picker */}
            <TouchableOpacity
              className="border border-blue-400 rounded-lg p-3 mb-3"
              onPress={() => setShowDatePicker(true)}
            >
              <Text className="text-blue-600">{form.dob || "Select DOB"}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={new Date(form.dob)}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onDateChange}
              />
            )}

            <TextInput
              className="border border-blue-400 rounded-lg p-2 mb-5"
              placeholder="Gender"
              value={form.gender}
              onChangeText={(val) => setForm({ ...form, gender: val })}
            />

            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-blue-500 px-4 py-2 rounded-lg"
                onPress={handleSubmit}
              >
                <Text className="text-white font-semibold">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-gray-700 font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;
