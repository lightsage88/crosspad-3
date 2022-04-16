// import { applyMiddleware, createStore, compose } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';

// const store = configureStore

// export default function configureStore(preloadedstate);

import { createStore } from 'redux';

import rootReducer from './rootReducer';


const store = createStore(rootReducer);


export default store;