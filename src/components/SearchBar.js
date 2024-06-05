// components/SearchBar.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <View>
      <TextInput
        placeholder="Search destinations"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <Button title="Search" onPress={() => onSearch(query)} />
    </View>
  );
};

export default SearchBar;
