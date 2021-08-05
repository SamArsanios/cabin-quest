/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import Axios from 'axios';

const addToFavourites = (data, user) => (dispatch) => {
  const token = localStorage.getItem('jwt');
  const authAxios = Axios.create({
    baseURL: ' https://cabinquest-api.herokuapp.com',
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
      const newUserFav = [...user.favourites, res.data];
      const curRes = { ...user, favourites: newUserFav };
      dispatch({
        type: 'UPDATE_FAVOURITE',
        payload: curRes,
      });

      dispatch({
        type: 'SUCCESS_MESSAGE',
        payload,
      });

      dispatch({
        type: 'FETCH_USER',
        payload: curRes,
      });
    })
    .catch((err) => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const removeFromFavourites = (cabin_id, user) => (dispatch) => {
  const fav = user.favourites.filter(
    (favv) => favv.cabin_id == cabin_id.toString(),
  );

  const token = localStorage.getItem('jwt');
  const authAxios = Axios.create({
    baseURL: ' https://cabinquest-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const { id } = fav[0];
  const payload = {
    message: 'Cabin was successfully removed from Favourites!',
    type: 'remove_fav',
  };
  authAxios
    .delete(`/api/v1/favourites/${id}.json`)
    .then(() => {
      const newUserFav = user.favourites.filter((userfav) => userfav.id != id);
      const newUser = { ...user, favourites: [...newUserFav] };

      dispatch({
        type: 'REMOVE_FAV',
      });

      dispatch({
        type: 'SUCCESS_MESSAGE',
        payload,
      });

      dispatch({
        type: 'FETCH_USER',
        payload: newUser,
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
    baseURL: ' https://cabinquest-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  userAxios
    .post('/api/v1/image_uploaders.json', image)
    .then((res) => dispatch({
      type: 'ADD_IMAGE',
      payload: res.data,
    }))
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
