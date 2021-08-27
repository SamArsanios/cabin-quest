/* eslint-disable camelcase */
import Axios from 'axios';
import baseURL from './baseURL';

const queryBuilder = () => {
  const get = (address, type) => (dispatch) => {
    const token = localStorage.getItem('jwt');
    const authorizationAxios = Axios.create({
      baseURL: `${baseURL}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    authorizationAxios
      .get(address)
      .then((res) => dispatch({
        type,
        payload: res.data,
      }))
      .catch((err) => {
        dispatch({
          type: 'CREATE_ERROR',
          payload: err,
        });
      });
  };

  const post = (data, address, type) => (dispatch) => {
    const token = localStorage.getItem('jwt');
    const authAxios = Axios.create({
      baseURL: `${baseURL}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const cabinData = {
      cabin: data,
    };
    const payload = {
      message: 'You have Successfully created a Cabin',
      type: 'create_cabin',
    };
    authAxios
      .post(address, cabinData)
      .then((res) => {
        dispatch({
          type,
          payload,
        });
        dispatch({
          type: 'FETCH_CABIN',
          payload: res.data,
        });
      })
      .catch((err) => dispatch({
        type: 'CREATE_ERROR',
        payload: err,
      }));
  };

  const update = (data, address, type) => (dispatch) => {
    const token = localStorage.getItem('jwt');
    const authAxios = Axios.create({
      baseURL: `${baseURL}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const cabinData = {
      cabin: data,
    };
    const payload = {
      message: 'You have successfully updated a Cabin!',
      type: 'update_cabin',
    };
    authAxios
      .patch(address, cabinData)
      .then((res) => {
        dispatch({
          type: 'SUCCESS_MESSAGE',
          payload,
        });
        dispatch({
          type,
          payload: res.data,
        });
      })
      .catch((err) => dispatch({
        type: 'CREATE_ERROR',
        payload: err,
      }));
  };

  const deletes = (address, type) => (dispatch) => {
    const token = localStorage.getItem('jwt');

    const authAxios = Axios.create({
      baseURL: `${baseURL}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const payload = {
      message: 'You have successfully deleted the cabin.',
      type: 'delete_cabin',
    };
    authAxios
      .delete(address)
      .then((res) => {
        dispatch({
          type: 'SUCCESS_MESSAGE',
          payload,
        });

        dispatch({
          type,
          payload: res.data,
        });
      })
      .catch((err) => dispatch({
        type: 'CREATE_ERROR',
        payload: err,
      }));
  };

  const postUser = (data, url, type) => (dispatch) => {
    const url = `${baseURL}/api/v1/users`;
    const userData = {
      user: data,
    };

    Axios.post(url, userData)
      .then((res) => {
        dispatch({
          type,
          payload: res.data,
        });
      })
      .catch((err) => dispatch({
        type: 'CREATE_ERROR',
        payload: err,
      }));
  };

  const authorizeUser = (data) => (dispatch) => {
    const url = `${baseURL}/user_token`;
    const userData = {
      auth: data,
    };

    Axios.post(url, userData)
      .then((res) => {
        dispatch({
          type: 'AUTHORIZE_USER',
          payload: res.data,
          username: userData.auth.username,
        });
      })
      .catch((err) => dispatch({
        type: 'CREATE_ERROR',
        payload: err,
      }));
  };

  const postFavourites = (address, data, user) => (dispatch) => {
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
      .post(address, cabinData)
      .then((res) => {
        dispatch({
          type: 'ADD_FAVOURITE',
          payload: res.data.cabin_id,
        });

        dispatch({
          type: 'FETCH_CABIN',
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

  const removeFavourites = (address, cabin_id, user) => (dispatch) => {
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
      .delete(address)
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

  const postImage = (image) => (dispatch) => {
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

  return {
    get,
    post,
    update,
    deletes,
    postUser,
    authorizeUser,
    postFavourites,
    removeFavourites,
    postImage,
  };
};

export default queryBuilder;
