import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

const MedicalAssistanceForm = () => {
  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location permission denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(`https://maps.google.com/?q=${loc.coords.latitude},${loc.coords.longitude}`);
    })();
  }, []);

  const handleSubmit = () => {
    if (!name || !condition) {
      Alert.alert('Please fill all fields');
      return;
    }

    const report = {
      name,
      condition,
      location,
    };

    console.log('🩺 Medical Report:', report);
    Alert.alert('Submitted', 'Medical assistance request has been sent.');

    // Optionally, send this data to backend
  };

  return (

    // <LinearGradient
    //   colors={['#FFF9C4', '#B3E5FC']} // light yellow to light blue
    //   start={{ x: 0.5, y: 0 }} // top center
    //   end={{ x: 0.5, y: 1 }}   // bottom center
    //   className="flex-1 justify-center items-center py-10"
    // >
    //   <BlurView intensity={50} tint="light" className='px-6 w-[85%] flex-1 border border-gray-300 rounded-2xl overflow-hidden'>
    <View className="flex-1 justify-center items-center py-10 px-5">
      <View className='px-6 flex-1 flex-col border border-gray-300 rounded-2xl overflow-hidden'>
        <View className="flex-1 px-6 py-8">
          <Text className="text-2xl font-bold text-gray-800 mt-10 mb-6">Medical Assistance</Text>

          <TextInput
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded-md p-3 mb-4"
          />

          <TextInput
            placeholder="Medical Condition / Issue"
            value={condition}
            onChangeText={setCondition}
            multiline
            numberOfLines={3}
            className="border border-gray-300 rounded-md p-3 mb-4 h-20"
          />

          <TouchableOpacity
            className="bg-green-600 rounded-md py-4"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center font-semibold">Request Help</Text>
          </TouchableOpacity>

          {location && (
            <Text className="text-xs text-gray-500 mt-4">
              📍 Location: {location}
            </Text>
          )}
        </View>
      </View>
    </View>
    // </BlurView>
    // </LinearGradient>
  );
};

export default MedicalAssistanceForm;
