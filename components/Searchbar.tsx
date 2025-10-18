import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const SearchBar = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const handleSearch = () => {
    console.log('Searching from', fromLocation, 'to', toLocation);
    // You can call API or navigate here
  };

  return (
    <View className="p-4 bg-white rounded-xl shadow-md">
      {/* From Input */}
      <View className="flex-row items-center mb-3 bg-gray-100 p-3 rounded-lg">
        <Ionicons name="location-sharp" size={20} color="#4B5563" />
        <TextInput
          className="ml-2 flex-1 text-gray-700"
          placeholder="From"
          value={fromLocation}
          onChangeText={setFromLocation}
        />
      </View>

      {/* To Input */}
      <View className="flex-row items-center mb-3 bg-gray-100 p-3 rounded-lg">
        <Ionicons name="location-outline" size={20} color="#4B5563" />
        <TextInput
          className="ml-2 flex-1 text-gray-700"
          placeholder="To"
          value={toLocation}
          onChangeText={setToLocation}
        />
      </View>

      {/* Search Button */}
      <TouchableOpacity
        className="flex-row items-center justify-center bg-blue-600 p-3 rounded-lg"
        onPress={handleSearch}
      >
        <MaterialIcons name="search" size={20} color="white" />
        <Text className="ml-2 text-white font-semibold">Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
