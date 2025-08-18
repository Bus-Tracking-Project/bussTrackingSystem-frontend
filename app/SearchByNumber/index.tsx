import { AlertTriangle, ArrowRight, BarChart2, Bus, Calendar, Clock, MapPin, Phone, Search, StopCircle, Users } from 'lucide-react-native';
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
        busStatus: 'on-time',
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
        alerts: ['Traffic at Kazipet', 'Route Viewersion near Fathe Sagar'],
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
        busStatus: 'arriving',
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
        busStatus: 'delayed',
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
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = () => {
    // console.log("number :", Number);
    // Plug this into your API or nav flow
    const filteredData = res.filter((bus) =>
      bus.busNumber.toLowerCase().includes(Number.toLowerCase())
    );
    setBusData(filteredData);
  };
  // const toggleExpand = (index: number) => {
  //   setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  // };
  return (
    <View className="flex-1 justify-center items-center py-5 px-3 bg-white">
      <View className="w-full px-5 py-4 gap-5 h-full overflow-hidden">
        <Text className="font-bold text-2xl text-black">Enter Bus Number</Text>
        {/* From Input */}
        <View className="flex-row items-center border-b-2 border-gray-300 px-4 py-3 space-x-3">
          <Bus size={20} color="black" />
          <TextInput
            className="flex-1 text-black]"
            placeholder=" eg : TG10932"
            placeholderTextColor="gray"
            value={Number}
            onChangeText={setNumber}
          />
          <Search size={20} color="black" onPress={handleSubmit} />
        </View>
        {/* result component */}
        <View className='border-none rounded-lg w-full h-[70%] my-10'>
          <ScrollView className="p-1">
            {busData.length === 0 ? (
              <Text className="text-center text-3xl font-extrabold text-gray-400">No buses found.</Text>
            ) : (
              busData.map((bus, index) => (
                <View className="bg-white rounded-xl shadow-md mb-3">
                  {/* Main Card */}
                  <TouchableOpacity
                    className="flex-row items-center justify-between w-full p-4 active:opacity-80"
                    onPress={() => setExpanded(!expanded)}
                    key={index}
                  >
                    {/* Left Section */}
                    <View className="flex-row items-center space-x-3">
                      <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mx-2">
                        <Bus size={24} color="#22c55e" strokeWidth={1.5} />
                      </View>
                      <View>
                        <Text className="font-semibold text-gray-900">{bus.busNumber}</Text>
                        <View className="flex-row items-center space-x-1 mt-1">
                          <MapPin size={14} color="#6b7280" strokeWidth={1.5} />
                          <Text className="text-gray-500 text-sm">
                            {bus.basicInfo.routeName}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Right Section */}
                    <View className="items-end">
                      <View className="flex-row items-center space-x-1">
                        <Clock size={14} color="#6b7280" strokeWidth={1.5} />
                        <Text className="font-semibold text-gray-900 text-sm">
                          {bus.moreInfo.etaToNextStop}
                        </Text>
                      </View>
                      <Text className="text-green-500 text-xs font-medium">
                        {bus.basicInfo.busStatus}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/* Expanded Section */}
                  {expanded && (
                    <View className="px-4 pb-4 py-2 gap-2">
                      {/* Current Location */}
                      <View className="flex-row items-center gap-2">
                        <MapPin size={18} color="#22c55e" />
                        <Text className="text-gray-700">Current: <Text className="font-semibold">{bus.moreInfo.currentLocation}</Text></Text>
                      </View>

                      {/* Next Stop */}
                      <View className="flex-row items-center gap-2">
                        <ArrowRight size={18} color="#22c55e" />
                        <Text className="text-gray-700">Next Stop: <Text className="font-semibold">{bus.moreInfo.nextStop}</Text></Text>
                      </View>

                      {/* ETA */}
                      <View className="flex-row items-center gap-2">
                        <Clock size={18} color="#22c55e" />
                        <Text className="text-gray-700">ETA: <Text className="font-semibold">{bus.moreInfo.etaToNextStop}</Text></Text>
                      </View>

                      {/* Time */}
                      <View className="flex-row items-center gap-2">
                        <Calendar size={18} color="#22c55e" />
                        <Text className="text-gray-700">
                          Time: <Text className="font-semibold">{bus.moreInfo.startTime} - {bus.moreInfo.endTime}</Text>
                        </Text>
                      </View>

                      {/* Stops */}
                      <View>
                        <View className="flex-row items-center gap-2">
                          <StopCircle size={18} color="#22c55e" />
                          <Text className="text-gray-700 font-medium">Stops:</Text>
                        </View>
                        {bus.moreInfo.totalStops.map((stop, i) => (
                          <Text key={i} className="ml-6 text-gray-600">• {stop}</Text>
                        ))}
                      </View>

                      {/* Driver Contact */}
                      <View className="flex-row items-center gap-2">
                        <Phone size={18} color="#22c55e" />
                        <Text className="text-gray-700">Driver Contact: <Text className="font-semibold">{bus.moreInfo.driverContact}</Text></Text>
                      </View>

                      {/* Frequency */}
                      <View className="flex-row items-center gap-2">
                        <BarChart2 size={18} color="#22c55e" />
                        <Text className="text-gray-700">Frequency: <Text className="font-semibold">{bus.moreInfo.busFrequency}</Text></Text>
                      </View>

                      {/* Crowd */}
                      <View className="flex-row items-center gap-2">
                        <Users size={18} color="#22c55e" />
                        <Text className="text-gray-700">Crowd: <Text className="font-semibold">{bus.moreInfo.passengerCountStatus}</Text></Text>
                      </View>

                      {/* Alerts */}
                      <View>
                        <View className="flex-row items-center gap-2">
                          <AlertTriangle size={18} color="red" />
                          <Text className="text-red-600 font-medium">Alerts:</Text>
                        </View>
                        {bus.moreInfo.alerts.map((alert, i) => (
                          <Text key={i} className="ml-6 text-red-500">• {alert}</Text>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* See More Button */}
                  <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                    className="border-t border-gray-200 py-2 mx-3"
                  >
                    <Text className="text-center text-blue-600 font-medium">
                      {expanded ? "Hide Details" : "See More"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )))}
          </ScrollView>
        </View>
      </View>
    </View >
  )
}

export default index