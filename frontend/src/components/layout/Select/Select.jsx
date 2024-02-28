import "./Select.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";

function Select({ categories, handleChange, value }) {
  const [visibilityToggle, setToggle] = useState(true);

  function handleToggle() {
    setToggle(!visibilityToggle);
  }

  return (
    <>
      {visibilityToggle ? (
        <div className="select-container">
          <label htmlFor="category">Category</label>
          <select name="category" onChange={handleChange} value={value}required>
            <option value="">
              Select an Category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <p>
            Or <Link onClick={handleToggle}>add new category!</Link>
          </p>
        </div>
      ) : (
        <>
          <Input
            text="Category"
            placeholder="Type the category name"
            handleChange={handleChange}
            type="text"
            name="category"
          />

          <p>
            Or <Link onClick={handleToggle}> use existing category!</Link>
          </p>
        </>
      )}
    </>
  );
}

export default Select;
