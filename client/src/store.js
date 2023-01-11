import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken'

const intitialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  intitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
  if (previousState.authReducer.token !== currentState.authReducer.token) {
    const token = currentState.authReducer.token;
    setAuthToken(token);
  }
})

export default store;
