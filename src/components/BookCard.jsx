
function coverUrl(cover_i) {
  if (!cover_i) return null;
  return `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
}

export default function BookCard({ book }) {
  const { title, author_name, publisher, cover_i, first_publish_year, isbn } = book;
  const img = coverUrl(cover_i);

  return (
    <article className="flex gap-4 p-4 bg-white rounded shadow-sm hover:shadow-md transition">
      <div className="w-24 h-32 flex-shrink-0 bg-slate-100 rounded overflow-hidden flex items-center justify-center">
        {img ? (
          <img src={img} alt={`Cover for ${title}`} className="w-full h-full object-cover" />
        ) : (
          <div className="text-xs text-slate-500 px-2 text-center">No cover</div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-slate-600">
          {author_name && author_name.length > 0 ? author_name.join(", ") : "Unknown Author"}
        </p>

        <div className="mt-2 text-xs text-slate-500">
          <div>Publisher: {publisher}</div>
          <div>First published: {first_publish_year ?? "N/A"}</div>
          <div>ISBN: {isbn ?? "N/A"}</div>
        </div>
      </div>
    </article>
  );
}
