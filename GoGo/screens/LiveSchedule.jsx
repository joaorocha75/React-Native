import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';

const LiveSchedule = ({navigation}) => {
  const [data, setData] = useState([]);

  const fetchHorarios = async () => {
    try {
        const response = await fetch('https://gogo-api-amber.vercel.app/routes');
        const responseData = await response.json();
        setData(responseData);
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(()=> {
    fetchHorarios();

    const intervalId = setInterval(() => {
        fetchHorarios();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Next Departures</Text>
        <FlatList
            data={data}
            renderItem={({item, index}) => (
                <View style={[
                    styles.card,
                    index === 0 ? styles.firstItem : styles.card
                    ]}>
                    <Text>Nome:{item.name}</Text>
                    <Text>Origem:{item.origin}</Text>
                    <Text>Destino:{item.destination}</Text>
                    <Text>Tipo:{item.type}</Text>
                    <Text>Estado:{item.status}</Text>
                    <Text>Atraso:{item.delay}</Text>
                    <Text>Hora de Chegada:{item.next_departure_time}</Text>
                </View>
            )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 16,
        color: '#A63A50'
    },
    card: {
        flex: 1,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#A63A50',
        backgroundColor: '#AB9B96',
        borderRadius: 5,
    },
    firstItem: {
        backgroundColor: '#A63A50',
        textColor: '#F0E7D8'
    },
})

export default LiveSchedule;