import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Contacts from "expo-contacts";
import { Users } from "lucide-react-native"; // for nice icons
import React, { useEffect, useState } from "react";
import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";

const emergencyNumbers = [
  { label: "All-in-one Helpline", number: "112" },
  { label: "Police", number: "100" },
  { label: "Ambulance", number: "108" },
];

const EmergencySOS = () => {
  const [userContacts, setUserContacts] = useState<{ name: string; number: string }[]>([]);

  // Load saved contacts
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("emergencyContacts");
      if (saved) {
        setUserContacts(JSON.parse(saved));
      }
    })();
  }, []);

  // Call function
  const callNumber = (number: string) => {
    Linking.openURL(`tel://${number}`).catch(() => {
      Alert.alert("Oops!", "Could not open the dialer 😬");
    });
  };

  // Pick from contacts
  const pickContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "We need access to show your contacts");
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    if (data.length > 0) {
      // Just picking the first contact for now — can add a picker UI
      const picked = data.find((c) => c.phoneNumbers?.length);
      if (picked) {
        const newContact = {
          name: picked.name,
          number: picked.phoneNumbers?.[0]?.number ?? "",
        };
        const updated = [...userContacts, newContact];
        setUserContacts(updated);
        await AsyncStorage.setItem("emergencyContacts", JSON.stringify(updated));
        Alert.alert("✅ Added!", `${picked.name} saved as emergency contact`);
      }
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Title */}
        <Text className="text-3xl font-bold text-center mb-6">🚨 Emergency SOS</Text>

        {/* Emergency Numbers */}
        <View className="space-y-4">
          {emergencyNumbers.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => callNumber(item.number)}
              className="bg-red-500 py-4 px-6 mb-2 rounded-xl flex-row items-center justify-between shadow-md"
            >
              <Text className="text-white font-bold text-lg">{item.label}</Text>
              <Text className="text-white font-semibold">{item.number}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Favorite Contacts */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xl font-bold text-gray-800">❤️ Favorite Contacts</Text>
            <TouchableOpacity
              onPress={pickContact}
              className="bg-blue-500 px-3 py-1 rounded-lg"
            >
              <Text className="text-white">+ Add</Text>
            </TouchableOpacity>
          </View>

          {userContacts.length === 0 ? (
            <View className="bg-gray-200 p-6 rounded-xl items-center">
              <Users size={40} color="#555" />
              <Text className="text-gray-600 mt-2">No favorite contacts yet</Text>
              <Text className="text-gray-500 text-sm text-center">
                Add someone from your phonebook so you can call them quickly in an emergency.
              </Text>
            </View>
          ) : (
            userContacts.map((contact, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => callNumber(contact.number)}
                className="bg-white p-4 rounded-xl shadow-sm mb-3 flex-row justify-between"
              >
                <Text className="text-gray-800 font-medium">{contact.name}</Text>
                <Text className="text-blue-600">{contact.number}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default EmergencySOS;
