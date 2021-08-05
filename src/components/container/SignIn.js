import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { fetchUser, authorizeUser } from '../../redux/actions/userActions';
import Errors from '../presentation/Errors';
import Loading from '../presentation/Loading';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      err: false,
      data: {
        username: '',
        email: '',
        password: '',
      },
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
    jwt && username && fetchUser(username);
    jwt && loggedIn && history.push(`/dashboard/${username}`);
  }

  render() {
    const handleChange = (e) => {
      const { id, value } = e.target;
      const { data } = this.state;
      this.setState({
        ...this.state,
        data: {
          ...data,
          [id]: value,
        },
      });
    };

    const {
      authorizeUser,
      currentUser,
      loggedIn,
      errors,
      history,
    } = this.props;

    const handleSubmit = (e) => {
      e.preventDefault();
      this.setState({
        isSubmit: true,
      });
      const { data } = this.state;
      authorizeUser(data);
      currentUser
          && loggedIn
          && history.push(`/dashboard/${currentUser.username}`);
    };
    const { isSubmit } = this.state;

    return (
      <div className="signin auth">

        <div className="auth-header-container">
          {errors && (
          <div className="loading">
            <Errors />
          </div>
          )}

          <h1 className="auth-header py-5 text-center font-weight-bolder">
            Sign In
          </h1>
          <p className="auth-desc pb-5 font-weight-bolder">
            Hey! Log In to manage your account.
          </p>
        </div>
        <Form
          className="user-form p-5 shadow-lg bg-white"
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="username" className="pb-3">
            <Form.Control
              required
              type="username"
              placeholder="Enter Username"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email" className="pb-3">
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="password" className="pb-5">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>

          {isSubmit && !errors && (
          <div className="loading">
            <Loading />
          </div>
          )}

          <Button className="btn hero-btn w-100" type="submit">
            Submit
          </Button>
          <p className="text-center mt-3 font-weight-bolder auth-text">OR</p>
          <a href="/signup" className="my-3 text-center w-100 btn-link">
            {' '}
            Register
          </a>
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
