import Axios from 'axios';
import baseURL from './baseURL';

//   Fetch Cabin
const fetchCabin = (id) => (dispatch) => {
  const token = localStorage.getItem('jwt');
  const authorizationAxios = Axios.create({
    baseURL: `${baseURL}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  authorizationAxios
    .get(`/api/v1/cabins/${id}.json`)
    .then((res) => dispatch({
      type: 'FETCH_CABIN',
      payload: res.data,
    }))
    .catch((err) => {
      console.log(err);
      dispatch({
        type: 'CREATE_ERROR',
        payload: err,
      });
    });

  authorizationAxios
    .get('/api/v1/favourites.json')
    .then((res) => {
      const cabin = res.data.filter((cabin) => cabin.cabin_id === Number(id));
      console.log(cabin);
      if (cabin.length) {
        dispatch({
          type: 'FAVOURITE_CABIN',
        });
      } else {
        dispatch({
          type: 'NOT_FAVOURITE_CABIN',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: 'CREATE_ERROR',
        payload: err,
      });
    });
};

//   Fetch All Cabins
const fetchCabins = () => (dispatch) => {
  const url = `${baseURL}/api/v1/cabins.json`;
  Axios.get(url)
    .then((res) => dispatch({
      type: 'FETCH_CABINS',
      payload: res.data,
    }))
    .catch((err) => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

// Create Cabin
const createCabin = (data) => (dispatch) => {
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
    message: 'You have SuccessFully created a Cabin',
    type: 'create_cabin',
  };
  authAxios
    .post('/api/v1/cabins.json', cabinData)
    .then((res) => {
      dispatch({
        type: 'SUCCESS_MESSAGE',
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

// Update Cabin
const updateCabin = (data, id) => (dispatch) => {
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
    .patch(`/api/v1/cabins/${id}.json`, cabinData)
    .then((res) => {
      dispatch({
        type: 'SUCCESS_MESSAGE',
        payload,
      });
      dispatch({
        type: 'UPDATE_CABIN',
        payload: res.data,
      });
    })
    .catch((err) => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

//   Delete Cabin
const deleteCabin = (id) => (dispatch) => {
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
    .delete(`/api/v1/cabins/${id}.json`)
    .then((res) => {
      dispatch({
        type: 'SUCCESS_MESSAGE',
        payload,
      });

      dispatch({
        type: 'DELETE_CABIN',
        payload: res.data,
      });
    })
    .catch((err) => dispatch({
      type: 'CREATE_ERROR',
      payload: err,
    }));
};

const unLoad = (states) => (dispatch) => {
  dispatch({
    type: 'CLEAR_STATE',
    payload: states,
  });
};

export {
  fetchCabin, fetchCabins, createCabin, updateCabin, deleteCabin, unLoad,
};
