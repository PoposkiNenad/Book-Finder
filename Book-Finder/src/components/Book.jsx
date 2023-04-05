import Books from '../sharedStyle/Books.css'

const highlightText = (text, searchQuery) => {
  const query = searchQuery.toLowerCase();
  const startIndex = text.toLowerCase().indexOf(query);

  if (startIndex === -1) {
    return text;
  }

  const endIndex = startIndex + query.length;
  const beforeMatch = text.slice(0, startIndex);
  const match = text.slice(startIndex, endIndex);
  const afterMatch = text.slice(endIndex);

  return (
    <>
      {beforeMatch}
      <span style={{ color: 'red', fontWeight: 'bold' }}>{match}</span>
      {afterMatch}
    </>
  );
};

const Book = ({ author, title, genre, searchQuery }) => {
  return (
    <div className="book-list__item">
      <div className="book-list__item-info">
        <div className="book-list__item-author">Author: {highlightText(author, searchQuery)}</div>
        <div className="book-list__item-title">Title: {highlightText(title, searchQuery)}</div>
        <div className="book-list__item-genre">Genre: {highlightText(genre, searchQuery)}</div>
      </div>
    </div>
  );
};


export default Book;
