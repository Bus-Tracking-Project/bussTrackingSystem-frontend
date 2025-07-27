import BottomNavBar from '@/components/Navbar';
import { Bus, Search } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const index = () => {
  const [Number, setNumber] = useState('');

  const handleSubmit = () => {
    setNumber('')
    console.log("number :", Number);
    // Plug this into your API or nav flow
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#060b22' }}>
      <>
        <BottomNavBar />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 items-center pt-5 bg-[#1d1a23]"
        >
          <View className="w-full px-5 gap-5">
            <Text className="font-bold text-center text-2xl text-[#6644b5]">Enter Bus Number</Text>

            {/* From Input */}
            <View className="flex-row items-center border-b-2 border-gray-600 px-4 py-3 space-x-3">
              <Bus  size={20} color="#6644b5" />
              <TextInput
                className="flex-1 text-gray-300"
                placeholder=" eg : TG10932"
                placeholderTextColor="#94a3b8"
                value={Number}
                onChangeText={setNumber}
              />
            </View>

            {/* To Input 
            <View className="flex-row items-center border-b-2 border-gray-600 px-4 py-3 space-x-3">
              <MapPin size={20} color="#6644b5" />
              <TextInput
                className="flex-1 text-gray-300"
                placeholder="To"
                placeholderTextColor="#94a3b8"
                value={to}
                onChangeText={setTo}
              />
            </View>*/}

            {/* Search Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#6644b5] py-3 rounded-xl flex-row justify-center items-center space-x-2"
            >
              <Search size={18} color="#fff" />
              <Text className="text-gray-300 px-2 font-bold text-base">Find my Bus</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </>
    </SafeAreaView>
  )
}

export default index
