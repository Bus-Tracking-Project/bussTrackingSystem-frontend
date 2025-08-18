import { MapPin, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const FromToSearch = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);

    type Bus = {
        busNumber: string;
        basicInfo: {
            driverName: string;
            conductor: string;
            busType: string;
            routeName: string;
            busStatus: string;
        };
        moreInfo: {
            currentLocation: string;
            nextStop: string;
            lastUpdated: string;
            etaToNextStop: string;
            startTime: string;
            endTime: string;
            totalStops: string[];
            currentStop: string;
            driverContact: string;
            busFrequency: string;
            passengerCountStatus: string;
            alerts: string[];
            isFavorite: boolean;
        };
    };

    const res: Bus[] = [
        {
            busNumber: 'TG1234',
            basicInfo: {
                driverName: 'Raju',
                conductor: 'Laxman',
                busType: 'Palle Velugu',
                routeName: 'Hanamkonda to Warangal',
                busStatus: 'on-time',
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
        },
        {
            busNumber: 'TS4521',
            basicInfo: {
                driverName: 'Srinivas',
                conductor: 'Kiran',
                busType: 'Express',
                routeName: 'Warangal to Hyderabad',
                busStatus: 'arriving',
            },
            moreInfo: {
                currentLocation: 'Jangaon',
                nextStop: 'Aleru',
                lastUpdated: '1 min ago',
                etaToNextStop: '12 mins',
                startTime: '05:30 AM',
                endTime: '09:00 PM',
                totalStops: [
                    'Warangal',
                    'Jangaon',
                    'Aleru',
                    'Bhongir',
                    'Uppal',
                    'Hyderabad MGBS',
                ],
                currentStop: 'Jangaon',
                driverContact: 'xxxxxx5678',
                busFrequency: 'Every 1 hour',
                passengerCountStatus: 'Crowded',
                alerts: ['Heavy rain near Aleru'],
                isFavorite: true,
            },
        },
        {
            busNumber: 'TS9090',
            basicInfo: {
                driverName: 'Kamal',
                conductor: 'Praveen',
                busType: 'Metro Deluxe',
                routeName: 'Khammam to Bhadrachalam',
                busStatus: 'delayed',
            },
            moreInfo: {
                currentLocation: 'Wyra',
                nextStop: 'Sathupalli',
                lastUpdated: '5 mins ago',
                etaToNextStop: '20 mins',
                startTime: '07:00 AM',
                endTime: '08:00 PM',
                totalStops: [
                    'Khammam',
                    'Wyra',
                    'Sathupalli',
                    'Kothagudem',
                    'Bhadrachalam',
                ],
                currentStop: 'Wyra',
                driverContact: 'xxxxxx8765',
                busFrequency: 'Every 2 hours',
                passengerCountStatus: 'Empty',
                alerts: ['Bus delayed due to engine issue'],
                isFavorite: false,
            },
        },
    ];

    const handleSubmit = () => {
        const results = res.filter(bus =>
            bus.moreInfo.totalStops.some(
                stop =>
                    stop.toLowerCase().includes(from.toLowerCase()) ||
                    stop.toLowerCase().includes(to.toLowerCase())
            )
        );
        setFilteredBuses(results);
    };

    return (
        <View className="flex-1 px-5 py-4">
            {/* Search Form */}
            <View className="w-full px-5 py-4 gap-5 border border-gray-300 rounded-2xl">
                <Text className="font-bold text-center text-2xl text-[#1E40AF]">Find Your Bus</Text>

                {/* From Input */}
                <View className="flex-row items-center border-b-2 border-gray-500 px-4 py-3 space-x-3">
                    <MapPin size={20} color="#1E40AF" />
                    <TextInput
                        className="flex-1 text-[#1E40AF]"
                        placeholder="From"
                        placeholderTextColor="#94a3b8"
                        value={from}
                        onChangeText={setFrom}
                    />
                </View>

                {/* To Input */}
                <View className="flex-row items-center border-b-2 border-gray-500 px-4 py-3 space-x-3">
                    <MapPin size={20} color="#1E40AF" />
                    <TextInput
                        className="flex-1 text-[#1E40AF]"
                        placeholder="To"
                        placeholderTextColor="#94a3b8"
                        value={to}
                        onChangeText={setTo}
                    />
                </View>

                {/* Search Button */}
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-[#1E40AF] py-3 rounded-xl flex-row justify-center items-center space-x-2"
                >
                    <Search size={18} color="#fff" />
                    <Text className="text-white px-2 font-bold text-base">Search</Text>
                </TouchableOpacity>
            </View>

            {/* Search Results */}
            <ScrollView className="mt-5">
                {filteredBuses.length > 0 ? (
                    filteredBuses.map((bus, index) => (
                        <View
                            key={index}
                            className="bg-white p-4 mb-3 rounded-xl shadow-md border border-gray-100"
                        >
                            <Text className="text-lg font-bold text-[#1E40AF]">{bus.busNumber}</Text>
                            <Text className="text-gray-600">{bus.basicInfo.routeName}</Text>
                            <Text className="text-sm text-gray-500">Status: {bus.basicInfo.busStatus}</Text>
                            <Text className="mt-1 text-sm text-gray-700">
                                Current: {bus.moreInfo.currentLocation} → Next: {bus.moreInfo.nextStop}
                            </Text>
                            <Text className="text-sm text-gray-500">ETA: {bus.moreInfo.etaToNextStop}</Text>
                        </View>
                    ))
                ) : (
                    <Text className="text-center text-gray-400 mt-10">No buses found 🚏</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default FromToSearch;
