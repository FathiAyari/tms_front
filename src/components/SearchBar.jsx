const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex flex-grow sm:w-auto mb-4 sm:mb-0">
      <input
        type="text"
        placeholder="Search vehicles by name ..."
        className="p-3 mb-4 sm:mb-0 border border-gray-300 rounded-md w-full sm:w-2/3 lg:w-1/2 shadow-sm focus:ring-2 focus:ring-green-100 outline-none transition"
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default SearchBar;
