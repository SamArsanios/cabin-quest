import Axios from 'axios';

// Create User 
const createUser = (data) => dispatch =>{
  const url = 'https://cabinquest-api.herokuapp.com/api/v1/create/signup.json';
  const userData = {
    auth: data,
  };

  Axios.post(url, userData)
  .then(res => {
    dispatch({
      type: 'CREATE_USER',
      payload: res.data,
    });
  })
  .catch(err => dispatch({
    type: 'CREATE_ERROR',
    payload: err,
  }));
};

// Authorize User
const authorizeUser = (data) => dispatch =>{
  const url = 'https://cabinquest-api.herokuapp.com/api/v1/auth/signin.json';
  const userData = {
    auth: data,
  };

  Axios.post(url, userData)
  .then(res => {
    dispatch({
      type: 'AUTHORIZE_USER',
      payload: res.data,
      username: userData.auth.username,
    });
  })
  .catch(err => dispatch({
    type: 'CREATE_ERROR',
    payload: err,
  }));
};

// Fetch User
const fetchUser = (username) => dispatch => {
  const token = localStorage.getItem('jwt');

  const userAxios = Axios.create({
    baseURL: 'https://cabinquest-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  userAxios.get(`/api/v1/dashboard/${username}.json`)
  .then(res => dispatch({
    type: 'FETCH_USER',
    payload: res.data,
  }))
  .catch(err => dispatch({
    type: 'CREATE_ERROR',
    payload: err,
  }))
};

// Fetch User's Favourites
const fetchUserFavourites = (id) => dispatch => {
  const token = localStorage.getItem('jwt')
  const favouriteAxios = Axios.create({
    baseURL: 'https://cabinquest-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  favouriteAxios.get(`/api/v1/user/${id}/favourites.json`)
  .then(res => dispatch({
    type: 'USER_FAVOURITES',
    payload: res.data,
  }))
  .catch(err => dispatch ({
    type: 'CREATE_ERROR',
    payload: err,
  }));
};

// Logout Current User
const logOutCurrentUser = () => dispatch => {
  dispatch({
    type: 'LOG_OUT',
    payload: 'logout',
  });
};

export { createUser, authorizeUser, fetchUser, fetchUserFavourites, logOutCurrentUser }