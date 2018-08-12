import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default class MapScreen extends React.Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
        >
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});