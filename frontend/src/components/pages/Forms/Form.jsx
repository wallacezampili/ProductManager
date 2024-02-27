import { useEffect, useState } from "react";
import "./Form.css";
import Input from "../../layout/Input/Input";
import { useCategories } from "../../../hooks/useCategories";
import Select from "../../layout/Select/Select";
import { useNavigate } from "react-router-dom";

function Form({ handleSubmit, data, btnText }) {
  const { getCategories, categories } = useCategories();
  const [product, setProduct] = useState(data ? {category: data.category.name, price: data.price, description: data.description, name: data.name} : {});
  const navigate = useNavigate();

  //Get categories for Select
  useEffect(() => {
    getCategories();
  }, []);

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }


  //Activates the submit function
  async function submit(e) {
    e.preventDefault();
    await handleSubmit(product);
    navigate("/");
  }

  return (
    <form onSubmit={submit} className="form">
      <Input
        name="name"
        text="Name"
        placeholder="Type the product name"
        value={product.name || ""}
        type="text"
        handleChange={handleChange}
      />

      <Input
        name="price"
        text="Price"
        placeholder="Type the product price"
        value={product.price || ""}
        type="number"
        handleChange={handleChange}
      />

      <div className="textarea-conainer">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          rows="5"
          placeholder="Type the product description"
          onChange={handleChange}
          value={product.description || ""}
          required
        ></textarea>
      </div>

      <Select
        categories={categories}
        handleChange={handleChange}
        value={product.category}
      />

      <input type="submit" value={btnText} />
    </form>
  );
}

export default Form;
