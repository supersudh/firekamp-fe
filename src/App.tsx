import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Signup from './components/Signup';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  actions
} from './store/userSlice';
import Login from './components/Login';
import BookSearch from './containers/BookSearch';
import FavoriteBooks from './containers/FavoriteBooks';

interface AppProps {
  currentUser: any;
  isFetchingCurrentUser: boolean;
  books: any;
  isFetchingBooks: boolean;
  watchAuth: () => void;
  onPerformRegister: (registerObject: any) => void;
  onPerformLogin: (loginObject: any) => void;
}

interface AppState {
}

class App extends React.Component<AppProps, AppState> {

  componentDidMount(): void {
    this.props.watchAuth();
  }

  render() {
    const {
      currentUser,
      isFetchingCurrentUser
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
        <>
          <BookSearch />
          <FavoriteBooks />
        </>
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
  } = state.books;
  return {
    currentUser,
    isFetchingCurrentUser,
    books,
    isFetchingBooks
  };
}
function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
