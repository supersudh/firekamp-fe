import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import Signup from './components/Signup';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  actions as userActions
} from './store/userSlice';
import {
  actions as bookActions
} from './store/bookSlice';
import Login from './components/Login';
import BookSearch from './containers/BookSearch';
import FavoriteBooks from './containers/FavoriteBooks';
import AuthView from './containers/AuthView';

interface AppProps {
  currentUser: any;
  isFetchingCurrentUser: boolean;
  books: any;
  isFetchingBooks: boolean;
  watchAuth: () => void;
  onPerformRegister: (registerObject: any) => void;
  onPerformLogin: (loginObject: any) => void;
  fetchBooks: (term: any) => void;
  logout: () => void;
  fetchFavoriteBooks: () => void;
  addFavorite: (arg: any) => void;
}

interface AppState {
}

class App extends React.Component<AppProps, AppState> {

  componentDidMount(): void {
    this.props.watchAuth();
  }

  render() {
    const {
      books,
      currentUser,
      isFetchingCurrentUser,
      isFetchingBooks,
      fetchFavoriteBooks,
      addFavorite,
      logout
    } = this.props;

    if (!currentUser) {
      return (
        <>
          <Signup onPerformRegister={this.props.onPerformRegister} />
          <p className="text-center">(OR)</p>
          <Login onPerformLogin={this.props.onPerformLogin} />
        </>
      );
    } else {
      return (
        <AuthView
          fetchBooks={this.props.fetchBooks}
          isFetchingBooks={isFetchingBooks}
          books={books}
          currentUser={currentUser}
          fetchFavoriteBooks={fetchFavoriteBooks}
          addFavorite={addFavorite}
          logout={logout}
        />
      );
    }

  }
}

function mapStateToProps(state: any) {
  const {
    currentUser,
    isFetchingCurrentUser
  } = state.users;

  const {
    books,
    isFetchingBooks
  } = state.booksData;
  return {
    currentUser,
    isFetchingCurrentUser,
    books,
    isFetchingBooks
  };
}
function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ ...userActions, ...bookActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
