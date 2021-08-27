import baseURL from './baseURL';
import queryBuilder from './actionHelper';

const createUser = (data) => queryBuilder().postUser(data, `${baseURL}/api/v1/users`, 'CREATE_USER');

const authorizeUser = (data) => queryBuilder().authorizeUser(data);

const fetchUser = () => queryBuilder().get('/api/v1/users/', 'FETCH_USER');

const fetchUserFavourites = () => queryBuilder().get('/api/v1/favourites', 'ADD_FAVOURITE');

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
