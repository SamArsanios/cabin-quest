/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchUser, fetchUserFavourites } from '../../redux/actions/userActions';
import Loading from '../presentation/Loading';
import Errors from '../presentation/Errors';

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userFavsLoaded: false,
    };
    const { fetchUser } = props;
    const username = localStorage.getItem('username');
    const jwt = localStorage.getItem('jwt');
    jwt && username && fetchUser(username);
  }

  componentDidMount() {
    const {
      history, errors, fetchUserFavourites, currentUser,
    } = this.props;

    if (errors.response) {
      errors.response.status === 401 && history.push('/signin');
    }

    currentUser.id && fetchUserFavourites(currentUser.id);
  }

  componentDidUpdate() {
    const { currentUser, fetchUserFavourites } = this.props;
    if (currentUser && !this.state.userFavsLoaded) {
      fetchUserFavourites(currentUser.id);
      this.setState({
        userFavsLoaded: true,
      });
    }
  }

  render() {
    const srcImg = 'https://images.unsplash.com/photo-1575263977165-207a71e8f31f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9';
    const { favourites, loading, errors } = this.props;
    return (
      <div className="favorites">
        <div className="fav-container">
          {
            !this.state.userFavsLoaded ? (
              <div className="loading">
                {loading && <Loading />}
                {errors && <Errors />}
              </div>
            ) : (
              favourites.map((fav) => (
                <div className="card p-4 fav-card shadow-lg p-o" key={fav.id}>
                  <Card.Img
                    variant="top"
                    src={fav.image ? fav.image : srcImg}
                  />

                  <div className="house-status">
                    <div className="house-state">{fav.status}</div>
                    {fav.status === 'available' && (
                    <button type="button" className="house-btn btn hero-btn">
                      Make an offer
                    </button>
                    )}
                  </div>
                  <Card.Body className="mb-5">
                    <Card.Title className="text-uppercase font-weight-bolder">
                      {fav.name}
                    </Card.Title>
                    <div className="card-details">
                      <p>Location:</p>
                      <p>{fav.location}</p>
                    </div>
                    <div className="card-details">
                      <p>Country:</p>
                      <p>{fav.country}</p>
                    </div>
                    <div className="card-details">
                      <p>Region:</p>
                      <p>{fav.region}</p>
                    </div>

                    <hr />
                    <Link to={`/cabins/${fav.id}`} className="btn hero-btn w-100">
                      View Cabin
                    </Link>
                  </Card.Body>

                </div>
              ))
            )
          }
        </div>
      </div>
    );
  }
}

Favourites.propTypes = {
  errors: PropTypes.any,
  loading: PropTypes.any,
  history: PropTypes.any,
  fetchUser: PropTypes.func.isRequired,
  currentUser: PropTypes.any,
  favourites: PropTypes.any,
  fetchUserFavourites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.error.err,
  currentUser: state.userData.currentUser,
  loading: state.userData.loading,
  favourites: state.userData.userFavourites,
});

export default connect(mapStateToProps, { fetchUser, fetchUserFavourites })(Favourites);
