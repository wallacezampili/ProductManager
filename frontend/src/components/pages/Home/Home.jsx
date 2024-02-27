import "./Home.css";
import { useState, useEffect, useContext } from "react";
import Card from "../../layout/Card/Card";
import SearchBar from "../../layout/SearchBar/SearchBar";
import { ProductController } from "../../../utils/ProductController";
import { MessageContext } from "../../../context/MessageContext";
import {useCategories} from '../../../hooks/useCategories';
import {useProducts} from '../../../hooks/useProducts';


function Home() {
  const {categories, getCategories} = useCategories();
  const {products, getProducts, setProducts} = useProducts();
  const [filter, setFilter] = useState({});
  const { createMessage } = useContext(MessageContext);

  useEffect(() => {
    
    getCategories();
    getProducts(filter);

  }, [filter]);

  //Set up the filter
  function handleSearch(e) {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  }

  async function handleDelete(_id) {
    const { message, msgType } = await ProductController.deleteProduct(_id);

    if (msgType === "success") {
      setProducts(products.filter((product) => product._id != _id));
    }

    createMessage(message, msgType);
  }

  return (
    <section>
      <SearchBar categories={categories} handleSearch={handleSearch} />

      {products.length > 0 ? (
        <div className="product-container">
          {products.map((product) => (
            <Card
              key={product._id}
              name={product.name}
              price={product.price}
              _id={product._id}
              description={product.description}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">Any products found.</div>
      )}
    </section>
  );
}

export default Home;
