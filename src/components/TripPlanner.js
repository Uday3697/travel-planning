// components/TripPlanner.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TripPlanner = () => {
  const [trip, setTrip] = useState({ destinations: [], dates: '', notes: '' });

  const saveTrip = async () => {
    try {
      await AsyncStorage.setItem('trip', JSON.stringify(trip));
      alert('Trip saved!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Destinations"
        value={trip.destinations.join(', ')}
        onChangeText={(text) => setTrip({ ...trip, destinations: text.split(', ') })}
      />
      <TextInput
        placeholder="Dates"
        value={trip.dates}
        onChangeText={(text) => setTrip({ ...trip, dates: text })}
      />
      <TextInput
        placeholder="Notes"
        value={trip.notes}
        onChangeText={(text) => setTrip({ ...trip, notes: text })}
      />
      <Button title="Save Trip" onPress={saveTrip} />
    </View>
  );
};

export default TripPlanner;
