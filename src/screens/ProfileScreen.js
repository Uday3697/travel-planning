import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../store/authSlice';
import TripPlanner from '../components/TripPlanner';
import SearchBar from '../components/SearchBar';

const ProfileScreen = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user && (
        <>
          <Text style={styles.username}>Username: {user.username}</Text>
          <Button title="Log Out" onPress={handleLogout} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  username: {
    fontSize: 18,
    marginBottom: 12,
  },
});

export default ProfileScreen;
