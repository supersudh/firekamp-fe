import { call, put, takeEvery, takeLatest, fork } from 'redux-saga/effects'
import axios from 'axios';
import { actions as userActions } from '../store/userSlice';
import { actions as bookActions } from '../store/bookSlice';

export function* mySaga() {
  console.log('I Am running saga!');
  yield fork(authWatcher);
  yield fork(registrationWatcher);
  yield fork(loginWatcher);
  yield fork(logoutWatcher);
  yield fork(booksFetcher);
  yield fork(fetchFavoriteBookWatcher);
  yield fork(addFavoriteBookWatcher);


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
  yield takeLatest(userActions.logout, function* handler({ payload }) {
    try {
      window.localStorage.removeItem('token');
      yield put(bookActions.setBooks([]));
    } catch (error) {
      console.log(error);
    }
  });
}

function* booksFetcher() {
  yield takeLatest(bookActions.fetchBooks, function* handler({ payload }) {
    try {
      const term = payload || '';
      const { data } = yield axios.get(`https://www.googleapis.com/books/v1/volumes?q=${term.replace(/ /g, '+')}`);
      yield put(bookActions.setBooks(data));
    } catch (error) {
      console.log(error);
    }
  });
}

function* fetchFavoriteBookWatcher() {
  yield takeLatest(bookActions.fetchFavoriteBooks, function* handler({ payload }) {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = yield axios.get(`${URL}/users/favorite_books`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      yield put(bookActions.setBooks(data));
    } catch (error) {
      console.log(error);
    }
  });
}

function* addFavoriteBookWatcher() {
  yield takeLatest(bookActions.addFavorite, function* handler({ payload }) {
    try {
      const body = payload;
      const token = window.localStorage.getItem('token');
      const { data } = yield axios.post(`${URL}/users/favorite_book`, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
}