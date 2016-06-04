require('normalize.css');
require('styles/App.css');

import React from 'react';
import { connect } from 'react-redux';
import HomeComponent from './HomeComponent';
import LoginComponent from './LoginComponent';

import { isAuthenticated } from '../actions/account';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(isAuthenticated());
  }
  render() {
    const { account } = this.props;
    return (
      <div className="index">
        {account.isLogin ? <HomeComponent /> : <LoginComponent />}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

function mapStateToProps(state) {
  const { account } = state;
  return { account }
}

export default connect(mapStateToProps)(AppComponent);
