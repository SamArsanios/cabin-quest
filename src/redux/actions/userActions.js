// import Axios from 'axios';
import baseURL from './baseURL';
import queryBuilder from './actionHelper';

const createUser = (data) => queryBuilder().postUser(data, `${baseURL}/api/v1/users`, 'CREATE_USER');

const authorizeUser = (data) => queryBuilder().authorizeUser(data);

const fetchUser = () => queryBuilder().get('/api/v1/users/', 'FETCH_USER');

const fetchUserFavourites = () => queryBuilder().get('/api/v1/favourites', 'ADD_FAVOURITE');

// Create User
// const createUser = (data) => (dispatch) => {
//   const url = `${baseURL}/api/v1/users`;
//   const userData = {
//     user: data,
//   };

//   Axios.post(url, userData)
//     .then((res) => {
//       dispatch({
//         type: 'CREATE_USER',
//         payload: res.data,
//       });
//     })
//     .catch((err) => dispatch({
//       type: 'CREATE_ERROR',
//       payload: err,
//     }));
// };

// Authorize User
// const authorizeUser = (data) => (dispatch) => {
//   const url = `${baseURL}/user_token`;
//   const userData = {
//     auth: data,
//   };

//   Axios.post(url, userData)
//     .then((res) => {
//       dispatch({
//         type: 'AUTHORIZE_USER',
//         payload: res.data,
//         username: userData.auth.username,
//       });
//     })
//     .catch((err) => dispatch({
//       type: 'CREATE_ERROR',
//       payload: err,
//     }));
// };

// Fetch user
// const fetchUser = () => (dispatch) => {
//   const token = localStorage.getItem('jwt');

//   const userAxios = Axios.create({
//     baseURL: `${baseURL}`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   userAxios.get('/api/v1/users/')
//     .then((res) => dispatch({
//       type: 'FETCH_USER',
//       payload: res.data,
//     }))
//     .catch((err) => {
//       dispatch({
//         type: 'CREATE_ERROR',
//         payload: err,
//       });
//     });
// };

// Fetch User's Favourites
// const fetchUserFavourites = () => (dispatch) => {
//   const token = localStorage.getItem('jwt');
//   const favouriteAxios = Axios.create({
//     baseURL: `${baseURL}`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   favouriteAxios.get('/api/v1/favourites')
//     .then((res) => {
//       dispatch({
//         type: 'ADD_FAVOURITE',
//         payload: res.data,
//       });
//     })
//     .catch((err) => dispatch({
//       type: 'CREATE_ERROR',
//       payload: err,
//     }));
// };

// Logout Current User
const logOutCurrentUser = () => (dispatch) => {
  dispatch({
    type: 'LOG_OUT',
    payload: 'logout',
  });
};

export {
  createUser, authorizeUser, fetchUser, fetchUserFavourites, logOutCurrentUser,
};
