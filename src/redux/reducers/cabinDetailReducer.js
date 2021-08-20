export const initialState = {
  loading: true,
  cabin: [],
  fav: false,
  cabinImgUrl: '',
};
const cabinDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CABIN':
      return {
        ...state,
        loading: false,
        cabin: action.payload,
      };

    case 'UPDATE_CABIN':
      return {
        ...state,
        loading: false,
        cabin: action.payload,
      };
    case 'FAVOURITE_CABIN':
      return {
        ...state,
        loading: false,
        fav: true,
      };
    case 'NOT_FAVOURITE_CABIN':
      return {
        ...state,
        loading: false,
        fav: false,
      };
    case 'CREATE_CABIN':
      return {
        ...state,
        loading: false,
        cabin: action.payload,
      };
    case 'DELETE_CABIN':
      return {
        ...state,
        loading: false,
      };

    case 'CLEAR_IMG':
      return {
        ...state,
        cabinImgUrl: {},
      };
    default:
      return state;
  }
};

export default cabinDetailReducer;
