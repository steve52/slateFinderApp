import React, {Component} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import Map from './components/Map';
import Geolocation from 'react-native-geolocation-service';
import fetch from 'cross-fetch';
import { connect } from 'react-redux';

import {
  geolocationSuccess,
  geolocationFailure,
  fetchLocationsRequest,
  fetchLocationsSuccess,
  fetchLocationsFailure
} from '../../actions';


class MapScreen extends Component {
  watchId = null;

  state = {
    loading: false,
    updatesEnabled: false,
    location: {}
  };

  _hasLocationPermission = async () => {
    if (Platform.OS === 'ios' ||
        (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    }

    return false;
  }

  _getCurrentPosition = async () => {
    const hasLocationPermission = await this._hasLocationPermission();

    if (!hasLocationPermission) return;

    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.props.dispatch(geolocationSuccess(position));
          this.setState({ location: position, loading: false });
          console.log(position);
        },
        (error) => {
          this.props.dispatch(geolocationFailure(error));
          this.setState({ location: error, loading: false });
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50 }
      );
    });
  }

  _getAllLocations() {
    this.props.dispatch(fetchLocationsRequest());
    return fetch('http://192.168.1.151:4000/api/locations', {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    }).then( response => {
        return response.json();
    }).then( data => {
      this.props.dispatch(fetchLocationsSuccess(data.data));
    }).catch( error => {
      this.props.dispatch(fetchLocationsFailure(error));
    })
  }

  componentDidMount() {
    this._getCurrentPosition()
      .catch((err) => {
        console.log('Error getting current position');
      });

    this._getAllLocations()
    .catch((err) => {
      console.log('Error getting locations');
    });;
  }

  render() {
    return (
      <Map
        loading={this.state.loading}
        error={this.state.error}
        navigation={this.props.navigation}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default connect()(MapScreen)