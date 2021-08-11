import {initialState } from '../../redux/reducers/utilityReducer';

test('initialState to be as expected', () => {
  expect(initialState).toEqual({
    message: '',
    type: '',
  });
});
