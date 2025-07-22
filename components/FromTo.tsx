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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 mt-5 items-center bg-white"
    >
      <View className="w-full px-5 gap-5">
        <Text className="text-xl font-bold text-center">Find Your Bus</Text>

        {/* From Input */}
        <View className="flex-row items-center border px-4 py-3 rounded-xl space-x-3">
          <MapPin size={20} color="#3b82f6" />
          <TextInput
            className="flex-1"
            placeholder="From"
            placeholderTextColor="#94a3b8"
            value={from}
            onChangeText={setFrom}
          />
        </View>

        {/* To Input */}
        <View className="flex-row items-center border px-4 py-3 rounded-xl space-x-3">
          <MapPin size={20} color="#3b82f6" />
          <TextInput
            className="flex-1"
            placeholder="To"
            placeholderTextColor="#94a3b8"
            value={to}
            onChangeText={setTo}
          />
        </View>

        {/* Search Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-600 dark:bg-blue-500 py-3 rounded-xl flex-row justify-center items-center space-x-2"
        >
          <Search size={18} color="#fff" />
          <Text className="text-white px-2 font-bold text-base">Search</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FromToSearch;
