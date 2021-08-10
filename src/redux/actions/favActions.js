/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import Axios from 'axios';
import baseURL from './baseURL';

const addToFavourites = (data, user) => (dispatch) => {
  const token = localStorage.getItem('jwt');
  const authAxios = Axios.create({
    baseURL: `${baseURL}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const cabinData = {
    favourite: data,
  };
  const payload = {
    message: 'Cabin was successfully added to Favourites!',
    type: 'add_fav',
  };

  authAxios
    .post('/api/v1/favourites.json', cabinData)
    .then((res) => {
      dispatch({
        type: 'ADD_FAVOURITE',
        payload: res.data.cabin_id,
      });

      dispatch({
        type: 'FAVOURITE_CABIN',
      });

      dispatch({
        type: 'SUCCESS_MESSAGE',
        payload,
      });

      dispatch({
        type: 'FETCH_USER',
        payload: user,
      });
    })
    .catch((err) => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const removeFromFavourites = (cabin_id, user) => (dispatch) => {
  const token = localStorage.getItem('jwt');
  const authAxios = Axios.create({
    baseURL: `${baseURL}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const payload = {
    message: 'Cabin was successfully removed from Favourites!',
    type: 'remove_fav',
  };
  authAxios
    .delete(`/api/v1/favourites/${cabin_id}.json`)
    .then(() => {
      dispatch({
        type: 'REMOVE_FAVOURITE',
        payload: cabin_id,
      });

      dispatch({
        type: 'NOT_FAVOURITE_CABIN',
      });

      dispatch({
        type: 'SUCCESS_MESSAGE',
        payload,
      });

      dispatch({
        type: 'FETCH_USER',
        payload: user,
      });
    })
    .catch((err) => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const uploadImage = (image) => (dispatch) => {
  const token = localStorage.getItem('jwt');
  const userAxios = Axios.create({
    baseURL: `${baseURL}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  userAxios
    .post('/api/v1/image_uploaders.json', image)
    .then((res) => {
      dispatch({
        type: 'ADD_IMAGE',
        payload: res.data,
      });
    })
    .catch((err) => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const clearImage = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_IMAGE',
  });
};

const isFavourite = () => (dispatch) => {
  dispatch({
    type: 'UPDATE_FAVOURITE',
  });
};

export {
  addToFavourites, removeFromFavourites, uploadImage, clearImage, isFavourite,
};
