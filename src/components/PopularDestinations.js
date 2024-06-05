// components/PopularDestinations.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const PopularDestinations = () => {
  const [popularDestinations, setPopularDestinations] = useState([]);

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        const response = await axios.get('https://example.com/api/popular-destinations');
        setPopularDestinations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopularDestinations();
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
