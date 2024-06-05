import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logOut } from '../store/authSlice';

const ProfileScreen = () => {
  const [trips, setTrips] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTrips = async () => {
      const storedTrips = await AsyncStorage.getItem('plannedTrip');
      if (storedTrips) {
        setTrips([JSON.parse(storedTrips)]);
      }
    };
    fetchTrips();
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const renderTrip = ({ item }) => (
    <View style={styles.tripContainer}>
      <Text style={styles.tripDestination}>Destination: {item.destination.name}</Text>
      <Text style={styles.tripDate}>Date: {item.date}</Text>
      <Text style={styles.tripNotes}>Notes: {item.notes}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Travellings</Text>
      {user && (
        <>
          <Text style={styles.username}>Username: {user.username}</Text>
          <Button title="Log Out" onPress={handleLogout} />
        </>
      )}
      <Text style={styles.subtitle}>My Trips</Text>
      <FlatList
        data={trips}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTrip}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  username: {
    fontSize: 16,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  tripContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tripDate: {
    fontSize: 14,
    color: '#555',
  },
  tripNotes: {
    fontSize: 14,
    color: '#777',
  },
});

export default ProfileScreen;
