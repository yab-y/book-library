import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function coverUrl(coverId) {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
}

export default function BookDetails() {
  const { bookKey } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`https://openlibrary.org${bookKey}.json`);
        if (!response.ok) throw new Error("Failed to fetch book details");
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError("⚠️ Error loading book details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [bookKey]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
        <span className="ml-3 text-sky-600">Loading book details...</span>
      </div>
    );

  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;
  if (!book) return <p className="text-center mt-6">No book found.</p>;

  const imgUrl = coverUrl(book.covers ? book.covers[0] : null);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/" className="text-blue-600 hover:underline">← Back to search</Link>

      <div className="mt-4 flex flex-col sm:flex-row gap-6">
        {imgUrl && (
          <img
            src={imgUrl}
            alt={`Cover for ${book.title}`}
            className="w-48 h-64 object-cover rounded shadow"
          />
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          {book.description && (
            <p className="mt-2 text-gray-700">
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <div>First published: {book.first_publish_date ?? "N/A"}</div>
            <div>
              Subjects: {book.subjects ? book.subjects.join(", ") : "N/A"}
            </div>
            <div>Number of pages: {book.number_of_pages ?? "N/A"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
