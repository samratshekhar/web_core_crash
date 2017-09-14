import React, { Component } from 'react';

import AppNavigator from './AppNavigator';

function setup() {
  class AppRoot extends Component {
    constructor() {
      super();
      this.state = {
      };
    }

    render() {
      return (
        <AppNavigator />
      );
    }
  }

  return AppRoot;
}

module.exports = setup;
