import { Link } from "react-router-dom";

function coverUrl(cover_i) {
  if (!cover_i) return null;
  return `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
}

export default function BookCard({ book }) {
  const { title, author_name, publisher, cover_i, first_publish_year, isbn, key } = book;
  const img = coverUrl(cover_i);

  return (
    <Link to={`/book${key}`}>
      <article className="flex gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-slate-100">
        {/* Book Cover */}
        <div className="w-24 h-32 flex-shrink-0 bg-slate-100 rounded overflow-hidden flex items-center justify-center">
          {img ? (
            <img
              src={img}
              alt={`Cover for ${title}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-xs text-slate-500 px-2 text-center">No cover</div>
          )}
        </div>

        {/* Book Details */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
          <p className="text-sm text-slate-600 mt-1">
            {author_name && author_name.length > 0 ? author_name.join(", ") : "Unknown Author"}
          </p>

          <div className="mt-3 space-y-1 text-xs text-slate-500">
            <p>
              <span className="font-medium text-slate-700">Publisher:</span>{" "}
              {publisher}
            </p>
            <p>
              <span className="font-medium text-slate-700">First published:</span>{" "}
              {first_publish_year ?? "N/A"}
            </p>
            <p>
              <span className="font-medium text-slate-700">ISBN:</span>{" "}
              {isbn ?? "N/A"}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
