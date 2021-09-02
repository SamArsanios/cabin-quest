import { initialState } from '../../redux/reducers/userReducer';

test('initialState to be as expected', () => {
  expect(initialState).toEqual({
    loading: true,
    username: '',
    loggedIn: false,
    currentUser: {},
    userFavourites: [],
  });
});
