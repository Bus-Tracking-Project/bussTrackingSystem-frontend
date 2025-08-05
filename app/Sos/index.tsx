import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import * as Contacts from 'expo-contacts';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const emergencyNumbers = [
  { label: 'All-in-one Helpline', number: '112' },
  { label: 'Police', number: '100' },
  { label: 'Ambulance', number: '108' },
];

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

const callNumber = (number: string) => {
  Linking.openURL(`tel://${number}`).catch(() => {
    Alert.alert('Oops!', 'Could not open the dialer 😬');
  });
};

const EmergencySOS = () => {
  const [userContacts, setUserContacts] = useState<{ name: string; number: string }[]>([]);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('emergencyContacts');
      if (saved) {
        setUserContacts(JSON.parse(saved));
      }
    })();
  }, []);

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
    <LinearGradient
      colors={['#FFF9C4', '#B3E5FC']} // light yellow to light blue
      start={{ x: 0.5, y: 0 }} // top center
      end={{ x: 0.5, y: 1 }}   // bottom center
      className="flex-1 justify-center items-center py-10"
    >
      <BlurView intensity={50} tint="light" className='px-6 w-[85%] flex-1 border border-gray-300 rounded-2xl overflow-hidden'>
        <Text className="text-3xl font-bold text-black text-center mt-10">Emergency SOS</Text>
        <View className='mt-10 '>
          {emergencyNumbers.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => callNumber(item.number)}
              className="bg-gray-700 w-full py-4 px-6 mb-4 rounded-xl shadow-md"
            >
              <Text className="text-white font-bold text-xl text-center">
                {item.label} ({item.number})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView>
          {/* <Text className="text-xl font-bold text-black mt-8">Your Emergency Contacts</Text>
        {userContacts.length === 0 ? (
          <Text className="text-gray-800 mt-2">No contacts found or permission denied.</Text>
        ) : (
          userContacts.map((contact, index) => (
            <TouchableOpacity key={index} onPress={() => callNumber(contact.number)}>
              <Text className="text-gray-800">{contact.name} ({contact.number})</Text>
            </TouchableOpacity>
          ))
        )} */}
          <View className='bg-gray-700 border-none rounded-xl w-[100%] h-[400px]'>
            <Text className='text-white text-center p-3'>Favorite contacts here ..</Text>
          </View>
        </ScrollView>
      </BlurView>
    </LinearGradient>
  );
};

export default EmergencySOS
