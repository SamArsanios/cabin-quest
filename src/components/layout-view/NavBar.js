/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable */
import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Icofont from 'react-icofont';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import AddCabin from '../presentation/AddCabin';
import '../../assets/scss/NavBar.scss';

class NavBar extends Component {
  render() {
    const jwt = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');
    const { currentUser, history } = this.props;
    const logUserOut = () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');

      history.push('/signin');
      window.location.reload();
    };

    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        className="mb-5 px-3"
        variant="light"
      >
        <Navbar.Brand href="/" className="font-weight-bolder">
          {' '}
          CABIN QUEST
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="d-none"
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end d-none d-sm-block"
        >
          {jwt === null && username === null ? (
            <Nav>
              <NavLink to="/signin" className="btn nav-btn pr-2">
                Sign In
              </NavLink>
              <NavLink to="/signup" className="btn nav-btn">
                Sign Up
              </NavLink>
            </Nav>
          ) : (
            <Nav>
              <NavLink
                to={`/user/${username}`}
                className="btn nav-btn pr-2"
              >
                Dashboard
              </NavLink>

              <AddCabin
                status="Add"
                cabin={{
                  body: {
                    address: '',
                    country: 'Ug',
                    image: '',
                    location: '',
                    region: 'K town',
                    status: 'available',
                    user: 1,
                  },
                }}
              />

              <button
                type="button"
                className="btn hero-btn cus-btn"
                onClick={logUserOut}
              >
                Log Out
              </button>

              <NavDropdown
                title={<Icofont icon="user" className="nav-icon" />}
                id="basic-nav-dropdown"
                className="text-center"
              >
                <NavDropdown.Item href={`/user/${currentUser.username}`}>
                  {currentUser ? currentUser.username : 'Profile'}
                </NavDropdown.Item>
                <NavDropdown.Item href="/users">Users</NavDropdown.Item>
                <NavDropdown.Item href={`/user/favourites/${currentUser.username}`}>
                  <Icofont icon="heart" />
                  {' '}
                  Favourites
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  // fetchUser: PropTypes.func.isRequired,
  history: PropTypes.any,
  currentUser: PropTypes.any,
};

const mapStateToProps = (state) => ({
  errors: state.error.err,
  currentUser: state.userData.currentUser,
  loading: state.userData.loading,
  loggedIn: state.userData.loggedIn,
});
const ShowTheLocationWithRouter = withRouter(NavBar);

export default connect(mapStateToProps)(ShowTheLocationWithRouter);
