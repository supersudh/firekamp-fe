import { call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects'
import axios from 'axios';
import { actions as userActions } from '../store/userSlice';

export function* mySaga() {
  console.log('I Am running saga!');
  yield fork(authWatcher);
  yield fork(registrationWatcher);
  yield fork(loginWatcher);
  yield fork(logoutWatcher);
  yield fork(booksFetcher);
  yield fork(favoriteBook);

}

const URL = 'http://localhost:3000';

function* authWatcher() {
  yield takeEvery(userActions.watchAuth, function* handler() {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const { data } = yield axios.get(`${URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        yield put(userActions.setCurrentUser(data));
      } else {
        yield put(userActions.setCurrentUser(undefined));
      }
    } catch (error) {
      console.log(error);
      yield put(userActions.setCurrentUser(undefined));
    }
  })
}

function* registrationWatcher() {
  try {
    yield takeLatest(userActions.onPerformRegister, function* handler({ payload }) {
      try {
        const body = payload;
        const { data } = yield axios.post(`${URL}/users/register`, body);
        const { access_token } = data;
        window.localStorage.setItem('token', access_token);
        yield put(userActions.setCurrentUser(data));
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {

  }
}

function* loginWatcher() {
  yield takeLatest(userActions.onPerformLogin, function* handler({ payload }) {
    try {
      const body = payload;
      const { data } = yield axios.post(`${URL}/users/login`, body);
      const { access_token } = data;
      window.localStorage.setItem('token', access_token);
      yield put(userActions.setCurrentUser(data));
    } catch (error) {
      console.log(error);
    }
  });
}

function* logoutWatcher() {
  try {
    
  } catch (error) {

  }
}

function* booksFetcher() {
  try {

  } catch (error) {

  }
}

function* favoriteBook(type = '') {
  try {

  } catch (error) {

  }
}