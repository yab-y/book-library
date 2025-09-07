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
        disabled={!query.trim()}
        className={`px-4 py-2 rounded font-medium text-white transition ${
    query.trim()
      ? "bg-sky-600 hover:bg-sky-700"
      : "bg-slate-300 cursor-not-allowed"
  }`}
      >
        Search
      </button>
    </div>
  );
}
