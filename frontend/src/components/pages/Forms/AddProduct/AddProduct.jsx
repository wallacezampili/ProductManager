import Form from "../Form";
import "../Form.css";
import { ProductController } from "../../../../utils/ProductController";
import { useContext } from "react";
import { MessageContext } from "../../../../context/MessageContext";

function AddProduct() {
  const { createMessage } = useContext(MessageContext);

  async function createProduct(product) {
    //Add product to database and create a message component
    const { message, msgType } = await ProductController.addProduct(product);
    createMessage(message, msgType);
  }

  return (
    <section className="form-container">
      <header>
        <h1>Add a product</h1>
      </header>
      <Form btnText="Add Product" handleSubmit={createProduct} />
    </section>
  );
}

export default AddProduct;
