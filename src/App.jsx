import { useState } from 'react'
import './App.css'
import './styles/index.css';



function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const data = await response.json();
      setBooks(data.docs.slice(0, 10)); // get first 10 results
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Book Library</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book..."
          className="border p-2 rounded w-full max-w-md"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <ul className="space-y-2">
        {books.map((book) => (
          <li key={book.key} className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold">{book.title}</h2>
            {book.author_name && <p>Author: {book.author_name.join(', ')}</p>}
            {book.first_publish_year && <p>First Published: {book.first_publish_year}</p>}
          </li>
        ))}
      </ul>

      {books.length === 0 && !loading && <p>No results yet. Try searching for a book.</p>}
    </div>
  );
}

export default App;
