import LoadingAnime from '@/components/LoadingAnime';
import {
  Bus,
  Clock,
  MapPin,
  Search
} from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const Index = () => {
  const [busNumber, setBusNumber] = useState("");
  const [busData, setBusData] = useState<BusType[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);
  const [Loading, setLoading] = useState(false)

  type Stop = {
    status: string;
    stop_name: string;
    arrival_time: string;
    departure_time: string;
  };

  type BusType = {
    bus_number: string;
    drivercode: string;
    conductor_code: string;
    driver_phonenumber: string;
    conductor_phonenumber: string;
    bus_type: string;
    capacity: string | number;
    depo_id: string;
    departure_time: string;
    arrival_time: string;
    source_location_id: string;
    destination_location_id: string;
    trip_date: string;
    stops: Stop[];
  };


  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://10.73.213.97:3000/bustable/Busnumber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ busnumber: busNumber }),
      });
      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        // Backend error handling
        setError(data?.message || "Bus not found");
        setBusData([]);
        setLoading(false);
        console.log(error,'this is error from search by number')
        return;
      }
      // normalize
      const normalizedData = Array.isArray(data) ? data : data ? [data] : [];
      setBusData(normalizedData);
      setError(null);
      setLoading(false);

    } catch (err: any) {
      setError(err);
      setBusData([]);
    }
  };

  return (
    <View className="flex-1 justify-center items-center py-5 px-3 bg-white">
      <View className="w-full px-5 py-4 gap-5 h-full overflow-hidden">
        {/* <View className='h-2 w-3'> */}
        {/* <Image source={require('@/assets/images/findYourBus.jpg')} height={1} width={1} /> */}
        {/* <img
        </View> */}
        <Text className="font-bold text-2xl text-black">Enter Bus Number</Text>

        {/* Input */}
        <View className="flex-row items-center border-b-2 border-gray-300 px-4 py-3 space-x-3">
          <Bus size={20} color="black" />
          <TextInput
            className="flex-1 text-black"
            placeholder="eg: TG10932"
            placeholderTextColor="gray"
            value={busNumber}
            onChangeText={setBusNumber}
          />
          <TouchableOpacity onPress={handleSubmit}>
            <Search size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Results */}
        <View className="border-none rounded-lg w-full h-[70%] my-10">
          <ScrollView className="p-1">
            {busData.length === 0 ? (
              <Text className="text-center text-2xl font-extrabold text-gray-400">
                {error
                  ? `Error: ${error || "Something went wrong"}`
                  : "No buses found"}
              </Text>
            ) : (
              busData.map((bus, idx) => {
                const expanded = expandedId === bus.bus_number;

                return (
                  <View
                    key={idx}
                    className="bg-white rounded-xl shadow-md mb-3"
                  >
                    {/* Card */}
                    <TouchableOpacity
                      className="flex-row items-center justify-between w-full p-4 active:opacity-80"
                      onPress={() =>
                        setExpandedId(expanded ? null : bus.bus_number)
                      }
                    >
                      <View className="flex-row items-center space-x-3">
                        <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mx-2">
                          <Bus size={24} color="#22c55e" strokeWidth={1.5} />
                        </View>
                        <View>
                          <Text className="font-semibold text-gray-900">
                            {bus.bus_number}
                          </Text>
                          <View className="flex-row items-center mt-1 gap-2">
                            <MapPin
                              size={14}
                              color="#6b7280"
                              strokeWidth={1.5}
                              className=''
                            />
                            <Text className="text-gray-500 text-sm">
                              {bus.trip_date}
                            </Text>
                          </View>
                          <View className="flex-col gap-1 mt-1">
                            <Text>Form : {bus.source_location_id}</Text>
                            <Text>To : {bus.destination_location_id}</Text>
                          </View>
                        </View>
                      </View>

                      <View className="items-end">
                        <View className="flex-row items-center gap-1">
                          <Clock
                            size={14}
                            color="#6b7280"
                            strokeWidth={1.5}
                          />
                          <Text className="font-semibold text-gray-900 text-sm">
                            {bus.departure_time}
                          </Text>
                        </View>
                        <Text className="text-green-500 text-sm font-medium">
                          {bus.arrival_time}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {expanded && (
                      <View className="px-4 pb-4 py-2 gap-2">
                        <Text className="text-gray-700">
                          Driver:{" "}
                          <Text className="font-semibold">{bus.drivercode}</Text>{" "}
                          |{" "}
                          <Text className="font-semibold">
                            {bus.driver_phonenumber}
                          </Text>
                        </Text>

                        <Text className="text-gray-700">
                          Conductor:{" "}
                          <Text className="font-semibold">
                            {bus.conductor_code}
                          </Text>{" "}
                          |{" "}
                          <Text className="font-semibold">
                            {bus.conductor_phonenumber}
                          </Text>
                        </Text>

                        <Text className="text-gray-700">
                          Type:{" "}
                          <Text className="font-semibold">{bus.bus_type}</Text>
                        </Text>

                        <Text className="text-gray-700">
                          Time:{" "}
                          <Text className="font-semibold">
                            {bus.departure_time} - {bus.arrival_time}
                          </Text>
                        </Text>

                        <View>
                          <Text className="text-gray-700 font-medium">
                            Stops:
                          </Text>
                          {bus.stops.map((stop, i) => (
                            <View key={i} className="ml-6">
                              <Text className="text-gray-600">
                                • {stop.stop_name} ({stop.status})
                              </Text>
                              <Text className="text-gray-500 text-sm">
                                Arr: {stop.arrival_time} | Dep:{" "}
                                {stop.departure_time}
                              </Text>
                            </View>
                          ))}
                        </View>

                        <Text className="text-gray-700">
                          Capacity:{" "}
                          <Text className="font-semibold">{bus.capacity}</Text>
                        </Text>

                        <Text className="text-gray-700">
                          Depo ID:{" "}
                          <Text className="font-semibold">{bus.depo_id}</Text>
                        </Text>

                        {/* <View className="flex-row items-center gap-2">
                          <AlertTriangle size={18} color="red" />
                          <Text className="text-red-600 font-medium">
                            Alerts: (coming soon)
                          </Text>
                        </View> */}
                      </View>
                    )}

                    <TouchableOpacity
                      onPress={() =>
                        setExpandedId(expanded ? null : bus.bus_number)
                      }
                      className="border-t border-gray-200 py-2 mx-3"
                    >
                      <Text className="text-center text-blue-600 font-medium">
                        {expanded ? "Hide Details" : "See More"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>
      </View>
      {Loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingAnime />
        </View>
      )}
    </View>
  );
};

export default Index;
