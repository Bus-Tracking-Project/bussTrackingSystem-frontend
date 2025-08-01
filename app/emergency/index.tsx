import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const EmergencyScreen = () => {
  const router = useRouter()

  const emergencyOptions = [
    {
      label: 'Women Safety',
      icon: <Ionicons name="female" size={30} color="#2563eb" />,
      route: '/emergency/women-safety',
    },
    {
      label: 'Report Breakdown',
      icon: <MaterialIcons name="car-repair" size={30} color="#2563eb" />,
      route: '/emergency/report-breakdown',
    },
    {
      label: 'Medical Assistance',
      icon: <FontAwesome5 name="medkit" size={28} color="#2563eb" />,
      route: '/emergency/medical-assistance',
    },
    {
      label: 'Report Accident',
      icon: <MaterialIcons name="report-problem" size={30} color="#2563eb" />,
      route: '/emergency/report-accident',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 py-6">
      <Text className="text-2xl font-bold text-gray-800 text-center mt-10 mb-6">Emergency</Text>

      <View className="flex-row flex-wrap justify-between">
        {emergencyOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="w-[48%] h-32 bg-gray-800 rounded-xl border border-gray-200 shadow-sm mb-4 items-center justify-center"
            onPress={() => {
            if (item.route) {
              router.push(item.route as any); // ✅ Navigate on click
            }
          }}
          >
            <View className="mb-2">{item.icon}</View>
            <Text className="text-sm text-white font-medium text-center">
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default EmergencyScreen;
