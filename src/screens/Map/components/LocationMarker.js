import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

class LocationMarker extends Component {
  render() {
    const coordinate = {
      longitude: this.props.location.longitude,
      latitude: this.props.location.latitude
    }
    return <Marker
      coordinate={coordinate}
      title={this.props.location.name}
    />
  }
}

LocationMarker.prototypes = {
  id: Proptypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.locationsById[ownProps.id]
  }
}
export default connect(mapStateToProps)(LocationMarker)