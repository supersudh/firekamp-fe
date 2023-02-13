import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import './BooksDisplay.scss';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


interface BooksDisplayProps {
  books: any;
  addFavorite: (arg: any) => void;
}

export default function BooksDisplay({
  books,
  addFavorite
}: BooksDisplayProps) {
  const [open, setOpen] = React.useState(false);
  const { items } = books;
  if (!items) {
    return null;
  }
  const openSnackBar = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="bd_main">
      <div className="bd_main__inner">
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Book Added to favorites!
          </Alert>
        </Snackbar>
        <Grid container spacing={2} className="bd_grid">
          {
            items.map((thisItem: any, i: number) => {
              const title = thisItem.volumeInfo?.title ?? thisItem.title;
              const author = thisItem.volumeInfo?.authors?.join(', ') ?? thisItem.authors;
              const image = thisItem.volumeInfo?.imageLinks?.thumbnail ?? thisItem.image;
              return (
                <Card
                  sx={{ maxWidth: 300, margin: '4rem 2rem' }}
                  key={`book-${i}`}
                  className="main-card"
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {author}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        addFavorite({
                          bookId: thisItem.id,
                          title: thisItem.volumeInfo.title,
                          author: thisItem.volumeInfo.authors.join(', '),
                          genre: '',
                          image: thisItem.volumeInfo.imageLinks.thumbnail
                        });
                        openSnackBar();
                      }}
                      style={{ display: thisItem.volumeInfo?.title ? 'block' : 'none' }}
                    >
                      ADD
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          }
        </Grid>
      </div>
    </div>
  );
}