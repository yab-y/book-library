import { useState } from 'react';
import './App.css';
import './styles/index.css';
import SearchBar from './components/SearchBar.jsx';
import BookCard from './components/BookCard.jsx';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch() {
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Please enter a search query (title, author, or keyword).');
      setBooks([]);
      return;
    }

    setError('');
    setLoading(true);
    setBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(trimmed)}&limit=20`
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        setError('No results found. Try a different query.');
        setBooks([]);
      } else {
        const mappedBooks = data.docs.map((doc) => ({
          key: doc.key,
          title: doc.title,
          author_name: doc.author_name || [],
          publisher: doc.publisher ? doc.publisher[0] : 'Unknown',
          cover_i: doc.cover_i || null,
          first_publish_year: doc.first_publish_year || null,
          isbn: doc.isbn ? doc.isbn[0] : null,
        }));
        setBooks(mappedBooks);
      }
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('There was an error fetching results. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Book Library</h1>

      <SearchBar
        query={query}
        onQueryChange={(v) => setQuery(v)}
        onSearch={handleSearch}
      />

      {loading && <p className="mt-4">Loading...</p>}

      {error && !loading && (
        <p className="mt-4 text-red-600">{error}</p>
      )}

      {!loading && !error && books.length === 0 && (
        <p className="mt-4">No results yet. Try searching for a book.</p>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
}

export default App;
