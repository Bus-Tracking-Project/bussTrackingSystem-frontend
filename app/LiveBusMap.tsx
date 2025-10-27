import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useKeepAwake } from 'expo-keep-awake';
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { io } from "socket.io-client";

type Location = { lat: number; lng: number };

const API_URL = Constants.expoConfig?.extra?.API_URL;
const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImVhMDYzMzY3Y2UxODQxY2RiYzM1YTM3OTE3MjVmMGViIiwiaCI6Im11cm11cjY0In0=";

const LiveBusMap = () => {
  useKeepAwake(); // keeps screen on when this component is in active
  const { busId } = useLocalSearchParams<{ busId: string }>();
  const [busLocation, setBusLocation] = useState<Location | null>({
    lat: 17.3850,
    lng: 78.4867, // Hyderabad center
  });
  const [userLocation, setUserLocation] = useState<Location | null>({
    lat: 17.4500,
    lng: 78.3800, // Gachibowli area
  });

  const [routeCoords, setRouteCoords] = useState<any[]>([]);
  const mapRef = useRef<MapView>(null);
  console.log(busId, 'from map component')

  // 🔹 Get user's current location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });

      // Track user live movement
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 5 },
        (loc) => {
          setUserLocation({
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          });
        }
      );
    })();
  }, []);


  useEffect(() => {
    if (!busId) return; // Don't connect if busId is not available

    const socket = io(API_URL, {
      transports: ["websocket"],
      query: { role: "passenger", busId },
    });

    socket.on("connect", () => {
      console.log("✅ Passenger connected:", socket.id);
      socket.emit("joinBusRoom", { busId });
    });

    socket.on("busLocationUpdate", (data: Location) => {
      console.log("📍 Bus moved:", data, 'this is openning in map component..');
      setBusLocation(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [busId]);

  // 🔹 Auto-fit map to show both locations
  useEffect(() => {
    if (busLocation && userLocation && mapRef.current) {
      mapRef.current.fitToCoordinates(
        [
          { latitude: busLocation.lat, longitude: busLocation.lng },
          { latitude: userLocation.lat, longitude: userLocation.lng },
        ],
        {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          animated: true,
        }
      );
    }
  }, [busLocation, userLocation]);

  // 🔹 Fetch route when both locations exist
  useEffect(() => {
    if (!busLocation || !userLocation) return;

    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${busLocation.lng},${busLocation.lat}&end=${userLocation.lng},${userLocation.lat}`
        );
        const json = await response.json();
        const coords = json.features[0].geometry.coordinates.map(([lng, lat]: [number, number]) => ({
          latitude: lat,
          longitude: lng,
        }));
        setRouteCoords(coords);
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [busLocation, userLocation]);


  return (
    <View style={{ flex: 1 }}>
      {/* Back Button */}
      <Pressable
        onPress={() => router.back()}
        className="absolute top-3 left-5 z-10 bg-white/90 rounded-full p-2 shadow-lg"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Feather name="arrow-left" size={24} color="#1E40AF" />
      </Pressable>
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
        {/* 👤 User Marker */}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.lat,
              longitude: userLocation.lng,
            }}
            title="You"
            description="Your Current Location"
          >
            <Icon name="person-circle" size={40} color="blue" />
          </Marker>
        )}
        {/* 🛣️ Route Polyline */}
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="blue" />
        )}
      </MapView>
    </View>
  );
};

export default LiveBusMap;
