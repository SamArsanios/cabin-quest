export const initialState = {
  loading: true,
  cabins: [],
  fav: false,
  cabinImgUrl: '',
};
const cabinReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_STATE':
      return {
        ...state,
        ...action.payload,
      };
    case 'FETCH_CABINS':
      return {
        ...state,
        loading: false,
        cabins: action.payload,
      };
    default:
      return state;
  }
};

export default cabinReducer;
