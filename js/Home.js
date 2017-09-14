import React, { Component } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
  Text,
	View,
} from 'react-native';

import Constants from './Constants';

let styles;
export default class Home extends Component {
	static propTypes = {
    navigator: React.PropTypes.object.isRequired,
  };

  onPress = () => {
  	const { navigator } = this.props;
  	navigator.push({
      index: 2,
      id: 'CustomWebView',
      title: 'Privacy Policy',
      url: `${Constants.serverHost()}/privacy-terms#privacy`,
    });
  };

	render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity
      	style={styles.button}
      	activeOpacity={0.8}
      	onPress={this.onPress}
      >
      	<Text>
      		FAQ
      	</Text>
      </TouchableOpacity>
      <TouchableOpacity
      	style={styles.button}
      	activeOpacity={0.8}
      	onPress={this.onPress}
      >
      	<Text>
      		Privacy Policy
      	</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  button: {
  	width: 200,
  	height: 50,
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor: 'grey',
  	marginTop: 10,
  }
});