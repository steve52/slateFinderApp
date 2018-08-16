import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
} from 'react-native';
import MapView from 'react-native-maps';

import MyLocationMapMarker from './MyLocationMapMarker';

const LATITUTDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export default class Map extends Component {
  render() {
    const Map = () => {
      if (this.props.location.coords) {
        const region = {
          latitude: this.props.location.coords.latitude,
          longitude: this.props.location.coords.longitude,
          latitudeDelta: LATITUTDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
        console.log('REGION:', region);
        return (
          <MapView
            region={region}
            style={styles.map}
          >
            <MyLocationMapMarker />
          </MapView>
        );
      } else if (this.props.loading) {
        return <Text>Loading map...</Text>;
      } else if (this.props.error) {
        return <Text>{error}</Text>;
      } else {
        return <Text>this.props.loading: {JSON.stringify(this.props)}</Text>;
      }
    };

    return <Map />
  }
}

Map.propTypes = {
  location: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});