const initialState = {
  loading: true,
  cabins: [],
  fav: false,
  cabin: [],
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

export default cabinReducer;
