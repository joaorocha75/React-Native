import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Button} from '@rneui/base';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const DetailsScreen = ({route, navigation}) => {
  const {carDetails} = route.params;
  return (
    <View style={styles.container}>
      <Image source={{uri: carDetails.image}} style={styles.image} />
      <Text style={styles.title}>
        {carDetails.brand} - {carDetails.model}
      </Text>
      <Text style={styles.text}>{carDetails.description}</Text>
      <Text style={styles.text}>{carDetails.year}</Text>
      <Text style={styles.text}>{carDetails.price}€</Text>
      <Text style={styles.text}>{carDetails.city}</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.maps}
        initialRegion={{
          latitude: carDetails.location.latitude,
          longitude: carDetails.location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        <Marker
          coordinate={{
            latitude: carDetails.location.latitude,
            longitude: carDetails.location.longitude,
          }}
          title={carDetails.brand}
          description={carDetails.model}
        />
      </MapView>
      {/* botão para voltar atrás */}
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  image: {
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  maps: {
    height: 200,
    width: '100%',
  },
});

export default DetailsScreen;