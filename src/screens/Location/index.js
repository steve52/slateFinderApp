import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

class LocationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.navigation.getParam('id')
    }
  }
  render () {
    console.log('RENDER LOCATION', this.props)
    return (
      <View>
        <Text>LOCATION INFORMATION</Text>
        <Text>Name from location: {this.props.location.name} </Text>
      </View>
    )
  }
}

LocationScreen.prototypes = {
}

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.locationsById[ownProps.navigation.getParam('id')]
  }
}

export default connect(mapStateToProps)(LocationScreen);