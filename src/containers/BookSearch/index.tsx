import SearchBar from "../../components/SearchBar";
import './BookSearch.scss';

interface IBookSearch {
  fetchBooks: (term: string) => void;
  isFetchingBooks: boolean;
}

export default function BookSearch({ fetchBooks, isFetchingBooks }: IBookSearch) {
  return (
    <div className="BookSearch_container">
      <div className="BookSearch_container__inner">
        <SearchBar fetchBooks={fetchBooks} isFetchingBooks={isFetchingBooks} />
      </div>
    </div>
  );
}