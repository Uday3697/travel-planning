import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store/configureStore';
import DestinationList from './src/features/DestinationList';
import TripPlanner from './src/components/TripPlanner';
import PopularDestinations from './src/components/PopularDestinations';
import ShareTrip from './src/components/ShareTrip';
import SignUpScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginSCreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigation = useNavigation()
  return (
    <Stack.Navigator initialRouteName="Login">
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="Destinations"
            component={DestinationList}
            options={{
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <View style={styles.avatar} />
                </TouchableOpacity>
              )
            }}
          />
          <Stack.Screen name="PopularDestinations" component={PopularDestinations} />
          <Stack.Screen name="TripPlanner" component={TripPlanner} />
          <Stack.Screen name="ShareTrip" component={ShareTrip} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: 'grey', 
    marginRight: 16,
  },
});

export default App;
