// // import { render, screen } from '@testing-library/react';
// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import renderer from 'react-test-renderer';
// import App from '../../components/container/App';

// describe('App', () => {
//   it('renders correctly', () => {
//     const tree = renderer
//       .create(
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>,
//       )
//       .toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

// // import { render, screen } from '@testing-library/react';
// import React from 'react';
// import { render } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import PropTypes from 'prop-types';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import App from '../../components/container/App';
// import { rootReducer } from '../../redux/reducers/rootReducer';

// const state = {};
// const middleware = [thunk];
// const store = createStore(rootReducer, state, composeWithDevTools(applyMiddleware(...middleware)));
// const Wrapper = ({ children }) => (
//   <Provider store={store}>{children}</Provider>
// );

// Wrapper.propTypes = {
//   children: PropTypes.shape({}).isRequired,
// };

// describe('App', () => {
//   it('renders correctly', () => {
//     const tree = render(<App />, { wrapper: Wrapper });
//     expect(tree).toMatchSnapshot();
//   });
// });