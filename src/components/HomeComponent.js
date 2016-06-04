'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { doLogoutAccount } from '../actions/account';

require('styles/Home.scss');

class HomeComponent extends React.Component {
  logout () {
    const { dispatch } = this.props;
    dispatch(doLogoutAccount());
  }
  render() {
    var style = {
      textAlign: 'center'
    };
    return (
      <div className="home-component">
        <h3 style={style}>Logged in!<a href="javascript:void(0);" onClick={() => this.logout()}>logout</a></h3>
      </div>
    );
  }
}

HomeComponent.displayName = 'HomeComponent';

// Uncomment properties you need
// HomeComponent.propTypes = {};
// HomeComponent.defaultProps = {};

function mapStateToProps(state) {
  const { account } = state;
  return { account };
}

export default connect(mapStateToProps)(HomeComponent);
