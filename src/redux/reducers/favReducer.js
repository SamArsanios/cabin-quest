export const initialState = {
  loading: true,
  cabins: [],
  cabinImgUrl: '',
};

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_IMAGE':
      return {
        ...state,
        cabinImgUrl: action.payload,
      };
    case 'ADD_FAVOURITE':
      return {
        ...state,
        cabins: action.payload,
      };
    case 'UPDATE_FAVOURITE':
      return {
        ...state,
      };

    case 'REMOVE_FAVOURITE':
      return {
        ...state,
        cabins: state.cabins.filter((cabin) => cabin.id !== Number(action.payload)),
      };
    default:
      return state;
  }
};

export default fetchReducer;
