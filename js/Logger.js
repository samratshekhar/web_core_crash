/* global __DEV__ */

/**
 * Custom logger to have the ability to broadcast logs/errors to multiple places
 * in addition to console if need be.
 */

const Logger = {
  info(...args) {
    /* eslint-disable no-console */
    console.log(
      '---qplum-info-start---\n',
      ...args,
      '\n---qplum-info-end---',
    );
  },

  error(...args) {
    /* eslint-disable no-console */
    console.log(
      '---qplum-error-start---\n',
      ...args,
      '\n---qplum-error-end---',
    );

    // TODO: log error here to an error reporting service(Sentry etc.)
    // console.error(errorMessage);
  },

  logRedux(prevState, action, nextState, groupName = 'Dispatch: ') {
    if (!__DEV__) return;

    if (console.group) {
      console.groupCollapsed(groupName);
      console.log('Last State: ', prevState);
      console.log('Action: ', action);
      console.log('New State: ', nextState);
      console.groupEnd();
    } else {
      console.log(groupName, {
        lastState: prevState,
        action,
        newState: nextState,
      });
    }
  },
};

module.exports = Logger;
