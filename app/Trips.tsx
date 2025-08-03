import BottomNavBar from '@/components/Navbar';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Trips = () => {
    const router = useRouter();

    const busData = {
        busNumber: 'TG1234',
        basicInfo: {
            driverName: 'Raju',
            conductor: 'Laxman',
            busType: 'Palle Velugu',
            routeName: 'Hanamkonda to Warangal',
            busStatus: 'Not Yet Started',
        },
        moreInfo: {
            currentLocation: 'Hanamkonda Bus Stand',
            nextStop: 'Kazipet X Road',
            lastUpdated: '2 mins ago',
            etaToNextStop: '7 mins',
            startTime: '06:00 AM',
            endTime: '10:00 PM',
            totalStops: [
                'Hanamkonda Bus Stand',
                'Kazipet X Road',
                'Fathe Sagar',
                'Warangal Bus Stand',
            ],
            currentStop: 'Hanamkonda Bus Stand',
            driverContact: 'xxxxxx1234',
            busFrequency: 'Every 20 mins',
            passengerCountStatus: 'Moderate',
            alerts: ['Traffic at Kazipet', 'Route diversion near Fathe Sagar'],
            isFavorite: false,
        },
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <BottomNavBar/>
            <ScrollView className="flex-1 bg-white p-4">
                <Text className="text-black text-2xl font-bold mb-4">My Trips</Text>

                {/* Basic Info */}
                <View className="bg-gray-100 p-4 rounded-xl mb-4">
                    <Text className="text-lg font-semibold text-blue-700">Bus Number: {busData.busNumber}</Text>
                    <Text>Driver: {busData.basicInfo.driverName}</Text>
                    <Text>Conductor: {busData.basicInfo.conductor}</Text>
                    <Text>Type: {busData.basicInfo.busType}</Text>
                    <Text>Route: {busData.basicInfo.routeName}</Text>
                    <Text>Status: {busData.basicInfo.busStatus}</Text>
                </View>

                {/* More Info */}
                <View className="bg-gray-100 p-4 rounded-xl mb-4">
                    <Text className="text-lg font-semibold text-green-700 mb-2">Live Info</Text>
                    <Text>📍 Current Location: {busData.moreInfo.currentLocation}</Text>
                    <Text>⏭️ Next Stop: {busData.moreInfo.nextStop}</Text>
                    <Text>🕒 ETA to Next: {busData.moreInfo.etaToNextStop}</Text>
                    <Text>🔄 Last Updated: {busData.moreInfo.lastUpdated}</Text>
                    <Text>🕰️ Start: {busData.moreInfo.startTime} | End: {busData.moreInfo.endTime}</Text>
                    <Text>📞 Driver Contact: {busData.moreInfo.driverContact}</Text>
                    <Text>🚍 Frequency: {busData.moreInfo.busFrequency}</Text>
                    <Text>👥 Passengers: {busData.moreInfo.passengerCountStatus}</Text>
                    <Text>⭐ Favorite: {busData.moreInfo.isFavorite ? 'Yes' : 'No'}</Text>
                </View>

                {/* Stops */}
                <View className="bg-gray-100 p-4 rounded-xl mb-4">
                    <Text className="text-lg font-semibold text-purple-700 mb-2">Stops</Text>
                    {busData.moreInfo.totalStops.map((stop, index) => (
                        <Text
                            key={index}
                            className={`pl-2 ${stop === busData.moreInfo.currentStop ? 'text-blue-600 font-bold' : ''}`}
                        >
                            {index + 1}. {stop}
                        </Text>
                    ))}
                </View>

                {/* Alerts */}
                <View className="bg-red-100 p-4 rounded-xl">
                    <Text className="text-lg font-semibold text-red-700 mb-2">⚠️ Alerts</Text>
                    {busData.moreInfo.alerts.length === 0 ? (
                        <Text>No current alerts</Text>
                    ) : (
                        busData.moreInfo.alerts.map((alert, index) => (
                            <Text key={index}>- {alert}</Text>
                        ))
                    )}
                </View>

                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-6 bg-blue-600 py-3 rounded-xl"
                >
                    <Text className="text-white text-center font-semibold">Go Back</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Trips;
