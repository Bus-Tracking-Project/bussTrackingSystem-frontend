// import BottomNavBar from '@/components/Navbar';
import { MapPin, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
            {/* <SafeAreaView style={{ flex: 1, backgroundColor: '#060b22' }}> */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 items-center pt-5 bg-[#1d1a23]"
            >
                <View className="w-full px-5 gap-5">
                    <Text className="font-bold text-center text-2xl text-[#6644b5]">Find Your Bus</Text>

                    {/* From Input */}
                    <View className="flex-row items-center border-b-2 border-gray-600 px-4 py-3 space-x-3">
                        <MapPin size={20} color="#6644b5" />
                        <TextInput
                            className="flex-1 text-gray-300"
                            placeholder="From"
                            placeholderTextColor="#94a3b8"
                            value={from}
                            onChangeText={setFrom}
                        />
                    </View>

                    {/* To Input */}
                    <View className="flex-row items-center border-b-2 border-gray-600 px-4 py-3 space-x-3">
                        <MapPin size={20} color="#6644b5" />
                        <TextInput
                            className="flex-1 text-gray-300"
                            placeholder="To"
                            placeholderTextColor="#94a3b8"
                            value={to}
                            onChangeText={setTo}
                        />
                    </View>

                    {/* Search Button */}
                    <TouchableOpacity
                        onPress={handleSubmit}
                        className="bg-[#6644b5] py-3 rounded-xl flex-row justify-center items-center space-x-2"
                    >
                        <Search size={18} color="#fff" />
                        <Text className="text-gray-300 px-2 font-bold text-base">Search</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            {/* </SafeAreaView> */}
        </>
    );
};
export default FromToSearch;