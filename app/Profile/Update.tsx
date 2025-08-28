import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
// import defaultImg from '@/assets/images/user.png'

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("Current Location");
  const [otp, setOtp] = useState('')
  const [dob, setDob] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [avatar, setAvatar] = useState('https://i.pravatar.cc/150?img=12')
  const [gender, setGender] = useState<"male" | "female" | "notToSay" | null>(null);
  type RNFile = {
    uri: string;
    type: string;
    name: string;
  };
  const [selectedFile, setSelectedFile] = useState<RNFile | null>(null);


  // <input
  //   type="file"
  //   accept="image/*"
    // onChange={e => {
    //   if (e.target.files && e.target.files[0]) {
    //     setSelectedFile(e.target.files[0]); // Use File object directly
    //     setAvatar(URL.createObjectURL(e.target.files[0])); // For preview
    //   }
    // }}
  // />
  // const BACKEND_URL = Constants.expoConfig?.extra?.BACKEND_URL;

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return Alert.alert("Permission Denied!");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setAvatar(asset.uri); // preview in <Image />

      // store for upload
      setSelectedFile({
        uri: result.assets[0].uri,
        type: result.assets[0].type ?? "image/jpeg",
        name: result.assets[0].fileName ?? "profile.jpg",
      });

    }
  };


  const handleVerifyOtp = async () => {
    if (otp === "123456") {
      setEmailVerified(true);
      alert("Email Verified ✅");
    } else {
      alert("OTP sent ");
      try {
        const formData = new FormData();

        if (selectedFile) {
          formData.append("profile_url", {
            uri: selectedFile.uri,
            type: selectedFile.type,
            name: selectedFile.name,
          } as any);
        }



        formData.append("email", email);
        formData.append("DateofBirth", dob.toISOString().split("T")[0]); // format: YYYY-MM-DD
        formData.append("Gender", gender || "Male");
        formData.append("fullname", name);

        const res = await fetch(
          "http://192.168.1.123:3000/profile/send-otp?phone=9876543021",
          {
            method: "PATCH",
            body: formData,
            // DO NOT set Content-Type manually 👈
          }
        );

        const data = await res.json();
        console.log(data, "response data");

        if (res.ok) {
          console.log("✅ Success");
        } else {
          console.log("❌ Failed:", data);
        }
      } catch (err) {
        console.log("❌ Error:", err);
      }
    }
  };




  const submitHandler = async () => {
    // name validation
    if (!name.trim() || name.length < 3) {
      Toast.show({
        type: "error",
        text1: "Enter a valid name (min 3 chars) 🚫",
        visibilityTime: 2500,
      });
      return;
    }
    try {
      const res = await fetch('http://192.168.1.128:3000/profile/send-otp?phone=9553026345', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },

      })
      console.log(res, 'data form res')
      const data = await res.json()
      console.log(data, 'data form json')
    } catch (err) {
      console.log(err)
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Enter a valid email 📧",
        visibilityTime: 2500,
      });
      return;
    }

    // otp validation
    if (!otp.trim() || otp.length !== 6) {
      Toast.show({
        type: "error",
        text1: "Enter a valid 6 digit OTP 🔑",
        visibilityTime: 2500,
      });
      return;
    }

    // gender validation
    if (!gender) {
      Toast.show({
        type: "error",
        text1: "Please select a gender 🚻",
        visibilityTime: 2500,
      });
      return;
    }

    // dob validation
    if (dob > new Date()) {
      Toast.show({
        type: "error",
        text1: "Date of birth cannot be in the future 📅",
        visibilityTime: 2500,
      });
      return;
    }

    // ✅ if all validations passed
    Toast.show({
      type: "success",
      text1: "Profile saved successfully 🎉",
      visibilityTime: 2000,
    });

    setName("");
    setEmail("");
    setOtp("");
    setDob(new Date());
    setGender(null);
  };

  return (
    <View className="flex-1 bg-white p-4 gap-5">
      <Text className="text-3xl font-bold mb-4">Profile</Text>
      <View className="w-full items-center relative">
        <Image
          source={{ uri: avatar }}
          className="w-44 h-44 rounded-full border-2 border-gray-300"
        />

        <TouchableOpacity
          onPress={pickImage}
          className="absolute bottom-[-15] right-50 bg-white rounded-full p-2 shadow-md"
        >
          <Camera size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <TextInput
        className="flex-row items-center mb-3 self-start border-0 border-gray-500 rounded-xl  py-4 px-4 w-full bg-white shadow-md"
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className="flex-row items-center mb-3 self-start border-0 border-gray-500 rounded-xl  py-4 px-4 w-full bg-white shadow-md"
      >
        <Text className="text-gray-700">
          Date of birth : {dob.toDateString()}
        </Text>
      </TouchableOpacity>
      <View className="flex-row items-center justify-between w-full gap-3 mb-3">
        <TextInput
          className="flex-1 border-0 border-gray-500 rounded-xl py-4 px-4 bg-white shadow-md"
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity className="bg-blue-500 px-4 py-4 rounded-xl" onPress={handleVerifyOtp}>
          <Text className="text-white font-bold">Send OTP</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        className="flex-row items-center mb-3 self-start border-0 border-gray-500 rounded-xl w-full py-4 px-4 bg-white shadow-md"
        placeholder="Enter 6 digits OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
      />

      {showPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDob(selectedDate);
          }}
        />
      )}

      <View className="flex-row justify-around mb-5 gap-3">
        <TouchableOpacity
          onPress={() => setGender("male")}
          className={`px-5 py-2 rounded-xl border border-gray-100 ${gender === "male" ? "bg-blue-500" : "bg-white"
            }`}
        >
          <Text
            className={`${gender === "male" ? "text-white" : "text-blue-500"
              } font-semibold`}
          >
            Male
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGender("female")}
          className={`px-5 py-2 rounded-xl border border-gray-100 ${gender === "female" ? "bg-blue-500" : "bg-white"
            }`}
        >
          <Text
            className={`${gender === "female" ? "text-white" : "text-blue-500"
              } font-semibold`}
          >
            Female
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender("notToSay")}
          className={`px-5 py-2 rounded-xl border border-gray-100 ${gender === "notToSay" ? "bg-blue-500" : "bg-white"
            }`}
        >
          <Text
            className={`${gender === "notToSay" ? "text-white" : "text-blue-500"
              } font-semibold`}
          >
            Prefer not to say
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-blue-600 rounded-xl py-3" onPress={submitHandler}>
        <Text className="text-white text-center text-lg font-semibold">
          Save Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default Update;
