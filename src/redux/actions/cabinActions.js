import baseURL from './baseURL';
import queryBuilder from './actionHelper';

const fetchCabin = (id) => queryBuilder().get(`/api/v1/cabins/${id}.json`, 'FETCH_CABIN');

const fetchCabins = () => queryBuilder().get(`${baseURL}/api/v1/cabins.json`, 'FETCH_CABINS');

const fetchFavourites = () => queryBuilder().get('/api/v1/favourites.json', 'FAVOURITE_CABIN');

const createCabin = (data) => queryBuilder().post(data, '/api/v1/cabins.json', 'SUCCESS_MESSAGE');

const updateCabin = (data, id) => queryBuilder().update(data, `/api/v1/cabins/${id}.json`, 'UPDATE_CABIN');

const deleteCabin = (id) => queryBuilder().deletes(`/api/v1/cabins/${id}.json`, 'DELETE_CABIN');

const unLoad = (states) => (dispatch) => {
  dispatch({
    type: 'CLEAR_STATE',
    payload: states,
  });
};

export {
  fetchCabin, fetchCabins, createCabin, updateCabin, deleteCabin, unLoad, fetchFavourites,
};
