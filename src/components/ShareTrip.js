// components/ShareTrip.js
import React from 'react';
import { View, Button, Share } from 'react-native';

const ShareTrip = ({ trip }) => {
  const shareTrip = async () => {
    try {
      await Share.share({
        message: `Check out my trip: ${JSON.stringify(trip)}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Share Trip" onPress={shareTrip} />
    </View>
  );
};

export default ShareTrip;
