import React, { useState } from 'react';
import { FlatList, Text, View, ActivityIndicator, Image, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import destinationsData from '../data/destinations.json';

const DestinationList = ({ navigation }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    setLoading(true);
    const results = destinationsData.destinations.filter((destination) =>
      destination.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDestinations(results);
    setLoading(false);
  };

  const handlePlanTrip = async (destination) => {
    const trip = {
      destination,
      date: new Date().toISOString(), // Placeholder for selected dates
      notes: '', // Placeholder for notes
    };
    await AsyncStorage.setItem('plannedTrip', JSON.stringify(trip));
    navigation.navigate('TripPlanner', { trip });
  };

  const renderDestination = ({ item }) => (
    <View style={styles.destinationContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.city}>{item.city}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Button title="Plan a Trip" onPress={() => handlePlanTrip(item)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Destinations..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={destinations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDestination}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
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
    flex: 1,
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
