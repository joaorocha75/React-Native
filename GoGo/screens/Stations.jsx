import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Stations = () => {
  const [stations, setStations] = useState([]);

  const fetchStations = async () => {
    try {
        const response = await fetch('https://gogo-api-amber.vercel.app/stations');
        const responseData = await response.json();
        setStations(responseData);
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 41.1579,
            longitude: -8.6291,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {stations.map((station) => (
            <Marker
              key={station.name}
              coordinate={{
                latitude: station.location.latitude,
                longitude: station.location.longitude,
              }}
              title={station.name}
              description={`Linhas: ${station.lines.join(',')}`}
              /* icon={require('./assets/bus-stop.png')} */
            />
          ))}
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})

export default Stations;