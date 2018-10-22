import React, { Component } from 'react';
import { Text } from 'react-native';
import Proptypes from 'prop-types';
import { Marker, Callout } from 'react-native-maps';
import { connect } from 'react-redux';

class LocationMarker extends Component {

  render() {
    const coordinate = {
      longitude: this.props.location.longitude,
      latitude: this.props.location.latitude
    }
    return <Marker
      coordinate={coordinate}
    >
    <Callout onPress={this.props.onCalloutPress}>
      <Text>{this.props.location.name}</Text>
      <Text>{this.props.location.address_line_1}</Text>
      {this.props.location.address_line_2 &&
        <Text>{this.props.location.address_line_2}</Text>
      }
      <Text>{this.props.location.state}, {this.props.location.city} {this.props.location.zip_code}</Text>
    </Callout>
    </Marker>
  }
}

LocationMarker.prototypes = {
  id: Proptypes.number.isRequired,
  onCalloutPress: Proptypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.locationsById[ownProps.id]
  }
}
export default connect(mapStateToProps)(LocationMarker)