const Searchbar = ({ placeholder, search, setSearch }) => {
  return (
    <div>
      <input
        className="p-2 border w-full"
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

// Default Prop for placeholder
Searchbar.defaultProps = {
  placeholder: "Search ...",
};

export default Searchbar;
