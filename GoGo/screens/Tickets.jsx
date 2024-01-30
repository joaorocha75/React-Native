import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';

const Tickets = () => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/undraw_In_progress_re_m1l6.png')}
        />
        <View style={styles.textContainer}>
            <Text style={styles.text}>Work In progress...</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 3,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 2,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color:'#A63A50'
    }
})

export default Tickets;