import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
    <>
      <LinearGradient
        colors={['#FFF9C4', '#B3E5FC']} // light yellow to light blue
        start={{ x: 0.5, y: 0 }} // top center
        end={{ x: 0.5, y: 1 }}   // bottom center
        className="flex-1 justify-center items-center py-10 px-8"
      >
        <BlurView intensity={50} tint="light" className='px-6 flex-1 flex-col border border-gray-300 rounded-2xl overflow-hidden'>
          {/* <ScrollView className="flex-1"> */}
            <Text className="text-2xl font-bold text-gray-800 text-center mt-10 mb-6">Emergency</Text>
            <View className="flex-row flex-wrap justify-between px-3 py-2">
              {emergencyOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[48%] h-32 bg-white rounded-xl border border-gray-100 shadow-sm mb-4 items-center justify-center"
                  onPress={() => {
                    if (item.route) {
                      router.push(item.route as any); // ✅ Navigate on click
                    }
                  }}
                >
                  <View className="mb-2">{item.icon}</View>
                  <Text className="text-sm text-black font-medium text-center">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          {/* </ScrollView> */}
        </BlurView>
      </LinearGradient>
    </>
  );
};

export default EmergencyScreen;
