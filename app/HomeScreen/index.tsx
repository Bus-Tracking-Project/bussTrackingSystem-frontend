import WelcomeSection from '@/components/WelcomeSection'
import { useRouter } from 'expo-router'
import { X } from 'lucide-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { useToast } from 'react-native-toast-notifications'

const { width } = Dimensions.get('window');

const Home = () => {
  const toast = useToast();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const translateX = useRef(new Animated.Value(-width)).current;

  const images = [
    require('@/assets/images/findYourBus.jpg'),
    require('@/assets/images/accident.jpg'),
    require('@/assets/images/Banner.png'),
  ];

  useEffect(() => {
    toast.show(`Welcome passenger Happy journey !`, {
      type: 'success',
      duration: 3000,
    });
  }, []);

  const toggleSidebar = () => {
    const nextState = !sidebarOpen;
    setSidebarOpen(nextState);
    Animated.timing(translateX, {
      toValue: nextState ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const [page, setPage] = useState(0);
  return (
    <>
      <ScrollView className='w-full px-10 h-screen bg-white'>
        <WelcomeSection />
        <Text className="text-2xl font-semibold my-3">Features</Text>
        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity className='border border-gray-200 rounded-3xl h-40 w-44 overflow-hidden mb-4' onPress={() => router.push('../SearchByNumber')} >
            <View className='flex-1 items-center justify-center bg-white'>
              <Image source={require('../../assets/images/license-plate.png')} className='w-20 h-20' />
              <Text className='text-1xl font-semibold text-center bg-white'>Search By Number</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='border border-gray-200 rounded-3xl h-40 w-44 overflow-hidden mb-4' onPress={() => router.push('../SearchByRout')} >
            <View className='flex-1 items-center justify-center bg-white'>
              <Image source={require('../../assets/images/route.png')} className='w-20 h-20' />
              <Text className='text-1xl font-semibold text-center bg-white'>Search By route</Text>
            </View>
          </TouchableOpacity>
          {/* 🔥 Background Image Card */}
          <View className="rounded-3xl h-60 w-full mb-4 overflow-hidden">
            <PagerView
              style={{ flex: 1 }}
              initialPage={0}
              onPageSelected={(e) => setPage(e.nativeEvent.position)}
            >
              {images.map((img, index) => (
                <View key={index}>
                  <Image
                    source={img}
                    resizeMode="cover"
                    className="w-full h-full"
                    style={{ borderRadius: 15 }}
                  />
                </View>
              ))}
            </PagerView>
            {/* Dots Indicator */}
            <View className="absolute bottom-2 w-full flex-row justify-center gap-2">
              {images.map((_, index) => (
                <View
                  key={index}
                  className={`h-2 w-2 rounded-full ${page === index ? "bg-blue-600 w-4" : "bg-gray-300"
                    }`}
                />
              ))}
            </View>
            {/* </View> */}
          </View>
          <TouchableOpacity className='border border-gray-200 rounded-3xl h-40 w-44 overflow-hidden mb-4' onPress={() => router.push('../GoogleMap')} >
            <View className='flex-1 items-center justify-center bg-white'>
              <Image source={require('../../assets/images/nearby.png')} className='w-20 h-20' />
              <Text className='text-1xl font-semibold text-center bg-white'>Nearby by Bus Stops</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='border border-gray-200 rounded-3xl h-40 w-44 overflow-hidden mb-4' onPress={() => router.push('../Sos')}>
            <View className='flex-1 items-center justify-center bg-white'>
              <Image source={require('../../assets/images/sos.png')} className='w-20 h-20' />
              <Text className='text-1xl font-semibold text-center bg-white'>SOS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='border border-gray-200 rounded-3xl h-40 w-44 overflow-hidden mb-4' onPress={() => router.push('../emergency')}>
            <View className='flex-1 items-center justify-center bg-white'>
              <Image source={require('../../assets/images/ambulance.png')} className='w-20 h-20' />
              <Text className='text-1xl font-semibold text-center bg-white'>emergency</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='border border-gray-200 rounded-3xl h-40 w-44 overflow-hidden mb-4' onPress={() => router.push('../ContactUs')}>
            <View className='flex-1 items-center justify-center bg-white'>
              <Image source={require('../../assets/images/help-desk.png')} className='w-20 h-20' />
              <Text className='text-1xl font-semibold text-center bg-white'>contact us</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* </BlurView> */}
      </ScrollView >
      {/* Sidebar */}
      < Animated.View
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
        }
        }
      >
        <View className='px-5 bg-white'>
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
      </Animated.View >
    </>
  );
};

export default Home;