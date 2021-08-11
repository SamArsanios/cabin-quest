import { initialState } from '../../redux/reducers/favReducer';

test('initialState to be as expected', () => {
  expect(initialState).toEqual({
    loading: true,
    cabins: [],
    cabinImgUrl: '',
  });
});
