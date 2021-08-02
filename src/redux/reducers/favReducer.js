const initialState = {
  loading: true,
  cabins: [],
  fav: false,
  cabin: [],
  cabinImgUrl: '',
};

const fetchReducer = (state = initialState, action) => {
switch (action.type) {
  case 'ADD_IMAGE':
    return {
      ...state,
      cabinImgUrl: action.payload,
    };
    case 'UPDATE_FAV':
    return {
      ...state,
      fav: true,
    };

    case 'REMOVE_FAV':
    return {
      ...state,
      fav: false,
    };
  default:
    return state;
  }
}