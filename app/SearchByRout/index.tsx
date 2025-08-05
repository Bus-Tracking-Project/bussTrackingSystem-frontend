import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const FromToSearch = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const handleSubmit = () => {
        setFrom('')
        setTo('')
        console.log("From:", from, "To:", to);
        // Plug this into your API or nav flow
    };

    return (
        <>
            <LinearGradient
                colors={['#FFF9C4', '#B3E5FC']} // light yellow to light blue
                start={{ x: 0.5, y: 0 }} // top center
                end={{ x: 0.5, y: 1 }}   // bottom center
                // className="flex-1 justify-center items-center py-5 px-3"
                className="flex-1 items-center px-5 py-4"
            >
                <BlurView intensity={50} tint="light" className="w-full px-5 py-4 gap-5 h-full border border-gray-300 rounded-2xl overflow-hidden">
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
            </BlurView>
        </LinearGradient >
            {/* </SafeAreaView> */ }
        </>
    );
};
export default FromToSearch;