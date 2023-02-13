import { combineReducers, configureStore, applyMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import {reducer as userSliceReducer} from './userSlice';
import {reducer as bookSliceReducer} from './bookSlice';
import { mySaga } from '../sagas';

const rootReducer = combineReducers({
  users: userSliceReducer,
  booksData: bookSliceReducer,
});

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
});

sagaMiddleware.run(mySaga);

export default store;