import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'expo-router';
import { Menu, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const BottomNavBar = () => {
    const { role, setRole } = useAuth()
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    console.log(role, 'from navbar')
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
    const showPopup = (message: string) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    return (
        <View className='z-10 py-2 bg-gray-50'>
            {/* Navbar */}
            <View className="flex-row items-center justify-between px-4 py-2">
                {/* menu btn */}
                <TouchableOpacity className="p-2" onPress={toggleSidebar}>
                    <Menu color="black" size={24} />
                </TouchableOpacity>
                {/* logo or heading */}
                <View className='flex-1 flex-row justify-center items-center'>
                    <Text className="text-blue-500 text-3xl font-semibold">Yatra</Text>
                    <Image
                        source={require('../assets/images/btslogo.png')}
                        className="w-10 h-10"
                    />
                </View>
                {/* profile pic */}
                <TouchableOpacity className="p-1" onPress={() => router.push('../Profile')}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/40' }}
                        className="w-8 h-8 rounded-full border border-white"
                    />
                </TouchableOpacity>

                {sidebarOpen && (
                    <TouchableWithoutFeedback onPress={toggleSidebar}>
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 10,
                        }}
                        />
                    </TouchableWithoutFeedback>
                )}

                <Animated.View
                    style={{
                        transform: [{ translateX }],
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: width * 0.75,
                        height: '100%',
                        backgroundColor: 'white',
                        zIndex: 10,
                    }}
                >
                    <View className='h-screen px-10 py-5 bg-white'>
                        <TouchableOpacity onPress={toggleSidebar} className="mb-4 self-end">
                            <X color="black" size={28} />
                        </TouchableOpacity>

                        {role ? 'passenger' : ''}
                        <View>
                            <Text className="text-black text-4xl font-bold">Menu</Text>
                            <Text
                                className="text-black text-md font-semibold mt-10"
                                onPress={() => {
                                    router.push(`../${role === 'passenger' ? 'HomeScreen' : 'DriverHomeScreen'}`);
                                    toggleSidebar();
                                }}
                            >
                                <View className='flex-1 flex-row gap-2'>
                                    <Image source={require('../assets/images/house.png')} className='w-5 h-5' />
                                    <Text>Home</Text>
                                </View>
                            </Text>
                            <Text
                                className="text-black text-md font-semibold mt-10"
                                onPress={() => {
                                    router.push('../Profile');
                                    toggleSidebar();
                                }}
                            >
                                <View className='flex-1 flex-row gap-2'>
                                    <Image source={require('../assets/images/profile.png')} className='w-5 h-5' />
                                    <Text>My Profile</Text>
                                </View>
                            </Text>
                            {role === 'passenger' && (
                                <View>
                                    <Text
                                        className="text-black text-md font-semibold mt-10"
                                        onPress={() => {
                                            router.push('../Trips');
                                            toggleSidebar();
                                        }}
                                    >
                                        <View className='flex-1 flex-row gap-2'>
                                            <Image source={require('../assets/images/map.png')} className='w-5 h-5' />
                                            <Text>My Trips</Text>
                                        </View>
                                    </Text>
                                    <Text
                                        className="text-black text-md font-semibold mt-10"
                                        onPress={() => {
                                            router.push('../MyFvt');
                                            toggleSidebar();
                                        }}
                                    >
                                        <View className='flex-1 flex-row gap-2'>
                                            <Image source={require('../assets/images/favourite.png')} className='w-5 h-5' />
                                            <Text>My fvt</Text>
                                        </View>
                                    </Text>
                                </View>
                            )}
                            <Text
                                className="text-black text-md font-semibold mt-10"
                                onPress={() => {
                                    router.push('../Notification')
                                    toggleSidebar();
                                }}
                            >
                                <View className='flex-1 flex-row gap-2'>
                                    <Image source={require('../assets/images/bell.png')} className='w-5 h-5' />
                                    <Text>Notification</Text>
                                </View>
                            </Text>
                            <Text
                                className="text-black text-md font-semibold mt-10"
                                onPress={() => {
                                    router.push('../Feedback');
                                    toggleSidebar();
                                }}
                            >
                                <View className='flex-1 flex-row gap-2'>
                                    <Image source={require('../assets/images/chat.png')} className='w-5 h-5' />
                                    <Text>Feedback</Text>
                                </View>
                            </Text>
                            <Text
                                className="text-black text-md font-semibold mt-10"
                                onPress={() => {
                                    router.push('../TermsConditions');
                                    toggleSidebar();
                                }}
                            >
                                <View className='flex-1 flex-row gap-2'>
                                    <Image source={require('../assets/images/conditions.png')} className='w-5 h-5' />
                                    <Text>Terms & Conditions</Text>
                                </View>
                            </Text>
                            <Text
                                className="text-black text-md font-semibold mt-10"
                                onPress={() => {
                                    // showPopup("You've been logged out (but it's not really 😛)");
                                    // toggleSidebar();
                                }}
                            >
                                <View className='flex-1 flex-row gap-2'>
                                    <Image source={require('../assets/images/logout.png')} className='w-5 h-5' />
                                    <Text>Log Out</Text>
                                </View>
                            </Text>
                        </View>
                    </View>
                </Animated.View>
            </View>
            {modalVisible && (
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View className="absolute top-0 left-0 w-full h-screen items-center justify-center z-50">
                        <View className="bg-white p-6 rounded-2xl w-[80%] shadow-lg">
                            <Text className="text-lg font-semibold text-center text-black">{modalMessage}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-4 bg-blue-600 px-4 py-2 rounded-xl">
                                <Text className="text-black text-center font-medium">Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}

        </View>
    );
};

export default BottomNavBar;
