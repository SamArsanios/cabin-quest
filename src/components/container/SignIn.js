/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-did-update-set-state */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authorizeUser } from '../../redux/actions/userActions';
import Errors from '../presentation/Errors';
import Loading from '../presentation/Loading';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      err: false,
      username: '',
      email: '',
      password: '',
    };
  }

  componentDidUpdate() {
    const {
      loggedIn, username, history, errors,
    } = this.props;
    const jwt = localStorage.getItem('jwt');
    const { isSubmit } = this.state;
    isSubmit
    && errors
    && this.setState({
      ...this.state,
      isSubmit: false,
    });
    jwt && loggedIn && history.push(`/user/${username}`);
  }

  handleSubmit = (e) => {
    const {
      authorizeUser,
      currentUser,
      loggedIn,
      history,
    } = this.props;

    e.preventDefault();
    this.setState({
      isSubmit: true,
    });

    authorizeUser(this.state);
    currentUser
        && loggedIn
        && history.push(`/user/${currentUser.username}`);
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({
      ...this.state,
      [id]: value,
    });
  };

  render() {
    const { errors } = this.props;

    const { isSubmit } = this.state;

    return (
      <div className="signin auth">

        <div className="auth-header-container">
          {errors && (
          <div className="loading">
            <Errors />
          </div>
          )}

          <h1 className="auth-header py-2 text-center font-weight-bolder">
            Sign In
          </h1>
        </div>
        <Form
          className="user-form px-5 py-4 shadow-lg bg-white"
          onSubmit={this.handleSubmit}
        >
          <Form.Group controlId="username" className="pb-3">
            <Form.Control
              required
              type="username"
              placeholder="Enter Username"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email" className="pb-3">
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              onChange={this.handleChange}
            />
            {/* <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="password" className="pb-5">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>

          {isSubmit && !errors && (
          <div className="loading">
            <Loading />
          </div>
          )}

          <Button className="btn hero-btn w-100" type="submit">
            Sign In
          </Button>
          <p className="text-center mt-3 font-weight-bolder auth-text">OR</p>
          <Link to="/signup" className="my-3 text-center w-100">
            {/* {' '} */}
            <Button className="btn hero-btn w-100">
              Sign Up
            </Button>
          </Link>
        </Form>
      </div>
    );
  }
}

SignIn.propTypes = {
  errors: PropTypes.any,
  loggedIn: PropTypes.any,
  username: PropTypes.string.isRequired,
  currentUser: PropTypes.any,
  authorizeUser: PropTypes.func.isRequired,
  history: PropTypes.any,
};

const mapStateToProps = (state) => ({
  errors: state.error.err,
  username: state.userData.username,
  currentUser: state.userData.currentUser,
  loggedIn: state.userData.loggedIn,
});

export default connect(mapStateToProps, { authorizeUser })(SignIn);
