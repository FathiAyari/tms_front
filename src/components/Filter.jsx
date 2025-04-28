const Filter = ({ statusFilter, onStatusFilterChange }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:w-auto sm:items-center sm:space-x-6 gap-4 sm:gap-0 mb-4 sm:mb-0">
      <select
        className="p-2 border border-gray-300 rounded-md w-full  shadow-sm focus:ring-2 focus:ring-green-100 outline-none transition"
        value={statusFilter}
        onChange={onStatusFilterChange}
      >
        <option value="">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Maintenance">Maintenance</option>
      </select>
    </div>
  );
};

export default Filter;
