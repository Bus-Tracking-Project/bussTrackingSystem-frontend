import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, Animated, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context'
import { Menu } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { X } from 'lucide-react-native';


const { width } = Dimensions.get('window');

const BottomNavBar = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const translateX = useRef(new Animated.Value(-width)).current;

    const toggleSidebar = () => {
        const nextState = !sidebarOpen;
        setSidebarOpen(nextState);
        Animated.timing(translateX, {
            toValue: nextState ? 0 : -width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View className='h-screen text-black'>
            {/* Navbar */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-gray-800">
                <TouchableOpacity className="p-2" onPress={toggleSidebar}>
                    <Menu color="white" size={24} />
                </TouchableOpacity>
                <Text className="text-white text-lg font-semibold">Bus Tracker</Text>
                <TouchableOpacity className="p-1" onPress={() => router.push('../Profile')}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/40' }}
                        className="w-8 h-8 rounded-full border border-white"
                    />
                </TouchableOpacity>
                <Animated.View
                    style={{
                        transform: [{ translateX }],
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: width * 0.75,
                        height: '100%',
                        backgroundColor: '#060b22',
                        padding: 20,
                        zIndex: 10,
                    }}
                >
                    <View>
                        <TouchableOpacity onPress={toggleSidebar} className="mb-4 self-end">
                            <X color="white" size={28} />
                        </TouchableOpacity>

                        <View className='text-white'>
                            <Text className="text-white text-2xl font-bold">Menu</Text>
                            <Text className="text-white text-md font-semibold mt-10">My Profile</Text>
                            <Text className="text-white text-md font-semibold mt-10">My Trips</Text>
                            <Text className="text-white text-md font-semibold mt-10">My Fvt</Text>
                            <Text className="text-white text-md font-semibold mt-10">Notification</Text>
                            <Text className="text-white text-md font-semibold mt-10">Feedback</Text>
                            <Text className="text-white text-md font-semibold mt-10">Log Out</Text>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
};

export default BottomNavBar;
