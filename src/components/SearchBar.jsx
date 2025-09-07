import React from "react";

export default function SearchBar({ query, onQueryChange, onSearch }) {
  function onKeyDown(e) {
    if (e.key === "Enter") onSearch();
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        aria-label="Search books"
        className="flex-1 p-3 rounded border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
        placeholder="Search by title, author or keyword (e.g., 'Harry Potter')"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 rounded bg-sky-600 text-white font-medium hover:bg-sky-700"
      >
        Search
      </button>
    </div>
  );
}
