import * as React from 'react';
import Box from '@mui/material/Box';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import './AuthView.scss';
import BookSearch from '../BookSearch';
import BooksDisplay from '../BooksDisplay';

interface iPropsAuthView {
  fetchBooks: (term: string) => void;
  isFetchingBooks: boolean;
  books: any;
  currentUser: any;
  logout: () => void;
  fetchFavoriteBooks: () => void;
  addFavorite: (arg: any) => void;
}

// Search bar
// Display results for desktop, tab, mobile...
// Right side we need to display Myslist 
// Right side to Mylist we need profile icon, when expanded, user can see their details and logout
export default function AuthView({
  fetchBooks,
  books,
  currentUser,
  logout,
  fetchFavoriteBooks,
  addFavorite,
  isFetchingBooks
}: iPropsAuthView) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ flexGrow: 1 }} className="authview-main">
      <div className="search-bar-tools-section">
        <BookSearch fetchBooks={fetchBooks} isFetchingBooks={isFetchingBooks} />
        <div>
          <AccountBoxIcon className="account_box_ico" onClick={handleClick} />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            className="utility-popover"
          >
            <Typography sx={{ p: 2 }}>{currentUser.email}</Typography>
            <Button variant="contained" onClick={logout}>Logout</Button>
            <Button
              variant="contained"
              onClick={fetchFavoriteBooks}
              disabled={isFetchingBooks}
            >
              Load My Favorites
            </Button>
          </Popover>
        </div>
      </div>
      <BooksDisplay books={books} addFavorite={addFavorite} />
    </Box>
  );
}