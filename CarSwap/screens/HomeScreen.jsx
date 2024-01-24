import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from '@rneui/themed';
import { Button } from '@rneui/base';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchAds = async () => {
    try {
        const response = await fetch('https://carswap-api.vercel.app/ads');
        const responseData = await response.json();
        setData(responseData);
    } catch (error) {
        console.error(error);
    }
  };

  //função adicionar aos favoritos
  const addFavorite = async item => {
    const isFavorite = favorites.some(fav => fav.id === item.id);

    if (isFavorite) {
        const updatedFavorites = favorites.filter(fav => fav.id !== item.id);
        setFavorites(updatedFavorites);

      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites),);
      } catch (error) {
        console.error(error);
      }
    } else {
      const updatedFavorites = [...favorites, item];
      setFavorites(updatedFavorites);

      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites),);
      } catch (error) {
        console.error(error);
      }
    }
  };


    useEffect(() => {
        fetchAds();
    }, []);
  
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <Image source={{ uri: item.image}} style={styles.image}/>
            <Text>{item.brand} - {item.model} - {item.year}</Text>
            <Text>{item.price}€</Text>
            <Text>{item.city}</Text>
            <Button
              title="Details of the car"
              onPress={() => navigation.navigate('Details', {carDetails: item})}
            />
            <Button 
              title={
                favorites.some(fav => fav.id === item.id)
                ? 'Remover dos favorites'
                : 'Adicionar aos favorites'
              }
              onPress={() => addFavorite(item)}
            />
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
  }
});

export default HomeScreen;