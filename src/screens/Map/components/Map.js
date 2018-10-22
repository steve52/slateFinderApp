import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
} from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import _ from 'lodash';

import MyLocationMarker from './MyLocationMarker';
import LocationMarker from './LocationMarker';

const LATITUTDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

class Map extends Component {
  constructor (props) {
    super(props);

    this._onCalloutPress = this._onCalloutPress.bind(this);
  };


  _onCalloutPress(locationId){
    console.log('ON PRESS')
    this.props.navigation.navigate('Location', { id: locationId })
  }

  render() {
    console.log('MAP VIEW this.props.navigation', this.props.navigation)
    // If we know the current position, then use it and render the map, otherwise
    // show a loading or error message
    if (this.props.currentPosition.latitude && this.props.currentPosition.longitude) {
      // create an array of location markers
      let locationMarkers = [];
      if (this.props.locations) {
        locationMarkers = this.props.locations.map((id) => {
          return <LocationMarker
            key={id}
            id={id}
            onCalloutPress={() => this._onCalloutPress(id)}
          />
        });
      }
      const region = {
        latitude: this.props.currentPosition.latitude,
        longitude: this.props.currentPosition.longitude,
        latitudeDelta: LATITUTDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }


      return (
        <MapView
          region={region}
          style={styles.map}
        >
          {locationMarkers}
          <MyLocationMarker />
        </MapView>
      );
    } else if (this.props.loading) {
      return <Text>Loading map...</Text>;
    } else if (this.props.error) {
      return <Text>{error}</Text>;
    } else {
      return <Text>this.props.loading: {JSON.stringify(this.props)}</Text>;
    }
  }
}

// TODO: Get these from the store
Map.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    currentPosition: {
      latitude: _.get(state, 'currentPosition.coords.latitude'),
      longitude: _.get(state, 'currentPosition.coords.longitude')
    },
    locations: state.locations.items
  }
}
export default connect(mapStateToProps)(Map)