import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet, FlatList, Button, Share} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({navigation, route}) => {
  const {cardDetails} = route.params;
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    try{
        const cart = await AsyncStorage.getItem('cart');
        const cartItems = cart ? JSON.parse(cart) : [];

        setCart(cartItems);

        const existingItemIndex = cartItems.findIndex(
            item => item.id === cardDetails.id
        );

        if(existingItemIndex !== -1){
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            cartItems.push({...cardDetails, quantity});
        }

        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));

        navigation.navigate('Cart');
    }
    catch(error){
        console.error(error);
    };
  };
  
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={{uri: cardDetails.image}} />
        <View style={styles.info}>
            <Text style={styles.brand}>
                {cardDetails.brand} - {cardDetails.title}
            </Text>
            <Text style={styles.price}>{cardDetails.price}€</Text>
        </View>
        <View>
            <Text style={styles.description}>{cardDetails.description}</Text>
            <Text style={styles.date}>Entrega prevista em: {cardDetails.delivery_date}</Text>
        </View>

        <Text style={styles.qnt}>Quantidade: {quantity}</Text>
        <Button title="-" onPress={() => setQuantity(quantity - 1)} />
        <Button title="+" onPress={() => setQuantity(quantity + 1)} />

        <View style={styles.btn}>
            <Button title="Adicionar ao carrinho" onPress={addToCart} />
        </View>
        <View style={styles.btnBack}>
            <Button title="Voltar" onPress={() => navigation.goBack()} />
        </View>
        <View>
            <Button
                title="Partilhar"
                onPress={() => Share.share({
                    title: `${cardDetails.brand} - ${cardDetails.title} - ${cardDetails.url}`,
                    message: cardDetails.description,
                  })}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: '90%',
        height: 200,
        alignSelf: 'center',
    },
    info: {
        padding:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    brand: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 15,
        padding:10,
    },
    date: {
        fontSize: 15,
        padding:10,
    },
    qnt: {
        fontSize: 15,
        padding:10,
    },
    btn: {
        marginTop: 10,
    },
});

export default DetailsScreen;