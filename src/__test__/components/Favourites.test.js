import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';
import { composeWithDevTools } from 'redux-devtools-extension';
import Favourites from '../../components/container/Favourites';
import rootReducer from '../../redux/reducers/rootReducer';

const state = {};
const middleware = [thunk];
const store = createStore(rootReducer, state, composeWithDevTools(applyMiddleware(...middleware)));
const Wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

Wrapper.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

describe('Favourites', () => {
  it('renders correctly', () => {
    const tree = render(<Favourites />, { wrapper: Wrapper });
    expect(tree).toMatchSnapshot();
  });
});
