/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable  consistent-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable  react/no-did-update-set-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable  eqeqeq */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import Icofont from 'react-icofont';
import { fetchUser } from '../../redux/actions/userActions';
import { fetchCabin, deleteCabin, unLoad } from '../../redux/actions/cabinActions';
import { addToFavourites, removeFromFavourites, isFavourite } from '../../redux/actions/favActions';
import AddCabin from './AddCabin';
import Errors from './Errors';
import Loading from './Loading';

class CabinDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favBtn: false,
      favourite: false,
      favourite_data: {
        user_id: 0,
        cabin: 0,
      },
    };
  }

  componentDidMount() {
    const {
      fetchCabin, fetchUser, currentUser, match,
    } = this.props;
    const { cabin_id } = match.params;
    const jwt = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');
    jwt && username && fetchUser(username);
    fetchCabin(cabin_id);
    const { favourite_data } = this.state;

    this.setState({
      ...this.state,
      favourite_data: {
        ...favourite_data,
        user_id: currentUser.id,
        cabin_id,
      },
    });
  }

  componentDidUpdate(nextProps) {
    const {
      currentUser, match, isFavourite, fav, type, history,
    } = this.props;
    const { id, favourites } = currentUser;
    const { cabin_id } = match.params;
    let favourite = false;
    if (favourites !== nextProps.currentUser.favourites) {
      this.setState({
        favBtn: false,
      });
      if (id && !fav) {
        favourite = favourites.some((fav) => fav.cabin_id == cabin_id);
        favourite && isFavourite();
      }
    }

    type === 'delete_cabin'
      && history.push(`/dashboard/${currentUser.username}`);
  }

  render() {
    const {
      cabin,
      currentUser,
      deleteCabin,
      errors,
      loading,
      addToFavourites,
      fav,
      match,
      unLoad,
      removeFromFavourites,
    } = this.props;
    const { favourite_data, favBtn } = this.state;
    const { cabin_id } = match.params;
    console.log(cabin);
    // Handel Delete Cabin
    const handleDelete = () => {
      unLoad({ loading: true });
      deleteCabin(cabin.id);
    };

    // Add To Favourite
    const addToFav = () => {
      this.setState(
        {
          ...this.state,
          favBtn: true,
          favourite_data: {
            ...favourite_data,
            user_id: currentUser.id,
            cabin_id,
          },
        },
        () => {
          addToFavourites(favourite_data, currentUser);
        },
      );
    };

    const removeFromFav = () => {
      this.setState({
        favBtn: true,
      });
      removeFromFavourites(cabin_id, currentUser);
    };

    const cabinDetails = this.props ? (
      <div className="house-content">
        <div className="house-details d-flex justify-content-center">
          <div className="card shadow-lg col-sm-8 col-lg-6 col-xl-4 d-md-flex p-0">
            <Card.Img variant="top" src={cabin.image} />
            {/* {cabin.body && (
              <div className="house-status">
                <div className="house-state">{cabin.status}</div>
                {cabin.status === 'available' && (
                  <button type="button" className="house-btn btn hero-btn">
                    Make an offer
                  </button>
                )}
              </div>
            )} */}
            <Card.Body>
              <Card.Title className="text-uppercase text-center font-weight-bolder">
                {cabin.name}
                {' '}
                {fav ? (
                  <button
                    type="button"
                    onClick={removeFromFav}
                    disabled={favBtn}
                    className=" btn btn-transparent hero-btn"
                  >
                    <Icofont icon="heart-alt" />
                    {' '}
                    Remove from Favourites
                    {' '}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={favBtn}
                    onClick={addToFav}
                    className=" btn btn-transparent hero-btn"
                  >
                    <Icofont icon="heart" />
                    {' '}
                    Add to Favou/rites
                    {' '}
                  </button>
                )}
              </Card.Title>
              <h1>HELLO</h1>
              <div className="card-details">
                <p>Location:</p>
                <p>{cabin.location}</p>
              </div>
              <div className="card-details">
                <p>Country:</p>
                <p>{cabin.country}</p>
              </div>
              <div className="card-details">
                <p>Region:</p>
                <p>{cabin.region}</p>
              </div>
              <hr />
              {currentUser && currentUser.id === cabin.user ? (
                <div className="card-actions">
                  <AddCabin status="Update" cabin={cabin} />
                  <Button onClick={handleDelete} className="btn btn-danger">
                    Delete Cabin
                  </Button>
                </div>
              ) : (
                <p className="text-secondary">You cannot update this cabin.</p>
              )}
            </Card.Body>
          </div>
        </div>
      </div>
    ) : (
      <div className="loading">
        {loading && <Loading />}
        {errors && <Errors />}
      </div>
    );
    return <div>{cabinDetails}</div>;
  }
}

CabinDetails.propTypes = {
  errors: PropTypes.any,
  match: PropTypes.any,
  cabin: PropTypes.any,
  loading: PropTypes.any,
  type: PropTypes.string,
  fav: PropTypes.any,
  username: PropTypes.any,
  currentUser: PropTypes.any,
  fetchUser: PropTypes.func.isRequired,
  fetchCabin: PropTypes.func.isRequired,
  deleteCabin: PropTypes.func.isRequired,
  addToFavourites: PropTypes.func.isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
  isFavourite: PropTypes.func.isRequired,
  unLoad: PropTypes.func.isRequired,
  history: PropTypes.any,
};

const mapStateToProps = (state) => ({
  cabin: state.data.cabin,
  errors: state.error.err,
  type: state.succMsg.type,
  currentUser: state.userData.currentUser,
  loading: state.data.loading,
  fav: state.data.fav,
  loggedIn: state.userData.loggedIn,
});

export default connect(mapStateToProps, {
  fetchUser,
  fetchCabin,
  deleteCabin,
  addToFavourites,
  removeFromFavourites,
  isFavourite,
  unLoad,
})(CabinDetails);
