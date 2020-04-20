import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';

export const CofigureStore = () => {
  const store = createStore(
    Reducer,
    initialState
  );

  return store;
}