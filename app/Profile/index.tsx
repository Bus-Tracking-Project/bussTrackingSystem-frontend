import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";


const ProfileScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [form, setForm] = useState({
    name: "Chitti Dev",
    email: "chitti@camelq.in",
    dob: "1999-09-18",
    gender: "Male",
    avatar: "https://i.pravatar.cc/150?img=12",
  });

  const handleSubmit = async () => {
    const formData = new FormData();

    // 👇 Add file
    formData.append("profile_url", {
      uri: form.avatar,
      name: "profile.jpg",
      type: "image/jpeg", // or image/png
    } as any);

    // 👇 Add form fields
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
      console.log(res.formData.name)
      if (!res.ok) throw new Error("");
      Alert.alert("✅ Updated Successfully!");
      setModalVisible(false);
      //  navigation.navigate("OTP"); // ✅ Use your navigator's registered screen name
    } catch (err: any) {
      console.log(err)
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
    // <SafeAreaView style={{ flex: 1backgroundColor: '#060b22', }}>
      <>
        <View className="flex-1 bg-blue-100 p-6 items-center pt-[20%]">
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{ uri: form.avatar }}
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
            <Text className="text-blue-500 text-sm text-center mt-1">Change Avatar</Text>
          </TouchableOpacity>

          <Text className="text-2xl font-bold text-blue-900 mt-4">{form.name}</Text>
          <Text className="text-base text-blue-800 mt-1">{form.email}</Text>

          <View className="bg-blue-200 w-full mt-6 rounded-xl p-4">
            <Text className="text-blue-900 font-semibold">
              📅 DOB: <Text className="font-normal">{form.dob}</Text>
            </Text>
            <Text className="text-blue-900 font-semibold mt-2">
              ⚧ Gender: <Text className="font-normal">{form.gender}</Text>
            </Text>
          </View>

          <TouchableOpacity
            className="mt-8 bg-blue-600 px-6 py-3 rounded-xl shadow-md"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-white font-bold text-lg">Update</Text>
          </TouchableOpacity>

          {/* Modal */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setModalVisible(false)}
          >
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
        </View>
      </>
    // </SafeAreaView>
  );
};

export default ProfileScreen;
