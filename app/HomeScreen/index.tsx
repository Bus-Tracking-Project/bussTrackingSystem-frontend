import BottomNavBar from '@/components/Navbar'
import { useRouter } from 'expo-router'
import { X } from 'lucide-react-native'
import React, { useRef, useState } from 'react'
import { Animated, Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'


const { width } = Dimensions.get('window');

const Home = () => {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#060b22' }}>
      <View className='h-screen text-black bg-gray-100'>
        {/* Navbar */}
        <BottomNavBar />
        {/* Body */}
        <ScrollView className='w-full p-4'>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <TouchableOpacity className='border border-gray-200 rounded-lg w-[48%] mb-4 h-[100%]' onPress={() => router.push('../SearchByNumber')} >
              <View>
                {/* <Image source={require('../../assets/images/search.png')} className='w-full h-[90%]' /> */}
                <Text className='text-1xl font-semibold text-center'>Search By Number</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className='border border-gray-200 rounded-lg w-[48%] mb-4 h-[100%]' onPress={() => router.push('../SearchByRout')} >
              <View>
                {/* <Image source={require('../../assets/images/rout.png')} className='w-full h-[90%]  ' /> */}
                <Text className='text-1xl font-semibold text-center'>Search By rout</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className='border border-gray-200 rounded-lg w-[48%] mb-4 h-[100%]' onPress={() => router.push('../GoogleMap')} >
              <View>
                {/* <Image source={require('../../assets/images/stop.png')} className='w-full h-[90%]' /> */}
                <Text className='text-1xl font-semibold text-center'>Nearby by Bus Stops</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className='border border-gray-200 rounded-lg w-[48%] mb-4 h-[100%]' onPress={() => router.push('../Sos')}>
              <View>
                {/* <Image source={require('../../assets/images/support.png')} className='w-full h-[90%]' /> */}
                <Text className='text-1xl font-semibold text-center'>SOS</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className='border border-gray-200 rounded-lg w-[48%] mb-4 h-[100%]' onPress={() => router.push('../emergency')}>
              <View>
                {/* <Image source={require('../../assets/images/emergency.png')} className='w-full h-[90%]' /> */}
                <Text className='text-1xl font-semibold text-center'>emergency</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className='border border-gray-200 rounded-lg w-[48%] mb-4 h-[100%]'>
              <View>
                {/* <Image source={require('../../assets/images/support.png')} className='w-full h-[90%]' /> */}
                <Text className='text-1xl font-semibold text-center'>contact us</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView >
      </View>

      {/* Sidebar */}
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
    </SafeAreaView >
  );
};
export default Home;