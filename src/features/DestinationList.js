// features/DestinationList.js
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, ActivityIndicator, Image, StyleSheet } from 'react-native';
import destinationsData from '../data/destinations.json'; 

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchDestinations();
  }, [page]);

  const fetchDestinations = () => {
    try {
      const response = destinationsData;
      setDestinations((prevDestinations) => [
        ...prevDestinations,
        ...response.destinations.slice((page - 1) * 10, page * 10)
      ]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  const renderDestination = ({ item }) => (
    <View style={styles.destinationContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.city}>{item.city}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={destinations}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderDestination}
      onEndReached={() => setPage(page + 1)}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  destinationContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  infoContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  city: {
    fontSize: 16,
    color: '#777',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default DestinationList;
