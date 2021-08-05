/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../layout-view/Footer';
import NavBar from '../layout-view/NavBar';
import NavLinks from '../layout-view/NavLinks';
import { fetchUser, logOutCurrentUser } from '../../redux/actions/userActions';
import { fetchCabins } from '../../redux/actions/cabinActions';
import Cabins from './Cabins';
import CabinDetails from '../presentation/CabinDetails';
import Users from './Users';
import Favourites from './Favourites';
import Home from './Home';
import Success from '../presentation/Success';

class Dashboard extends Component {
  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    const {
      fetchUser, errors, history, match, currentUser,
    } = this.props;

    const { username } = match.params;
    jwt && username && !currentUser.id && fetchUser(username);

    !jwt && !currentUser.id && history.push('/signin');
    if (errors.response) {
      errors.response.status === 401 && history.push('/signin');
    }
  }

  componentDidUpdate() {
    const jwt = localStorage.getItem('jwt');

    const { errors, history, currentUser } = this.props;
    !jwt && !currentUser.id && history.push('/signin');
    fetchCabins();
    if (errors.response) {
      errors.response.status === 401 && history.push('/signin');
    }
  }

  render() {
    const { success } = this.props;
    return (
      <div className="dashboard bg-white">
        <BrowserRouter>
          <NavBar />
          <NavLinks />
          {success && <Success /> }
          <div className="container-fluid card-list">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cabins/:cabin_id" component={CabinDetails} />
              <Route exact path="/user/favourites/:username" component={Favourites} />
              <Route exact path="/users" component={Users} />
              <Route path="/dashboard/:username" component={Cabins} />
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

Dashboard.propTypes = {
  errors: PropTypes.any,
  match: PropTypes.any,
  success: PropTypes.any,
  currentUser: PropTypes.any,
  username: PropTypes.string,
  fetchUser: PropTypes.func.isRequired,
  history: PropTypes.any,
};

Dashboard.defaultProps = {
  errors: PropTypes.shape,
  match: PropTypes.shape,
  success: PropTypes.shape,
  currentUser: PropTypes.shape,
  username: PropTypes.string,
  history: PropTypes.shape,
};

const mapStateToProps = (state) => ({
  errors: state.error.err,
  currentUser: state.userData.currentUser,
  username: state.userData.username,
  success: state.succMsg.message,
  loggedIn: state.userData.loggedIn,
});

export default connect(mapStateToProps, { fetchUser, logOutCurrentUser })(
  Dashboard,
);
