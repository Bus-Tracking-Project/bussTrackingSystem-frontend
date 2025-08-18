// app/DriverDashboard.tsx
import WelcomeSection from "@/components/WelcomeSection";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import React, { useState } from "react";
import { Alert, Button, ScrollView, Text, View } from "react-native";

const LOCATION_TASK_NAME = "driver-location-task";

export default function DriverDashboard() {
  const [tripActive, setTripActive] = useState(false);

  // Sample assignment data
  const driverAssignment = {
    driverName: "Ravi Kumar",
    busNumber: "TS-09-BX-4321",
    route: {
      name: "Miyapur → LB Nagar",
      start: "Miyapur",
      end: "LB Nagar",
      stops: ["KPHB", "Ameerpet", "Dilsukhnagar"],
    },
    busDetails: {
      type: "AC Volvo",
      capacity: 50,
      regYear: 2020,
    },
    shiftTime: "6:00 AM - 2:00 PM",
  };

  // Start Trip Handler
  const startTrip = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }

    const bgStatus = await Location.requestBackgroundPermissionsAsync();
    if (bgStatus.status !== "granted") {
      Alert.alert("Permission Denied", "Background location is required.");
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 5000, // 5 seconds
      distanceInterval: 0,
      foregroundService: {
        notificationTitle: "Trip Active",
        notificationBody: "Your location is being tracked",
      },
      showsBackgroundLocationIndicator: true,
    });

    setTripActive(true);
    Alert.alert("Trip Started", "Location tracking started.");
  };

  // Stop Trip Handler
  const stopTrip = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    setTripActive(false);
    Alert.alert("Trip Ended", "Location tracking stopped.");
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <WelcomeSection />
      {/* Header */}
      <Text className="text-xl font-bold mb-4">Welcome <Text className="text-blue-500">{driverAssignment.driverName}👋</Text> to driver dashboard</Text>

      {/* Assignment Info */}
      <View className="bg-blue-100 rounded-2xl p-4 mb-5">
        <Text className="text-lg font-semibold">Assigned to:</Text>
        <Text className="text-base">{driverAssignment.driverName}</Text>
        <Text className="text-base mt-2">
          Shift: {driverAssignment.shiftTime}
        </Text>
      </View>

      {/* Bus Info */}
      <View className="bg-yellow-100 rounded-2xl p-4 mb-5">
        <Text className="text-lg font-semibold">Bus Info</Text>
        <Text className="text-base mt-1">
          Bus Number: {driverAssignment.busNumber}
        </Text>
        <Text className="text-base">
          Type: {driverAssignment.busDetails.type}
        </Text>
        <Text className="text-base">
          Capacity: {driverAssignment.busDetails.capacity} seats
        </Text>
        <Text className="text-base">
          Registration Year: {driverAssignment.busDetails.regYear}
        </Text>
      </View>

      {/* Route Info */}
      <View className="bg-green-100 rounded-2xl p-4 mb-5">
        <Text className="text-lg font-semibold">Route Details</Text>
        <Text className="text-base mt-1">Name: {driverAssignment.route.name}</Text>
        <Text className="text-base">
          From: {driverAssignment.route.start} → To: {driverAssignment.route.end}
        </Text>
        <Text className="text-base mt-2 font-medium">Stops:</Text>
        {driverAssignment.route.stops.map((stop, idx) => (
          <Text key={idx} className="text-base">
            • {stop}
          </Text>
        ))}
      </View>

      {/* Trip Controls */}
      <View className="mb-10">
        {!tripActive ? (
          <Button title="Start Trip" onPress={startTrip} />
        ) : (
          <Button title="Stop Trip" color="red" onPress={stopTrip} />
        )}
      </View>
    </ScrollView>
  );
}

// Define background task
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } :any = data;
    const { latitude, longitude } = locations[0].coords;
console.log('lat:',latitude,'lon:',longitude)
    // Send to backend
    // try {
    //   await fetch("https://your-backend.com/api/location", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       driverId: 1, // Replace with real driver ID
    //       latitude,
    //       longitude,
    //       timestamp: new Date().toISOString(),
    //     }),
    //   });
    // } catch (err) {
    //   console.error("Failed to send location:", err);
    // }
  }
});
