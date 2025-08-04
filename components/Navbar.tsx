import { useRouter } from 'expo-router';
import { Menu, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const { width } = Dimensions.get('window');

const BottomNavBar = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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
        // <SafeAreaView style={{ flex: 1, backgroundColor: '#1d1a23', }}>
        <View className='z-10 bg-[#060b22]'>
            {/* Navbar */}
            <View className="flex-row items-center justify-between px-4 py-2">
                {/* menu btn */}
                <TouchableOpacity className="p-2" onPress={toggleSidebar}>
                    <Menu color="white" size={24} />
                </TouchableOpacity>
                {/* logo or heading */}
                <Text className="text-white text-2xl font-semibold">Bus Tracker</Text>
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
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            zIndex: 10,
                        }} />
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
                        backgroundColor: '#060b22',
                        zIndex: 10,
                    }}
                >
                    <View className='h-screen px-10 py-5 bg-[#060b22]'>
                        <TouchableOpacity onPress={toggleSidebar} className="mb-4 self-end">
                            <X color="white" size={28} />
                        </TouchableOpacity>

                        <View className='text-white'>
                            <Text className="text-white text-2xl font-bold">Menu</Text>
                            <Text
                                className="text-white text-md font-semibold mt-10"
                                onPress={() => {
                                    router.push('../HomeScreen');
                                    toggleSidebar();
                                }}
                            >
                                Home
                            </Text>
                            <Text
                                className="text-white text-md font-semibold mt-10"
                                onPress={() => {
                                    router.push('../Profile');
                                    toggleSidebar();
                                }}
                            >
                                My Profile
                            </Text>
                            <Text
                                className="text-white text-md font-semibold mt-10"
                                onPress={() => {
                                    router.push('../Trips');
                                    toggleSidebar();
                                }}
                            >
                                My Trips
                            </Text>
                            <Text
                                className="text-white text-md font-semibold mt-10"
                                onPress={() => {
                                    router.push('../MyFvt');
                                    toggleSidebar();
                                }}
                            >
                                My fvt
                            </Text>
                            <Text
                                className="text-white text-md font-semibold mt-10"
                                onPress={() => {
                                    showPopup("Hey! This is Notification Center");
                                    toggleSidebar();
                                }}
                            >
                                Notification
                            </Text>
                            <Text
                                className="text-white text-md font-semibold mt-10"
                                onPress={() => {
                                    router.push('../Feedback');
                                    toggleSidebar();
                                }}
                            >
                                Feedback
                            </Text>
                            <Text
                                className="text-white text-md font-semibold mt-10"
                                onPress={() => {
                                    showPopup("You’ve been logged out (not really 😛)");
                                    toggleSidebar();
                                }}
                            >
                                Log Out
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
                                <Text className="text-white text-center font-medium">Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}

        </View>
    );
};

export default BottomNavBar;
