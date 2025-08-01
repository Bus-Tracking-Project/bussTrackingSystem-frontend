// app/emergency/women-safety.tsx
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

const WomenSafetyForm = () => {
  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied to access location');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const coords = loc.coords;
      setLocation(`https://maps.google.com/?q=${coords.latitude},${coords.longitude}`);
    })();
  }, []);

  const handleSubmit = () => {
    setName('')
    setIssue('')
    setDescription('')
    setLocation('')
    
    if (!name || !issue) {
      Alert.alert('Please fill required fields');
      return;
    }

    // You can now send this data to server or SMS
    console.log({ name, issue, description, location });

    Alert.alert('Submitted!', 'Your emergency report has been sent.');
  };

  return (
    <View className="flex-1 bg-gray-100 px-6 py-8">
      <Text className="text-2xl font-bold text-black mt-10 mb-6">Women Safety Report</Text>

      <TextInput
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 rounded-md p-3 mb-4"
      />

      <TextInput
        placeholder="Issue Type (e.g. harassment)"
        value={issue}
        onChangeText={setIssue}
        className="border border-gray-300 rounded-md p-3 mb-4"
      />

      <TextInput
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        className="border border-gray-300 rounded-md p-3 mb-4 h-24"
      />

      <TouchableOpacity
        className="bg-red-600 rounded-md py-4"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-semibold">Submit Report</Text>
      </TouchableOpacity>

      {location && (
        <Text className="text-xs text-gray-500 mt-4">
          📍 Location: {location}
        </Text>
      )}
    </View>
  );
};

export default WomenSafetyForm;
