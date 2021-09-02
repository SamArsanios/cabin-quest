/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import baseURL from './baseURL';
import queryBuilder from './actionHelper';

const addToFavourites = (data, user, favourites, cabin) => queryBuilder().postFavourites('/api/v1/favourites.json', data, user, favourites, cabin);

const removeFromFavourites = (cabin_id, user) => queryBuilder().removeFavourites(`${baseURL}/api/v1/favourites/${cabin_id}.json`, cabin_id, user);

const uploadImage = (image) => queryBuilder().postImage(image);

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
