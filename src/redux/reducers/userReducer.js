const initialState = {
  loading: true,
  username: '',
  loggedIn: false,
  currentUser: {},
  user_favourites: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_FAVOURITES':
      return {
        ...state,
        user_favoUrites: action.payload,
      };
    case 'AUTHORIZE_USER':
      const { jwt } = action.payload;
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('username', action.username);

      return {
        ...state,
        loading: false,
        loggedIn: true,
        username: action.username,
      };

    case 'CREATE_USER':
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };

    case 'FETCH_USER':
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };

    case 'LOG_OUT':
      return {
        ...state,
        currentUser: {},
        username: '',
      };

    default:
      return state;
  }
};

export default userReducer;
