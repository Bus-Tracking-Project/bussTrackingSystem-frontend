import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { io } from "socket.io-client";

const API_URL = Constants.expoConfig?.extra?.API_URL;
type Location = { lat: number; lng: number };

const LiveBusMap = ({ busId }: { busId: string }) => {
  const [busLocation, setBusLocation] = useState<Location | null>(null);
  console.log(busId, 'from map compo')
  useEffect(() => {
    const socket = io(API_URL, {
      transports: ["websocket"],
      query: { role: "passenger", busId },
    });

    socket.on("connect", () => {
      console.log("✅ Passenger connected:", socket.id);
      socket.emit("joinBusRoom", { busId:'123' });
    });

    socket.on("busLocationUpdate", (data: Location) => {
      console.log("📍 Bus moved:", data, 'this is openning in map component..');
      setBusLocation(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [busId]);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={StyleSheet.absoluteFillObject}
      region={
        busLocation
          ? {
            latitude: busLocation.lat,
            longitude: busLocation.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
          : {
            latitude: 17.385044,
            longitude: 78.486671,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }
      }
    >
      {busLocation && (
        <Marker
          coordinate={{
            latitude: busLocation.lat,
            longitude: busLocation.lng,
          }}
          title={`Bus ${busId}`}
          description="Live location"
        >
          <Icon name="bus" size={32} color="green" />
        </Marker>
      )}
    </MapView>
  );
};

export default LiveBusMap;
