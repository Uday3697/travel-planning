// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store/configureStore';
import DestinationList from './src/features/DestinationList';
import TripPlanner from './src/components/TripPlanner';
import PopularDestinations from './src/components/PopularDestinations';
import ShareTrip from './src/components/ShareTrip';


const Stack = createStackNavigator();




const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Destinations">
            <Stack.Screen name="Destinations" component={DestinationList} />
            <Stack.Screen name="TripPlanner" component={TripPlanner} />
            <Stack.Screen name="PopularDestinations" component={PopularDestinations} />
            <Stack.Screen name="ShareTrip" component={ShareTrip} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
