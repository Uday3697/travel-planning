// components/PopularDestinations.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import popularDestination from "../data/popularDestination.json"

const PopularDestinations = () => {
  const [popularDestinations, setPopularDestinations] = useState([]);

  useEffect(() => {
    // Simulate API call with mock data
    setPopularDestinations(popularDestination);
  }, []);

  return (
    <FlatList
      data={popularDestinations}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
};

export default PopularDestinations;
