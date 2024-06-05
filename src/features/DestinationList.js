import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, ActivityIndicator, Image, StyleSheet, Button, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import destinationsData from '../data/destinations.json';

const DestinationList = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchSelectedDestination = async () => {
            const storedDestination = await AsyncStorage.getItem('selectedDestination');
            if (storedDestination) {
                setSelectedDestination(JSON.parse(storedDestination));
            }
        };
        fetchSelectedDestination();
        fetchDestinations();
    }, [page]);

    const fetchDestinations = () => {
        try {
            const response = destinationsData;
            setDestinations((prevDestinations) => [
                ...prevDestinations,
                ...response.destinations.slice((page - 1) * 10, page * 10),
            ]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleShowOnMap = (destination) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${destination.latitude},${destination.longitude}`;
        Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
    };

    const handlePlanTrip = (destination) => {
        navigation.navigate('TripPlanner', { trip: { destination } });
    };

    const handleAddToMyTrips = async (destination) => {
        const storedTrips = await AsyncStorage.getItem('plannedTrips');
        const trips = storedTrips ? JSON.parse(storedTrips) : [];
        const newTrip = {
            destination,
            date: new Date().toISOString().split('T')[0],
            notes: 'No notes',
        };
        trips.push(newTrip);
        await AsyncStorage.setItem('plannedTrips', JSON.stringify(trips));
    };

    const renderFooter = () => {
        return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
    };

    const renderDestination = ({ item }) => (
        <View style={styles.destinationContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.city}>{item.city}</Text>
                <Text style={styles.description} numberOfLines={4}>{item.description}</Text>
                <View style={styles.buttonContainer}>
                    
                    <View style={styles.buttonSize}>

                        <Button title="Plan Trip" onPress={() => handlePlanTrip(item)} />
                    </View>
                    <View style={styles.buttonSize}>
                        <Button title="Add to My Trips" onPress={() => handleAddToMyTrips(item)} />
                    </View>
                </View>
                <View style={{marginTop:10}}>
                        <Button title="Show Map" onPress={() => handleShowOnMap(item)} />

                    </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {selectedDestination && (
                <View style={styles.selectedContainer}>
                    <Text style={styles.selectedTitle}>Selected Destination:</Text>
                    <Text style={styles.name}>{selectedDestination.name}</Text>
                </View>
            )}
            <FlatList
                data={destinations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderDestination}
                onEndReached={() => setPage(page + 1)}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    selectedContainer: {
        padding: 16,
        marginBottom: 10,
        backgroundColor: '#e0f7fa',
        borderRadius: 8,
    },
    selectedTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    destinationContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    infoContainer: {
        marginLeft: 10,
        justifyContent: 'center',
        
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    city: {
        fontSize: 16,
        color: '#777',
    },
    description: {
        fontSize: 14,
        color: '#555',
        width: 240

    },
    buttonContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: 10,
        // justifyContent: 'space-between',
        padding: 2,
        gap:4
      
    },
    buttonSize: {
        maxWidth: 155,
     
    }
});

export default DestinationList;
