import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { X } from 'lucide-react-native'
import React, { useRef, useState } from 'react'
import { Animated, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


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
    <>
      <LinearGradient
        colors={['#FFF9C4', '#B3E5FC']} // light yellow to light blue
        start={{ x: 0.5, y: 0 }} // top center
        end={{ x: 0.5, y: 1 }}   // bottom center
        className="flex-1 justify-center items-center py-5 px-3"
      >
        {/* Body */}
        <ScrollView className='w-full p-4 h-screen'>
          <BlurView intensity={50} tint="light" className='p-5 border border-gray-300 rounded-2xl overflow-hidden'>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }} className='gap-2'>
              <TouchableOpacity className='border border-gray-200 rounded-3xl h-40 w-44 overflow-hidden' onPress={() => router.push('../SearchByNumber')} >
                <View className='px-5 py-5 bg-white'>
                  <Image source={require('../../assets/images/search1.jpg')} className='w-full h-full' />
                  <Text className='text-1xl font-semibold text-center bg-white'>Search By Number</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className='border border-gray-200 rounded-3xl h-40 w-44 overflow-hidden' onPress={() => router.push('../SearchByRout')} >
                <View className='px-5 py-5 bg-white'>
                  <Image source={require('../../assets/images/rout1.jpg')} className='w-full h-full' />
                  <Text className='text-1xl font-semibold text-center bg-white'>Search By rout</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className='border border-gray-200 rounded-3xl h-40 w-44 overflow-hidden' onPress={() => router.push('../GoogleMap')} >
                <View className='px-5 py-5 bg-white'>
                  <Image source={require('../../assets/images/stop11.jpg')} className='w-full h-full' />
                  <Text className='text-1xl font-semibold text-center bg-white'>Nearby by Bus Stops</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className='border border-gray-200 rounded-3xl h-40 w-44 overflow-hidden' onPress={() => router.push('../Sos')}>
                <View className='px-5 py-5 bg-white'>
                  <Image source={require('../../assets/images/support1.jpg')} className='w-full h-full' />
                  <Text className='text-1xl font-semibold text-center bg-white'>SOS</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className='border border-gray-200 rounded-3xl h-40 w-44 overflow-hidden' onPress={() => router.push('../emergency')}>
                <View className='px-5 py-5 bg-white'>
                  <Image source={require('../../assets/images/emergence1.png')} className='w-full h-full' />
                  <Text className='text-1xl font-semibold text-center bg-white'>emergency</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className='border border-gray-200 rounded-3xl h-40 w-44 overflow-hidden'>
                <View className='px-5 py-5 bg-white'>
                  <Image source={require('../../assets/images/support.png')} className='w-full h-full' />
                  <Text className='text-1xl font-semibold text-center bg-white'>contact us</Text>
                </View>
              </TouchableOpacity>
            </View>
          </BlurView>
        </ScrollView >
      </LinearGradient>

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
      </Animated.View>
    </>
  );
};
export default Home;