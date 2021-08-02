const successMessage = (message, type = 'default') => dispatch => {
    const payload = {
        message,
        type,
    };
    dispatch({
        type: 'SUCCESS_MESSAGE',
        payload,
    });
};

const searchError = (message) => dispatch => {
    dispatch({
        type: 'SEARCH_ERROR',
        payload: message,
    });
};

const unloadError = () => dispatch => {
    dispatch({
      type: 'UNLOAD_ERROR',
      payload: '',
    });
  };

export { successMessage, searchError, unloadError };
