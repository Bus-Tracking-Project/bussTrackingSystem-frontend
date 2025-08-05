import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Bus, Search } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const index = () => {
  // dummy data 
  type Bus = {
    busNumber: string;
    basicInfo: {
      driverName: string;
      conductor: string;
      busType: string;
      routeName: string;
      busStatus: string;
    };
    moreInfo: {
      currentLocation: string;
      nextStop: string;
      lastUpdated: string;
      etaToNextStop: string;
      startTime: string;
      endTime: string;
      totalStops: string[];
      currentStop: string;
      driverContact: string;
      busFrequency: string;
      passengerCountStatus: string;
      alerts: string[];
      isFavorite: boolean;
    };
  };
  const res = [
    {
      busNumber: 'TG1234',
      basicInfo: {
        driverName: 'Raju',
        conductor: 'Laxman',
        busType: 'Palle Velugu',
        routeName: 'Hanamkonda to Warangal',
        busStatus: 'Not Yet Started',
      },
      moreInfo: {
        currentLocation: 'Hanamkonda Bus Stand',
        nextStop: 'Kazipet X Road',
        lastUpdated: '2 mins ago',
        etaToNextStop: '7 mins',
        startTime: '06:00 AM',
        endTime: '10:00 PM',
        totalStops: [
          'Hanamkonda Bus Stand',
          'Kazipet X Road',
          'Fathe Sagar',
          'Warangal Bus Stand',
        ],
        currentStop: 'Hanamkonda Bus Stand',
        driverContact: 'xxxxxx1234',
        busFrequency: 'Every 20 mins',
        passengerCountStatus: 'Moderate',
        alerts: ['Traffic at Kazipet', 'Route diversion near Fathe Sagar'],
        isFavorite: false,
      },
    },
    {
      busNumber: 'TS4521',
      basicInfo: {
        driverName: 'Srinivas',
        conductor: 'Kiran',
        busType: 'Express',
        routeName: 'Warangal to Hyderabad',
        busStatus: 'Running',
      },
      moreInfo: {
        currentLocation: 'Jangaon',
        nextStop: 'Aleru',
        lastUpdated: '1 min ago',
        etaToNextStop: '12 mins',
        startTime: '05:30 AM',
        endTime: '09:00 PM',
        totalStops: [
          'Warangal',
          'Jangaon',
          'Aleru',
          'Bhongir',
          'Uppal',
          'Hyderabad MGBS',
        ],
        currentStop: 'Jangaon',
        driverContact: 'xxxxxx5678',
        busFrequency: 'Every 1 hour',
        passengerCountStatus: 'Crowded',
        alerts: ['Heavy rain near Aleru'],
        isFavorite: true,
      },
    },
    {
      busNumber: 'TS9090',
      basicInfo: {
        driverName: 'Kamal',
        conductor: 'Praveen',
        busType: 'Metro Deluxe',
        routeName: 'Khammam to Bhadrachalam',
        busStatus: 'Delayed',
      },
      moreInfo: {
        currentLocation: 'Wyra',
        nextStop: 'Sathupalli',
        lastUpdated: '5 mins ago',
        etaToNextStop: '20 mins',
        startTime: '07:00 AM',
        endTime: '08:00 PM',
        totalStops: [
          'Khammam',
          'Wyra',
          'Sathupalli',
          'Kothagudem',
          'Bhadrachalam',
        ],
        currentStop: 'Wyra',
        driverContact: 'xxxxxx8765',
        busFrequency: 'Every 2 hours',
        passengerCountStatus: 'Empty',
        alerts: ['Bus delayed due to engine issue'],
        isFavorite: false,
      },
    },
  ];

  const [Number, setNumber] = useState('');
  const [busData, setBusData] = useState<Bus[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const handleSubmit = () => {
    console.log("number :", Number);
    // Plug this into your API or nav flow
    const filteredData = res.filter((bus) =>
      bus.busNumber.toLowerCase().includes(Number.toLowerCase())
    );
    setBusData(filteredData);
  };
  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return (
      <>
        <LinearGradient
                colors={['#FFF9C4', '#B3E5FC']} // light yellow to light blue
                start={{ x: 0.5, y: 0 }} // top center
                end={{ x: 0.5, y: 1 }}   // bottom center
                // className="flex-1 justify-center items-center py-5 px-3"
                className="flex-1 items-center p-5 bg-[#1d1a23]"
                >
         <BlurView intensity={50} tint="light" className="w-full px-5 py-4 gap-5 h-full border border-gray-300 rounded-2xl overflow-hidden">
            <Text className="font-bold text-center text-2xl text-[#1E40AF]">Enter Bus Number</Text>

            {/* From Input */}
            <View className="flex-row items-center border-b-2 border-gray-500 px-4 py-3 space-x-3">
              <Bus size={20} color="#1E40AF" />
              <TextInput
                className="flex-1 text-[#1E40AF]"
                placeholder=" eg : TG10932"
                placeholderTextColor="#1E40AF"
                value={Number}
                onChangeText={setNumber}
              />
            </View>

            {/* Search Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#1E40AF] py-3 rounded-xl flex-row justify-center items-center space-x-2"
            >
              <Search size={18} color="#fff" />
              <Text className="px-2 font-bold text-base text-white">Find my Bus</Text>
            </TouchableOpacity>

            {/* result component */}
            <View className='bg-[#040c2f] border-none rounded-lg w-full my-2'>
              <ScrollView className="p-4">
                {busData.length === 0 ? (
                  <Text className="text-center text-gray-500">No buses found.</Text>
                ) : (
                  busData.map((bus, index) => (
                    <View key={index} className="bg-white rounded-2xl shadow-md p-4 mb-4">
                      <Text className="text-xl font-bold text-blue-700">🚌 {bus.busNumber}</Text>
                      <Text className="text-base">Route: {bus.basicInfo.routeName}</Text>
                      <Text className="text-sm text-gray-600">Status: {bus.basicInfo.busStatus}</Text>
                      <Text className="text-sm text-gray-600">Type: {bus.basicInfo.busType}</Text>
                      <Text className="text-sm text-gray-600">Driver: {bus.basicInfo.driverName}</Text>

                      <TouchableOpacity
                        className="mt-2 bg-blue-500 rounded-xl px-4 py-1"
                        onPress={() => toggleExpand(index)}
                      >
                        <Text className="text-white text-center">
                          {expanded[index] ? 'Hide Details' : 'See More'}
                        </Text>
                      </TouchableOpacity>

                      {expanded[index] && (
                        <View className="mt-3 space-y-1">
                          <Text>📍 Current: {bus.moreInfo.currentLocation}</Text>
                          <Text>➡️ Next Stop: {bus.moreInfo.nextStop}</Text>
                          <Text>🕒 ETA: {bus.moreInfo.etaToNextStop}</Text>
                          <Text>⏰ Time: {bus.moreInfo.startTime} - {bus.moreInfo.endTime}</Text>
                          <Text>🛑 Stops:</Text>
                          {bus.moreInfo.totalStops.map((stop, i) => (
                            <Text key={i} className="ml-2">• {stop}</Text>
                          ))}
                          <Text>📞 Driver Contact: {bus.moreInfo.driverContact}</Text>
                          <Text>📈 Frequency: {bus.moreInfo.busFrequency}</Text>
                          <Text>👥 Crowd: {bus.moreInfo.passengerCountStatus}</Text>
                          <Text>🚨 Alerts:</Text>
                          {bus.moreInfo.alerts.map((alert, i) => (
                            <Text key={i} className="ml-2 text-red-500">• {alert}</Text>
                          ))}
                        </View>
                      )}
                    </View>
                  )))}
              </ScrollView>
            </View>
          </BlurView>
        </LinearGradient>
      </>
    // </SafeAreaView>
  )
}

export default index
