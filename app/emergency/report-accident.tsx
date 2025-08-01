// app/emergency/report-accident.tsx

import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ReportAccidentForm = () => {
  const [reporterName, setReporterName] = useState('');
  const [accidentDetails, setAccidentDetails] = useState('');
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
    if (!reporterName || !accidentDetails) {
      Alert.alert('Please fill all required fields');
      return;
    }

    const report = {
      reporterName,
      accidentDetails,
      location,
    };

    console.log('🚗 Accident Report:', report);
    Alert.alert('Submitted', 'Accident report sent to authorities.');

    // 🚀 You can now send this data to your API or alert system
  };

  return (
    <View className="flex-1 bg-gray-100 px-6 py-8">
      <Text className="text-2xl font-bold text-gray-800 mt-10 mb-6">Report an Accident</Text>

      <TextInput
        placeholder="Your Name"
        value={reporterName}
        onChangeText={setReporterName}
        className="border border-gray-300 rounded-md p-3 mb-4"
      />

      <TextInput
        placeholder="Describe the accident"
        value={accidentDetails}
        onChangeText={setAccidentDetails}
        multiline
        numberOfLines={4}
        className="border border-gray-300 rounded-md p-3 mb-4 h-24"
      />

      <TouchableOpacity
        className="bg-blue-700 rounded-md py-4"
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

export default ReportAccidentForm;
