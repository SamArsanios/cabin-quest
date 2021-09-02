import { initialState } from '../../redux/reducers/cabinReducer';

test('initialState to be as expected', () => {
  expect(initialState).toEqual({
    loading: true,
    cabins: [],
    fav: false,
    cabin: [],
    cabinImgUrl: '',
  });
});
