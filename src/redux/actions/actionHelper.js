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
  return {
    get, post, update, deletes, postUser,
  };
};

export default queryBuilder;
