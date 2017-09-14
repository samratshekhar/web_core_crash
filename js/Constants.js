/* global __DEV__ */

import { Platform } from 'react-native';

const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

const isProd = true;
// const isProd = false;
const requestXClientHeaders = {
  android: 'android',
  ios: 'ios',
};

const Constants = {
  isProd,

  platform: {
    isIos,
    isAndroid,
  },

  serverHost() {
    if (this.isProd) {
      return 'https://www.qplum.co';
    }

    return 'http://localhost:3001'; // iOS localhost
    // return 'http://10.0.2.2:3001'; // Android localhost
  },


  // TODO - Make this platform dependent after backend changes
  requestXClientHeader: requestXClientHeaders[Platform.OS],

};

module.exports = Constants;
