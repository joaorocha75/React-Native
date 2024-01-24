import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, StyleSheet, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({navigation}) => {
  const [cart, setCart] = useState([]);

  //buscar o Cart
  const getCart = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      if(cart) {
        setCart(JSON.parse(cart));
      }
    } catch (error) {
        console.error(error);
    }
    };

    //remover item do carrinho
    const removeItem = async index => {
        try {
          const updatedCart = [...cart];
          updatedCart.splice(index, 1);
          setCart(updatedCart);
    
          await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
          console.error(error);
        }
      };

  useEffect(()=> {
    getCart();
  }, []);

  return (
    <View style={{flex:1, flexGrow:1}}>
        {cart.length===0 ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={{ fontSize: 20 }}>O carrinho está vazio</Text>
                <Button
                    title="Voltar"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        ) : (
            <>
            <FlatList
                data={cart}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <Image style={styles.image} source= {{uri: item.image}} />
                        <Text>Marca:{item.brand}</Text>
                        <Text>Nome:{item.title}</Text>
                        <Text>Preço:{item.price}</Text>
                        <Text>Quantidade:{item.quantity}</Text>
                        <Button
                        style={styles.button}
                          title="Remover"
                          onPress={() => removeItem(item.brand)}
                        />
                    </View>
                )}
            />
            {/* voltar pagina anterior */}
            <Button
              title="Voltar"
              onPress={() => navigation.goBack()}
            />
        </>
        )
        }
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      margin: 10,
      padding: 10,
      backgroundColor: '#F5CDA7',
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
    },
    image: {
      width: 100,
      height: 100,
    },
    button: {
      borderRadius: 10,
    },
  });

export default CartScreen;