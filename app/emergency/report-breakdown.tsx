// app/emergency/report-breakdown.tsx

import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ReportBreakdownForm = () => {
  const [busNumber, setBusNumber] = useState('');
  const [issueDetails, setIssueDetails] = useState('');
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
    if (!busNumber || !issueDetails) {
      Alert.alert('Fill in all required fields');
      return;
    }

    const payload = {
      busNumber,
      issueDetails,
      location,
    };

    console.log('🚨 Breakdown Report:', payload);
    Alert.alert('Report Submitted', 'We’ve received your breakdown report.');

    // You can also POST this data to backend here
  };

  return (
    <View className="flex-1 bg-gray-100 px-6 py-8">
      <Text className="text-2xl font-bold text-gray-800 mt-10 mb-6">Report Breakdown</Text>

      <TextInput
        placeholder="Bus Number"
        value={busNumber}
        onChangeText={setBusNumber}
        className="border border-gray-300 rounded-md p-3 mb-4"
      />

      <TextInput
        placeholder="Describe the issue"
        value={issueDetails}
        onChangeText={setIssueDetails}
        multiline
        numberOfLines={4}
        className="border border-gray-300 rounded-md p-3 mb-4 h-24"
      />

      <TouchableOpacity
        className="bg-yellow-500 rounded-md py-4"
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

export default ReportBreakdownForm;
