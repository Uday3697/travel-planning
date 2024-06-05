import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store/configureStore';
import TripPlanner from './src/components/TripPlanner';
import PopularDestinations from './src/components/PopularDestinations';
import ShareTrip from './src/components/ShareTrip';
import ProfileScreen from './src/screens/ProfileScreen';
import SignUpScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginSCreen';
import DestinationList from './src/features/DestinationList';
import MapScreen from './src/screens/MapView';
const Stack = createStackNavigator();

const ProfileIcon = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        marginRight: 10,
      }}
    />
  </TouchableOpacity>
);

const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Stack.Navigator initialRouteName="Login">
      {isAuthenticated ? (
        <>
          {/* <Stack.Screen
            name="PopularDestinations"
            component={PopularDestinations}
            options={({ navigation }) => ({
              headerRight: () => <ProfileIcon navigation={navigation} />,
            })}
          /> */}
          <Stack.Screen
            name="Destinations"
            component={DestinationList}
            options={({ navigation }) => ({
              headerRight: () => <ProfileIcon navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="TripPlanner"
            component={TripPlanner}
            options={({ navigation }) => ({
              headerRight: () => <ProfileIcon navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="ShareTrip"
            component={ShareTrip}
            options={({ navigation }) => ({
              headerRight: () => <ProfileIcon navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={({ navigation }) => ({
              headerRight: () => <ProfileIcon navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="MapView"
            component={MapScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <View style={styles.headerRightContainer}>
                  <SearchButton navigation={navigation} />
                  <ProfileIcon navigation={navigation} />
                </View>
              ),
            })}
          />
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

export default App;
