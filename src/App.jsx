import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar.jsx';
import BookCard from './components/BookCard.jsx';
import SearchPage from './pages/SearchPage.jsx';
import BookDetails from './components/BookDetails.jsx';
import './App.css';
import './styles/index.css';

function App() {
  // State & search logic (Phase 1)
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch() {
    const trimmed = query.trim();
    if (!trimmed) {
      setError('⚠️ Please enter a search query (title, author, or keyword).');
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
        setError('❌ No results found. Try a different query.');
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
      setError('⚠️ There was an error fetching results. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Phase 2 Routing
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-50">
            <header className="sticky top-0 bg-white shadow p-4 z-10">
              <h1 className="text-3xl font-bold text-sky-700">📚 Book Library</h1>
              <p className="text-sm text-gray-500">
                Search for books by title, author, or keyword
              </p>
              <div className="mt-3">
                <SearchBar
                  query={query}
                  onQueryChange={(v) => setQuery(v)}
                  onSearch={handleSearch}
                />
              </div>
            </header>

            <main className="max-w-4xl mx-auto p-6">
              {loading && (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
                  <span className="ml-3 text-sky-600">Loading books...</span>
                </div>
              )}

              {error && !loading && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded border border-red-200">
                  {error}
                </div>
              )}

              {!loading && !error && books.length === 0 && (
                <div className="mt-12 text-center text-gray-500">
                  <p className="text-lg">🔍 Start by searching for a book above!</p>
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {books.map((book) => (
                  <BookCard key={book.key} book={book} />
                ))}
              </div>
            </main>
          </div>
        }
      />

      <Route path="/book/:bookKey" element={<BookDetails />} />
    </Routes>
  );
}

export default App;
