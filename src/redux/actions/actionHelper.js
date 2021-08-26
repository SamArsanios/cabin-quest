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
};

export { queryBuilder };
