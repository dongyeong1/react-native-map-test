/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabHome = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'yellow'}}>
      <Text>sesss</Text>
    </View>
  );
};
const TabSet = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'blue'}}>
      <Text>sesss</Text>
    </View>
  );
};

const Home = () => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="tabHome" component={TabHome} />
        <Tab.Screen name="tabSet" component={TabSet} />
      </Tab.Navigator>
    </View>
  );
};
const Map = () => {
  // const permission = async () => {

  // };

  const requestPermission = async () => {
    try {
      // 안드로이드 위치 정보 수집 권한 요청
      if (Platform.OS === 'android') {
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    } catch (e) {
      console.log('permisionerror', e);
    }
  };

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [mapLoad, setMapLoad] = useState(false);
  useEffect(() => {
    requestPermission().then(result => {
      console.log({result});
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            // setLocation(pos.coords);
            console.log('resul', pos.coords);
            setCurrentPosition({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
            setMapLoad(true);
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 10000,
          },
        );
      }
    });
  }, []);

  useEffect(() => {
    console.log('first', currentPosition);
  }, [currentPosition]);
  return (
    <View style={{flex: 1}}>
      {mapLoad ? (
        <MapView
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{flex: 1}}>
          <Polyline
            coordinates={[
              {
                latitude: 35.6762,
                longitude: 139.6503,
              },
              {
                latitude: 35.6074,
                longitude: 140.1065,
              },
            ]} //specify our coordinates
            strokeColor={'red'}
            strokeWidth={4}
            lineDashPattern={[0]}></Polyline>
          <Marker
            coordinate={{
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
            }}
            title="this is a marker"
            description="this is a marker example"
          />
        </MapView>
      ) : (
        <ActivityIndicator style={{flex: 1}} size={'large'}></ActivityIndicator>
      )}
    </View>
  );
};
function App(): React.JSX.Element {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Feed" component={Home} />
          <Drawer.Screen name="Map" component={Map} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
