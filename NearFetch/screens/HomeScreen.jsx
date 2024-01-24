import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet, FlatList, RefreshControl} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [refreshing, setIsRefreshing] = useState(false);

  const fetchMalas = async () => {
    try {
        const response = await fetch('https://nearfetch-api.vercel.app/bags');
        const responseData = await response.json();
        //ordenar de forma descedente
        const sortedData = responseData.sort((a, b) => {
            return b.popularity_score - a.popularity_score;
        });
        setData(sortedData);
    } catch (error) {
        console.error(error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    fetchMalas();
    setTimeout(() => {
        setIsRefreshing(false);
    }, 2000);
  })

  /* substituir o fetchMalas() pelo o onRefresh() */
  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <View style={{flex:1, flexGrow:1}}>
        <FlatList
            data={data}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            renderItem={({item}) => (
                <View style={styles.card}>
                    <TouchableOpacity
                    onPress={() => 
                        navigation.navigate('Details', {cardDetails: item})}>
                        <Image style={styles.image} source= {{uri: item.image}} />
                        <Text>{item.brand}</Text>
                        <Text>{item.title}</Text>
                        <Text>{item.price}€</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: '#F5CDA7',
        borderRadius: 10,
    },
});

export default HomeScreen;