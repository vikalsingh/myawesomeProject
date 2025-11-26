import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

const CurrentLocationMap = () => {
  const [location, setLocation] = useState(null); // { latitude, longitude }
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      // iOS permissions are handled via Info.plist and system popup
      return true;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location to show it on the map.',
          buttonPositive: 'OK',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.status === 'OK' && data.results?.length > 0) {
        return data.results[0].formatted_address;
      }
      return '';
    } catch (e) {
      console.log('Reverse geocode error:', e);
      return '';
    }
  };

  const handleGetLocation = async () => {
    setError('');
    setLoading(true);

    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setLoading(false);
      setError('Location permission denied.');
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;

        const coords = {latitude, longitude};
        setLocation(coords);

        const addr = await getAddressFromCoords(latitude, longitude);
        setAddress(addr);

        setLoading(false);
      },
      error => {
        console.log(error);
        setError(error.message || 'Failed to get location');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const renderMap = () => {
    if (!location) {
      return (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            Press "Get Location" to show your current position.
          </Text>
        </View>
      );
    }

    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          coordinate={location}
          title="You are here"
          description={address || 'Current location'}
        />
      </MapView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>{renderMap()}</View>

      <View style={styles.infoContainer}>
        <Button
          title={loading ? 'Getting location...' : 'Get Location'}
          onPress={handleGetLocation}
          disabled={loading}
        />

        {loading && (
          <ActivityIndicator style={{marginTop: 10}} size="small" />
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {location && (
          <View style={{marginTop: 12}}>
            <Text style={styles.coordsText}>
              Lat: {location.latitude.toFixed(6)} | Lng:{' '}
              {location.longitude.toFixed(6)}
            </Text>
            {!!address && (
              <Text style={styles.addressText} numberOfLines={2}>
                {address}
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default CurrentLocationMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  placeholderText: {
    color: '#666',
    textAlign: 'center',
  },
  infoContainer: {
    paddingBottom: 20,
  },
  coordsText: {
    fontSize: 14,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 13,
    marginTop: 4,
    color: '#444',
  },
  errorText: {
    marginTop: 8,
    color: 'red',
  },
});
