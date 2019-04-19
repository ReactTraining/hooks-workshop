import React from 'react';
import { Router } from './';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import warning from 'tiny-warning';
import {
  createHistory,
  createCompatHistorySource
} from '../react-router-next/history';
import { __CompatHistoryContext as CompatHistoryContext } from '../react-router-next';

/**
 * The public API for a <Router> that uses HTML5 history.
 */
class BrowserRouter extends React.Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory(this.props);
    this.compatHistory = createHistory(createCompatHistorySource(this.history));
  }

  render() {
    return (
      <CompatHistoryContext.Provider value={this.compatHistory}>
        <Router history={this.history} children={this.props.children} />
      </CompatHistoryContext.Provider>
    );
  }
}

if (process.env.NODE_ENV === 'development') {
  BrowserRouter.propTypes = {
    basename: PropTypes.string,
    children: PropTypes.node,
    forceRefresh: PropTypes.bool,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number
  };

  BrowserRouter.prototype.componentDidMount = function() {
    warning(
      !this.props.history,
      '<BrowserRouter> ignores the history prop. To use a custom history, ' +
        'use `import { Router }` instead of `import { BrowserRouter as Router }`.'
    );
  };
}

export default BrowserRouter;
