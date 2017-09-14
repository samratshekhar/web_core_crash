import React, { Component } from 'react';
import {
	BackHandler,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Home from './Home';
import CustomWebView from './CustomWebView';

let webViewRef;

function setWebViewRef(ref) {
  webViewRef = ref;
}

class AppNavigator extends Component {

	componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
  }

  backButtonHandler = () => {

    if (navigatorRef) {
      const routesList = navigatorRef.getCurrentRoutes();
      const routesLength = routesList.length;

      if (routesLength === 1) {
        return false;
      }

      /*
      * DIRTY CODE ALERT
      * If current route is PortfolioWebview i.e. account opening forms,
      * disable back button
      */
      const currentRouteIndex = routesList[routesLength - 1].index;
      if (currentRouteIndex === 4) {
        if (webViewRef) {
          webViewRef.goBack();
        }
        return true;
      }

      navigatorRef.pop();
      return true;
    }

    return false;
  }

	render() {
    const navigatorComponent = (
      <Navigator
        style={{flex: 1}}
        initialRoute={{
          name: 'Home',
          id: 'Home',
        }}
        configureScene={(route) => {
          return Navigator.SceneConfigs.PushFromRight;
        }}
        renderScene={AppNavigator.navigatorRenderScene}
        onDidFocus={(route) => {
          const { id: routeId, index: routeIndex, ...routeProps } = route;
          this.setState({ currentRoute: routeIndex });
        }}
      />
    );

    return navigatorComponent;
  }

	static navigatorRenderScene(route, navigator) {
    navigatorRef = navigator;

    switch (route.id) {
    	case 'Home':
        return (
          <Home
            navigator={navigator}
           />
        );
      case 'CustomWebView':
        return (
          <CustomWebView
            navigator={navigator}
            url={route.url}
            title={route.title}
            setWebViewRef={setWebViewRef}
          />);
      default:
        return null;
    }
  }

}

module.exports = AppNavigator;