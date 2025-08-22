import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Update = () => {
     const [name, setName] = useState("");
        const [phone, setPhone] = useState("");
        const [email, setEmail] = useState("");
        const [address, setAddress] = useState("Current Location"); // default
        const [dob, setDob] = useState(new Date());
        const [showPicker, setShowPicker] = useState(false);
        const [gender, setGender] = useState<"male" | "female" | null>(null);
    
        return (
          <View className="flex-1 bg-white p-4">
            <Text className="text-2xl font-bold text-blue-600 mb-4">Profile</Text>
    
            {/* Name */}
            <TextInput
              className="border border-blue-400 rounded-xl px-3 py-2 mb-3"
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
            />
    
            {/* Phone */}
            <TextInput
              className="border border-blue-400 rounded-xl px-3 py-2 mb-3"
              placeholder="Enter Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
    
            {/* Email */}
            <TextInput
              className="border border-blue-400 rounded-xl px-3 py-2 mb-3"
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
    
            {/* Address */}
            <TextInput
              className="border border-blue-400 rounded-xl px-3 py-2 mb-3"
              placeholder="Enter Address"
              value={address}
              onChangeText={setAddress}
            />
    
            {/* DOB */}
            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              className="border border-blue-400 rounded-xl px-3 py-3 mb-3"
            >
              <Text className="text-gray-700">
                DOB: {dob.toDateString()}
              </Text>
            </TouchableOpacity>
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
    
            {/* Gender */}
            <View className="flex-row justify-around mb-5">
              <TouchableOpacity
                onPress={() => setGender("male")}
                className={`px-5 py-2 rounded-xl border ${gender === "male" ? "bg-blue-500" : "bg-white"
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
                className={`px-5 py-2 rounded-xl border ${gender === "female" ? "bg-blue-500" : "bg-white"
                  }`}
              >
                <Text
                  className={`${gender === "female" ? "text-white" : "text-blue-500"
                    } font-semibold`}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
    
            {/* Save Button */}
            <TouchableOpacity className="bg-blue-600 rounded-xl py-3">
              <Text className="text-white text-center text-lg font-semibold">
                Save Profile
              </Text>
            </TouchableOpacity>
          </View>
        );
      }

export default Update;
