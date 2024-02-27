import "./SearchBar.css";

function SearchBar({ categories, handleSearch }) {
  return (
    <div className="search">
      <input type="text" name="name" placeholder="Search for a product" onChange={handleSearch}/>
      <div className="select-control">
        <label htmlFor="category">Category: </label>
        <select name="category" onChange={handleSearch}>
            <option value="" defaultValue>Select an Category</option>
            {
                categories.map((category) => (
                    <option key={category._id} value={category.name}>{category.name}</option>
                ))
            }
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
