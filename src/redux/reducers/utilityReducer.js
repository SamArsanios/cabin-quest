const initialState = {
  message: '',
  type: '',
};

const successReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return {
        ...state,
        message: action.payload,
        type: action.payload.type,
      };
    default:
      return state;
  }
};

const errorReducer = (state = { err: '' }, action) => {
  switch (action.type) {
    case 'CREATE_ERROR':
      return {
        ...state,
        err: action.payload,
      };
    case 'UNLOAD_ERROR':
      return {
        ...state,
        err: action.payload,
      };
    default:
      return state;
  }
};

export { successReducer, errorReducer, initialState };
