/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { createUser, fetchUser, authorizeUser } from '../../redux/actions/userActions';
import { unLoad } from '../../redux/actions/cabinActions';
import Loading from '../presentation/Loading';
import Errors from '../presentation/Errors';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      userData: {
        email: '',
        password: '',
        username: '',
        firstname: '',
        lastname: '',
        password_confirmation: '',
      },
    };
  }

  componentDidMount() {
    const {
      loggedIn, username, history, fetchUser,
    } = this.props;
    const jwt = localStorage.getItem('jwt');
    jwt && username && fetchUser(username);
    jwt && loggedIn && history.push(`/dashboard/${username}`);
  }

  componentDidUpdate(nextProps) {
    const {
      history, currentUser, errors, loggedIn, authorizeUser,
    } = this.props;
    const { userData, isSubmit } = this.state;
    isSubmit
      && errors
      && this.setState({
        isSubmit: false,
      });
    if (this.props !== nextProps) {
      if (currentUser.id) {
        const { email, password, username } = userData;
        const data = {
          username,
          email,
          password,
        };

        authorizeUser(data);
      }
    }

    const jwt = localStorage.getItem('jwt');
    jwt && userData.username && fetchUser(userData.username);
    loggedIn && history.push(`/dashboard/${userData.username}`);
  }

  render() {
    const handleChange = (e) => {
      const { userData } = this.state;
      const { id, value } = e.target;
      this.setState({
        ...this.state,
        userData: {
          ...userData,
          [id]: value,
        },
      });
    };

    const {
      createUser,
      currentUser,
      authorizeUser,
      errors,
      loading,
      unLoad,
    } = this.props;
    const { isSubmit } = this.state;

    const handleSubmit = (e) => {
      e.preventDefault();
      const { userData } = this.state;
      this.setState({ isSubmit: true });
      createUser(userData);
      unLoad({ loading: true });
      if (currentUser.id) {
        const { email, password, username } = userData;
        const data = {
          username,
          email,
          password,
        };
        authorizeUser(data);
      }
    };

    return (
      <div className="signup auth">
        <h1 className="auth-header text-center font-weight-bolder">
          Sign Up
        </h1>
        <Form
          className="user-form px-5 py-2 shadow-lg bg-white"
          onSubmit={handleSubmit}
        >
          {errors && (
          <div className="form-width">
            <div className="loading">
              <Errors />
            </div>
          </div>
          )}

          <Form.Group controlId="firstname">
            <Form.Control
              required
              type="text"
              placeholder="Enter your first name"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.Control
              required
              type="text"
              placeholder="Enter your last name"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Control
              required
              type="text"
              placeholder="Enter username"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
            {/* <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="password_confirmation">
            <Form.Control
              required
              type="password"
              placeholder="confirm you password"
              onChange={handleChange}
            />
          </Form.Group>

          {loading && isSubmit && !errors && (
          <div className="col-10">
            <div className="loading">
              <Loading />
            </div>
          </div>
          )}

          <Button className="btn hero-btn w-100 mt-2" type="submit">
            Sign Up
          </Button>
          <p className="text-center font-weight-bolder auth-text">OR</p>

          <a href="/signin" className="text-center w-100">
            <Button className="hero-btn w-100 mb-3">
              Sign In
            </Button>
          </a>
        </Form>
      </div>
    );
  }
}

SignUp.propTypes = {
  currentUser: PropTypes.any,
  loading: PropTypes.bool,
  errors: PropTypes.any,
  loggedIn: PropTypes.any,
  createUser: PropTypes.func.isRequired,
  username: PropTypes.any,
  authorizeUser: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  unLoad: PropTypes.func.isRequired,
  history: PropTypes.any,
};

const mapStateToProps = (state) => ({
  loading: state.userData.loading,
  errors: state.error.err,
  loggedIn: state.userData.loggedIn,
  currentUser: state.userData.currentUser,
});

export default connect(mapStateToProps, {
  createUser, fetchUser, authorizeUser, unLoad,
})(SignUp);
