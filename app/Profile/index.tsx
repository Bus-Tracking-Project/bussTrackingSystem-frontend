import { Calendar, Mail, MapPin, Phone, UserCircle } from "lucide-react-native";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";


const ProfileScreen = () => {
  const [location, setLocation] = useState<string>("Fetching location...");
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    phone: "",
    address: "H.No: 1-95/A, Kunchavelli, Telangana, India",
    lastLogin: "13/08/25 09:02",
    avatar: "https://i.pravatar.cc/150?img=12",
  });

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setLocation("Permission Denied");
  //       return;
  //     }

  //     let loc = await Location.getCurrentPositionAsync({});
  //     let reverseGeocode = await Location.reverseGeocodeAsync({
  //       latitude: loc.coords.latitude,
  //       longitude: loc.coords.longitude,
  //     });

  //     if (reverseGeocode.length > 0) {
  //       const { name, street, city, region, postalCode, country } = reverseGeocode[0];
  //       setLocation(`${name || ""} ${street || ""}, ${city || ""}, ${region || ""}, ${postalCode || ""}, ${country || ""}`);
  //     }
  //   })();
  // }, []);

  // const handleSubmit = async () => {
  //   if (!emailVerified) {
  //     alert("Please verify your email first!");
  //     return;
  //   }
  //   // Submit profile update
  //   alert("Profile Updated 🚀");
  //   setModalVisible(false);
  //   const formData = new FormData();
  //   formData.append("profile_url", {
  //     uri: form.avatar,
  //     name: "profile.jpg",
  //     type: "image/jpeg",
  //   } as any);
  //   formData.append("fullname", form.name);
  //   formData.append("email", form.email);
  //   formData.append("DateofBirth", form.dob);
  //   formData.append("Gender", form.gender);
  //   try {
  //     const res = await fetch(`http://10.38.120.97:3000/profile/send-otp?phone=9553026345`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       body: formData,
  //     });
  //     if (!res.ok) throw new Error("");
  //     Alert.alert("✅ Updated Successfully!");
  //     setModalVisible(false);
  //   } catch (err: any) {
  //     Alert.alert("❌ Failed", err.message);
  //   }
  //   console.log(form)
  // };

  // const pickImage = async () => {
  //   const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (!granted) return Alert.alert("Permission Denied!");
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     quality: 1,
  //   });
  //   if (!result.canceled) {
  //     setForm({ ...form, avatar: result.assets[0].uri });
  //   }
  // };

  // const handleSendOtp = () => {
  //   // Call API to send OTP here
  //   setOtpSent(true);
  // };

  // const handleVerifyOtp = () => {
  //   // Call API to verify OTP here
  //   if (otp === "123456") { // just dummy validation
  //     setEmailVerified(true);
  //     alert("Email Verified ✅");
  //   } else {
  //     alert("Invalid OTP ❌");
  //   }
  // };

  // const onDateChange = (event: any, selectedDate?: Date) => {
  //   if (selectedDate) {
  //     setForm({ ...form, dob: selectedDate.toISOString().split("T")[0] });
  //   }
  //   setShowDatePicker(false);
  //   setShowDatePicker(false);
  //   if (selectedDate) {
  //     const dateStr = selectedDate.toISOString().split("T")[0];
  //     setForm({ ...form, dob: dateStr });
  //   }
  // };

  // return (
  // <ScrollView className="flex-1 bg-gray-100">
  //   <View className="bg-white rounded-xl mx-4 mt-5 p-4 shadow-sm">
  //     <View className="flex-row items-center">
  //       <TouchableOpacity onPress={pickImage}>
  //         <Image
  //           source={{ uri: form.avatar }}
  //           className="w-16 h-16 rounded-full border-2 border-gray-300"
  //         />
  //       </TouchableOpacity>
  //       <View className="ml-4">
  //         <Text className="text-lg font-semibold">{form.name ? form.name : 'Name '}</Text>
  //         <Text className="text-sm text-gray-500">Last Login: {form.lastLogin}</Text>
  //       </View>
  //     </View>
  //   </View>

  //   <View className="bg-white rounded-xl mx-4 mt-5 p-4 shadow-sm">
  //     <Text className="text-gray-700 mb-2">📱 Phone Number</Text>
  //     <Text className="font-medium">{form.phone ? form.phone : 'phone Number'}</Text>

  //     <View className="border-b border-gray-200 my-3" />

  //     <Text className="text-gray-700 mb-2">📧 Email</Text>
  //     <Text className="font-medium">{form.email ? form.email : 'Your Email'}</Text>

  //     <View className="border-b border-gray-200 my-3" />

  //     <Text className="text-gray-700 mb-2">🏠 Address</Text>
  //     <Text className="font-medium">{location}</Text>

  //     <View className="border-b border-gray-200 my-3" />

  //     <Text className="text-gray-700 mb-2">📅 DOB</Text>
  //     <Text className="font-medium">{form.dob ? form.dob : 'date of birth'}</Text>

  //     <View className="border-b border-gray-200 my-3" />

  //     <Text className="text-gray-700 mb-2">⚧ Gender</Text>
  //     <View className="flex-row flex-wrap gap-2 mb-5">
  //       {["Male", "Female", "Prefer not to say"].map((opt) => {
  //         const selected = form.gender === opt;
  //         return (
  //           <TouchableOpacity
  //             key={opt}
  //             onPress={() => setForm({ ...form, gender: opt })}
  //             className={`px-4 py-2 rounded-full border 
  //       ${selected ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"}`}
  //           >
  //             <Text className={`${selected ? "text-white" : "text-gray-700"} font-medium`}>
  //               {opt}
  //             </Text>
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   </View>

  //   <TouchableOpacity
  //     className="my-6 mx-4 bg-blue-600 py-3 rounded-xl shadow-md"
  //     onPress={() => setModalVisible(true)}
  //   >
  //     <Text className="text-white text-center font-bold text-lg">Update Profile</Text>
  //   </TouchableOpacity> */}

  //  <Modal
  //     visible={modalVisible}
  //     animationType="slide"
  //     transparent
  //     onRequestClose={() => setModalVisible(false)}
  //   >
  //     <View className="flex-1 justify-center items-center bg-black/50">
  //       <View className="bg-white p-6 rounded-xl w-11/12">
  //         <Text className="text-xl font-bold text-blue-700 mb-4">Update Profile</Text>

  //         <TextInput
  //           className="border border-blue-400 rounded-lg p-2 mb-3"
  //           placeholder="Name"
  //           value={form.name}
  //           onChangeText={(val) => setForm({ ...form, name: val })}
  //         />

  //         <View className="flex-row items-center border border-blue-400 rounded-lg mb-3 px-2">
  //           <TextInput
  //             className="flex-1 p-2"
  //             placeholder="Email"
  //             value={form.email}
  //             onChangeText={(val) => setForm({ ...form, email: val })}
  //             keyboardType="email-address"
  //             editable={!otpSent && !emailVerified}
  //           />
  //           {!emailVerified && !otpSent && form.email ? (
  //             <TouchableOpacity
  //               className="bg-blue-500 px-3 py-1 rounded-lg"
  //               onPress={handleSendOtp}
  //             >
  //               <Text className="text-white">Verify</Text>
  //             </TouchableOpacity>
  //           ) : null}
  //         </View>

  //         {otpSent && !emailVerified && (
  //           <View className="mb-3">
  //             <TextInput
  //               className="border border-blue-400 rounded-lg p-2 mb-2 text-center tracking-widest text-lg"
  //               placeholder="Enter 6-digit OTP"
  //               maxLength={6}
  //               keyboardType="numeric"
  //               value={otp}
  //               onChangeText={setOtp}
  //             />
  //             <TouchableOpacity
  //               className="bg-green-500 px-4 py-2 rounded-lg"
  //               onPress={handleVerifyOtp}
  //             >
  //               <Text className="text-white font-semibold">Submit OTP</Text>
  //             </TouchableOpacity>
  //           </View>
  //         )}

  //         <TouchableOpacity
  //           className="border border-blue-400 rounded-lg p-3 mb-3"
  //           onPress={() => setShowDatePicker(true)}
  //         >
  //           <Text className="text-blue-600">{form.dob || "Select DOB"}</Text>
  //         </TouchableOpacity>

  //         {showDatePicker && (
  //           <DateTimePicker
  //             mode="date"
  //             value={form.dob ? new Date(form.dob) : new Date()}
  //             display={Platform.OS === "ios" ? "spinner" : "default"}
  //             onChange={onDateChange}
  //           />
  //         )}

  //         <View className="flex-row justify-between">
  //           <TouchableOpacity
  //             className="bg-blue-500 px-4 py-2 rounded-lg"
  //             onPress={handleSubmit}
  //           >
  //             <Text className="text-white font-semibold">Save</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             className="bg-gray-300 px-4 py-2 rounded-lg"
  //             onPress={() => setModalVisible(false)}
  //           >
  //             <Text className="text-gray-700 font-semibold">Cancel</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   </Modal> */}
  // </ScrollView>










  // export default function ProfileCard({
  //   name = "",
  //   phone = "9876543210",
  //   email = "john@example.com",
  //   address = "Current Location",
  //   dob = "01 Jan 2000",
  //   gender = "Male",
  // }) { }
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="bg-gray-300 rounded-xl mx-4 mt-5 p-4 shadow-sm">
        <View className="flex-1 flex-row justify-center items-center bg-gray-400">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=3" }} // random default avatar
            className="w-24 h-24 rounded-full mb-4 border-2 border-blue-400"
          />
          <View className="ml-4 flex-1 ">
            <Text className="text-lg font-semibold">{form.name ? form.name : 'Name '}</Text>
            <Text className="text-sm text-gray-500">Last Login: {form.lastLogin}</Text>
          </View>
        </View>

        {/* Phone */}
        <View className="flex-row items-center mb-3 self-start">
          <Phone color="#2563eb" size={20} />
          <Text className="ml-2 text-gray-700">36437576567</Text>
        </View>

        {/* Email */}
        <View className="flex-row items-center mb-3 self-start">
          <Mail color="#2563eb" size={20} />
          <Text className="ml-2 text-gray-700">dsfgdfsg@gferg</Text>
        </View>

        {/* Address */}
        <View className="flex-row items-center mb-3 self-start">
          <MapPin color="#2563eb" size={20} />
          <Text className="ml-2 text-gray-700">sdfsdf</Text>
        </View>

        {/* DOB */}
        <View className="flex-row items-center mb-3 self-start">
          <Calendar color="#2563eb" size={20} />
          <Text className="ml-2 text-gray-700">2432</Text>
        </View>

        {/* Gender */}
        <View className="flex-row items-center self-start">
          <UserCircle color="#2563eb" size={20} />
          <Text className="ml-2 text-gray-700">sfdg</Text>
        </View>

        {/* Update Button */}
        <TouchableOpacity className="bg-blue-600 rounded-xl py-3 px-6 mt-6 w-full">
          <Text className="text-white text-center text-lg font-semibold">
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
