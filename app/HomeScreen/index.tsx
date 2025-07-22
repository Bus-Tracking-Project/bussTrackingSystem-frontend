import BottomNavBar from '@/components/Navbar'
import { useRouter } from 'expo-router'
import { X } from 'lucide-react-native'
import React, { useRef, useState } from 'react'
import { Animated, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
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

  const data = [
    { title: 'Search By Number', img: 'search' },
    { title: 'Search By rout', img: 'rout' },
    { title: 'Search By stops', img: 'stop' },
    { title: 'support', img: 'support' },
    { title: 'emergency', img: 'emergency' },
    { title: 'contact us', img: 'support' },
  ]
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
       <View className='h-screen text-black'>
        {/* Navbar */}
        <BottomNavBar/>
        {/* Body */}
        <View className='pt-5 px-1 h-full w-screen flex-1 flex-row flex-wrap justify-center items-center gap-10 '>
          <TouchableOpacity className='border border-gray-200 rounded-lg w-[40%] h-[25%]' onPress={() => router.push('../SearchByNumber')} >
            <View>
              <Image source={require('../../assets/images/search.png')} className='w-full h-[90%]' />
              <Text className='text-1xl font-semibold text-center'>Search By Number</Text>
            </View>
          </TouchableOpacity>
          <View className='border border-gray-200 rounded-lg w-[40%] h-[25%]'>
            <View>
              {/* <Image source={require('../../assets/images/rout.png')} className='w-full h-[90%]  ' /> */}
              <Text className='text-1xl font-semibold text-center'>Search By rout</Text>
            </View>
          </View>
          <View className='border border-gray-200 rounded-lg w-[40%] h-[25%]'>
            <View>
              {/* <Image source={require('../../assets/images/stop.png')} className='w-full h-[90%]' /> */}
              <Text className='text-1xl font-semibold text-center '>Search By stops</Text>
            </View>
          </View>
          <View className='border border-gray-200 rounded-lg w-[40%] h-[25%]'>
            <View>
                {/* <Image source={require('../../assets/images/support.png')} className='w-full h-[90%]' /> */}
              <Text className='text-1xl font-semibold text-center'>support</Text>
            </View>
          </View>
          <View className='border border-gray-200 rounded-lg w-[40%] h-[25%]'>
            <View>
                {/* <Image source={require('../../assets/images/emergency.png')} className='w-full h-[90%]' /> */}
              <Text className='text-1xl font-semibold text-center'>emergency</Text>
            </View>
          </View>
          <View className='border border-gray-200 rounded-lg w-[40%] h-[25%]'>
            <View>
                {/* <Image source={require('../../assets/images/support.png')} className='w-full h-[90%]' /> */}
              <Text className='text-1xl font-semibold text-center'>contact us</Text>
            </View>
          </View>
        </View>
        {/* </View> */}
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
