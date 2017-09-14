import React, { Component } from 'react';

// import components
import {
  View,
  StyleSheet,
  Linking,
  WebView,
} from 'react-native';

import WebViewAndroid from 'react-native-webview-android';

import Constants from './Constants';
import Logger from './Logger';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * WebView component for showing custom pages like Privacy Policy, Disclaimer etc.
 */
class PortfolioWebView extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    navigator: React.PropTypes.object.isRequired,
    drawer: React.PropTypes.object,
    setWebViewRef: React.PropTypes.func,
  }
  static defaultProps = {
    drawer: null,
    setWebViewRef: () => {},
  }

  constructor(props) {
    super(props);

    this.openInBrowser = this.openInBrowser.bind(this);

    this.state = {
      spinnerVisible: true,
    };
  }

  /**
   * flag denoting whether webview has landed on a bad page
   * like the mailto 'webpage not available' error page etc.
   * - used for going back to last page and is reset when last page
   *   is loaded
   */
  _landedOnBadPage;
  _badPageBackAttempts = 0;
  _webViewRef;

  webViewGoBack(webViewRef) {
    // goBack in webView
    webViewRef.goBack();
    this._badPageBackAttempts += 1;

    /**
     * if webview is still on badPage
     * retry going back
     */
    if (this._landedOnBadPage && this._badPageBackAttempts < 10) {
      setTimeout(() => {
        this.webViewGoBack(webViewRef);
      }, 0);
    }
  }

  openInBrowser() {
    Linking
      .openURL(this.props.url)
      .catch((err) => {
        Logger.error('Error on opening external url', err);
      });
  }

  navStateHandler = (event) => {
    /**
     * if navigation url not same as url of page originally
     * opened in WebView
     */
    if (event.url !== this.props.url) {
      // let OS handle url
      Linking
        .openURL(event.url)
        .catch((err) => {
          Logger.error('Error on opening external url', err);
        });

      // go back in WebView
      this._landedOnBadPage = true;
      setTimeout(() => {
        this.webViewGoBack(this._webViewRef);
      }, 0);
      return;
    }

    /**
     * when webview has landed on original page again,
     * reset variable
     */
    this._landedOnBadPage = false;

    if (event.loading) {
      this.setState({
        spinnerVisible: true,
      });
    } else {
      this.setState({
        spinnerVisible: false,
      });
    }
  }

  render() {
    let showToolbarSpinner;
    let webviewComponent;
    const webviewProps = {
      ref: (ref) => {
        this._webViewRef = ref;
        this.props.setWebViewRef(ref);
      },
      automaticallyAdjustContentInsets: false,
      style: styles.container,
      source: {
        uri: this.props.url,
        headers: {
          'X-CLIENT': Constants.requestXClientHeader,
        },
      },
      onNavigationStateChange: this.navStateHandler,
      javaScriptEnabled: true,
      startInLoadingState: true,
      scalesPageToFit: true,
    };

    if (Constants.platform.isIos) {
      webviewComponent = <WebView {...webviewProps} />;
      showToolbarSpinner = false;
    } else {
      webviewComponent = <WebViewAndroid {...webviewProps} />;
      showToolbarSpinner = this.state.spinnerVisible;
    }

    return (
      <View style={styles.container}>
        {webviewComponent}
      </View>
    );
  }
}

module.exports = PortfolioWebView;
