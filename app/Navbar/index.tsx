import React from 'react';
import { View, TouchableOpacity, Button } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const BottomNavBar = () => {
    const router = useRouter();

    return (
        <SafeAreaView>
        <View className="flex-row justify-around items-center bg-white py-3 border-t border-gray-200 rounded">
            <TouchableOpacity onPress={() => router.push('../Profile')}>
                <Ionicons name="home" size={22} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('../Profile')}>
                <MaterialIcons name="location-on" size={22} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('../Profile')}>
                <Ionicons name="person" size={22} color="#333" />
            </TouchableOpacity>
            <Button title='click' onPress={()=>router.back()} />
        </View>
        </SafeAreaView>
    );
};

export default BottomNavBar;
