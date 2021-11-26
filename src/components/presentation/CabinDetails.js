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
import { fetchCabin, deleteCabin, unLoad } from '../../redux/actions/cabinActions';
import { fetchUserFavourites } from '../../redux/actions/userActions';
import { addToFavourites, removeFromFavourites, isFavourite } from '../../redux/actions/favActions';
import AddCabin from './AddCabin';
import Errors from './Errors';
import Loading from './Loading';

class CabinDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favourite: false,
      user_id: 0,
      cabin: 0,
    };
  }

  componentDidMount() {
    const {
      fetchCabin, currentUser, match,
    } = this.props;
    const { cabin_id } = match.params;
    fetchCabin(cabin_id);
    fetchUserFavourites();

    this.setState({
      ...this.state,
      user_id: currentUser.id,
      cabin_id,
    });
  }

  render() {
    const {
      cabin,
      currentUser,
      deleteCabin,
      errors,
      loading,
      addToFavourites,
      favourites,
      match,
      unLoad,
      removeFromFavourites,
    } = this.props;
    const { cabin_id } = match.params;
    // Handle Delete Cabin
    const handleDelete = () => {
      unLoad({ loading: true });
      deleteCabin(cabin.id);
    };

    // Add To Favourite
    const addToFav = () => {
      addToFavourites(this.state, currentUser, favourites, cabin);
      fetchUserFavourites();
    };

    const removeFromFav = () => {
      removeFromFavourites(cabin_id, currentUser);
      fetchUserFavourites();
    };
    const isFavourite = () => (favourites.some((fav) => fav.id == cabin_id));

    const cabinDetails = this.props ? (
      <div className="house-content">
        <div className="house-details d-flex justify-content-center">
          <div className="card shadow-lg col-sm-8 col-lg-6 col-xl-4 d-md-flex p-0">
            <Card.Img variant="top" src={cabin.image} />
            <Card.Body>
              <Card.Title className="text-uppercase text-center font-weight-bolder">
                {cabin.name}
                {' '}
                {favourites.length && isFavourite() ? (
                  <button
                    type="button"
                    onClick={removeFromFav}
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
                    onClick={addToFav}
                    className=" btn btn-transparent hero-btn"
                  >
                    <Icofont icon="heart" />
                    {' '}
                    Add to Favourites
                    {' '}
                  </button>
                )}
              </Card.Title>
              <div className="card-details">
                <p>Location:</p>
                <p>{cabin.location}</p>
              </div>
              <div className="card-details">
                <p>Address:</p>
                <p>{cabin.address}</p>
              </div>
              <div className="card-details">
                <p>Region:</p>
                <p>{cabin.region}</p>
              </div>
              <hr />
              {currentUser && currentUser.id === cabin.user_id ? (
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
  favourites: PropTypes.any,
  loading: PropTypes.any,
  currentUser: PropTypes.any,
  fetchCabin: PropTypes.func.isRequired,
  deleteCabin: PropTypes.func.isRequired,
  addToFavourites: PropTypes.func.isRequired,
  removeFromFavourites: PropTypes.func.isRequired,
  unLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cabin: state.cabin.cabin,
  errors: state.error.err,
  type: state.succMsg.type,
  currentUser: state.userData.currentUser,
  loading: state.data.loading,
  loggedIn: state.userData.loggedIn,
  favourites: state.favourite.cabins,
});

export default connect(mapStateToProps, {
  fetchCabin,
  deleteCabin,
  addToFavourites,
  removeFromFavourites,
  isFavourite,
  unLoad,
})(CabinDetails);
