import WelcomeSection from '@/components/WelcomeSection'
import Constants from 'expo-constants'
import { useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { useToast } from 'react-native-toast-notifications'

const { width } = Dimensions.get('window');

const Home = () => {
  const API_URL = Constants.expoConfig?.extra?.API_URL;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const translateX = useRef(new Animated.Value(-width)).current;
  const pagerRef = useRef<PagerView>(null);
  const router = useRouter();
  const [page, setPage] = useState<any>(0);
  const toast = useToast();

  //this img --for cards
  const images = [
    require('@/assets/images/findYourBus.jpg'),
    require('@/assets/images/EmergencyCart.png'),
    require('@/assets/images/NearByStops.png'),
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = (page + 1) % images.length;
      setPage(nextPage);
      pagerRef.current?.setPage(nextPage); // 👈 programmatically move PagerView
    }, 1500);

    return () => clearInterval(interval);
  }, [page]);

  //toast notification 
  useEffect(() => {
    toast.show(`Welcome passenger, Happy journey !`, {
      type: 'success',
      duration: 2500,
    });
  }, []);
  
  //webstokets code here
  // useEffect(() => {
  //   // initialize socket
  //   const socket: Socket = io(API_URL, {
  //     transports: ["websocket"],
  //     query: { role: "passenger", busId: "123" }, // pass role & busId in handshake
  //   });

  //   // when connected
  //   socket.on("connect", () => {
  //     console.log("✅ Passenger connected:", socket.id);

  //     // join the bus room after successful connection
  //     socket.emit("joinBusRoom", { busId: "123" });
  //   });

  //   // when bus location updates
  //   socket.on("busLocationUpdate", (data: { lat: number; lng: number }) => {
  //     console.log("📍 Bus moved:", data);
  //     // 👉 here update your state for Google Maps marker
  //     // setBusLocation(data); 
  //   });

  //   // when disconnected
  //   socket.on("disconnect", () => {
  //     console.log("❌ Passenger disconnected");
  //   });

  //   // cleanup on unmount
  //   return () => {
  //     socket.disconnect();
  //     console.log("🔌 Socket closed on component unmount");
  //   };
  // }, []);

  return (
    <>
      <ScrollView
        className='w-full px-5 bg-white'
        contentContainerStyle={{ paddingBottom: 200 }} // gives extra space at bottom
        showsVerticalScrollIndicator={false}
      >
        <WelcomeSection />
        <Text className="text-2xl font-semibold my-3">Features</Text>
        <View className="flex-row flex-wrap justify-around">
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
          <View className="rounded-3xl h-[35%] w-full my-4 overflow-hidden">
            <PagerView
              ref={pagerRef}
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
      </ScrollView >
    </>
  );
};

export default Home;