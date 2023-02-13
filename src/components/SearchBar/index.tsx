import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './SearchBar.scss';
import { useState } from 'react';

interface ISearchBarProps {
  fetchBooks: (term: string) => void;
  isFetchingBooks: boolean;
}

export default function SearchBar({ fetchBooks, isFetchingBooks }: ISearchBarProps) {
  const [term, setTerm] = useState('');
  
  const handleOnKeyPress = (evt: any) => {
    if (isFetchingBooks) {
      return;
    }
    if (evt.key === 'Enter') {
      if (term) {
        fetchBooks(term);
      }
    }
  };

  return (
    <div className="searchBar_parent">
      <div className="searchBar_parent__inner">
        <Box
          sx={{
            width: '50%',
            maxWidth: '100%',
          }}
        >
          <TextField
            fullWidth
            label="Title, author or Genre"
            id="fullWidth"
            value={term}
            onChange={evt => setTerm(evt.target.value)}
            onKeyPress={evt => handleOnKeyPress(evt)}
          />
        </Box>
        <Button variant="contained" onClick={e => isFetchingBooks ? false : fetchBooks(term)}>
          SEARCH
        </Button>
      </div>
    </div>
  );
}