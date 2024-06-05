
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TripPlanner = ({ route }) => {
  const { trip } = route.params;
  const [notes, setNotes] = useState('');

  const handleSaveTrip = async () => {
    const tripWithNotes = { ...trip, notes };
    await AsyncStorage.setItem('plannedTrip', JSON.stringify(tripWithNotes));
    alert('Trip saved successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Planner</Text>
      <Text style={styles.destination}>Destination: {trip.destination.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
      />
      <Button title="Save Trip" onPress={handleSaveTrip} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  destination: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});

export default TripPlanner;
