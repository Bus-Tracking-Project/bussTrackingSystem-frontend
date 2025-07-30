import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
// import {  } from 'lucide-react-native';
// import {  } from 'react-native-svg';
// import busIcon from '../../assets/images/logo.jpg';

const GOOGLE_API_KEY = 'AIzaSyDZNKiJhmxhMP0TikvbX6zCMef-1SlUwHQ';


const MapComponent = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [busStops, setBusStops] = useState<any[]>([]); // storing bus stops from Google

  const nearBusStops = [
    {
      id: 1,
      name: 'Hanuman Junction',
      latitude: 17.658417,
      longitude: 79.426868,
    },
    {
      id: 2,
      name: 'Old Bus Stand',
      latitude: 17.656417,
      longitude: 79.425868,
    },
    {
      id: 3,
      name: 'New Market Stop',
      latitude: 17.657917,
      longitude: 79.428868,
    },
    {
      id: 4,
      name: 'College Road',
      latitude: 17.659217,
      longitude: 79.427368,
    },
  ];


  useEffect(() => {
    //permition
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need location permission to show your position.');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // Fetch nearby bus station
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc.coords.latitude},${loc.coords.longitude}&radius=1000&type=bus_station&key=${GOOGLE_API_KEY}`
      );
      const { results } = await response.json();
      console.log("Full response:", await response.json());
      console.log("Bus Stops:", results);
      setBusStops(results); // Save to state
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        showsUserLocation={true}
        region={
          location
            ? {
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }
            : {
              latitude: 17.385044, // fallback to Hyderabad
              longitude: 78.486671,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }
        }
      >
        {busStops.map((stop, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: stop.geometry.location.lat,
              longitude: stop.geometry.location.lng,
            }}
            title={stop.name}
            description={stop.vicinity}
          />
        ))}

        {/* Optional: Add a custom marker for current location 
        {location && (
          <Marker coordinate={{ latitude: 17.657417, longitude: 79.426868 }}>
            <Icon name="bus" size={32} color="red" />
          </Marker>
          // <Marker
          //   coordinate={{
          //     latitude: 17.657417,
          //     longitude: 79.426868,
          //   }}
          // >
          //   <View className="items-center">
          //     <Image
          //       source={require('../assets/logo.png')}
          //       style={{ width: 40, height: 40 }}
          //     />
          //     <Text className="text-xs text-black">Bus 101</Text>
          //   </View>
          // </Marker>
        )}*/}


        {/* this is fake bus stops with dummy data */}
        {nearBusStops.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{
              latitude: stop.latitude,
              longitude: stop.longitude,
            }}
            title={stop.name}
          >
            <Icon name="bus" size={32} color="red" />
          </Marker>
        ))}


      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapComponent;
