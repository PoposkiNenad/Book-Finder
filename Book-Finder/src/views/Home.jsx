import React, { useState, useEffect } from "react";
import Book from "../components/Book";
import listOfBooks from "../data/listofbooks.json";
import Books from "../sharedStyle/Books.css";
import Controls from "../sharedStyle/Controls.css";

const Home = () => {
  const [sortedBooks, setSortedBooks] = useState(listOfBooks);
  const [sortBy, setSortBy] = useState('author');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const sortBooks = (a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    };

    const newSortedBooks = [...listOfBooks].sort(sortBooks);
    setSortedBooks(newSortedBooks);
  }, [sortBy]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const results = sortedBooks.filter(
      ({ author, title, genre }) =>
        author.toLowerCase().includes(query) ||
        title.toLowerCase().includes(query) ||
        genre.toLowerCase().includes(query)
    );
    setSearchResults(results);
  };

  const displayedBooks = searchResults === null ? sortedBooks : searchResults;

  return (
    <div>
      <div className="sort-search">
        <div className="sort-search__sort">
          Sort by:
          <select
            className="sort-search__select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="genre">Genre</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="sort-search__search">
          <input
            type="text"
            className="sort-search__input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
          <button className="sort-search__button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Book List */}
      <div className="book-list">
        {displayedBooks.length > 0 ? (
          displayedBooks.map(({ author, title, genre }) => {
            return (
              <Book
                title={title}
                author={author}
                genre={genre}
                key={title}
                searchQuery={searchQuery}
              />
            );
          })
        ) : (
          <div>No results found</div>
        )}
      </div>
    </div>
  );
};

export default Home;
