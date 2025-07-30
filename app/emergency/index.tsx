// EmergencySOS.tsx
import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const getContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    if (data.length > 0) {
      console.log('Contacts fetched:', data);
      // Now show them in a list or modal to pick
    }
  } else {
    Alert.alert("Permission denied", "We need access to show your contacts");
  }
};


const emergencyNumbers = [
  { label: 'All-in-one Helpline', number: '112' },
  { label: 'Police', number: '100' },
  { label: 'Ambulance', number: '108' },
];

const callNumber = (number: string) => {
  Linking.openURL(`tel://${number}`).catch(() => {
    Alert.alert('Oops!', 'Could not open the dialer 😬');
  });
};
// const EmergencySOS = () => {


const EmergencySOS = () => {
  const [userContacts, setUserContacts] = useState<{ name: string; number: string }[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        // Filter and map contacts with at least one phone number
        const contacts = data
          .filter(c => c.phoneNumbers && c.phoneNumbers.length > 0)
          .map(c => ({
            name: c.name,
            number: c.phoneNumbers?.[0]?.number ?? '',
          }));
        setUserContacts(contacts);
      } else {
        Alert.alert("Permission denied", "We need access to show your contacts");
      }
    })();
  }, []);

  return (
    <View className="flex-1 bg-[#060b22] p-6">
      <Text className="text-3xl font-bold text-gray-300 mt-10">Emergency SOS</Text>
      <View className='mt-10 '>
        {emergencyNumbers.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => callNumber(item.number)}
            className="bg-gray-200 w-full py-4 px-6 mb-4 rounded-xl shadow-md"
          >
            <Text className="text-red-500 font-bold text-xl text-center">
              {item.label} ({item.number})
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView>
        <Text className="text-xl font-bold text-gray-300 mt-8">Your Emergency Contacts</Text>
        {userContacts.length === 0 ? (
          <Text className="text-gray-400 mt-2">No contacts found or permission denied.</Text>
        ) : (
          userContacts.map((contact, index) => (
            <TouchableOpacity key={index} onPress={() => callNumber(contact.number)}>
              <Text className="text-gray-200">{contact.name} ({contact.number})</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default EmergencySOS
