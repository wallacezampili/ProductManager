import Form from "../Form";
import "../Form.css";
import { ProductController } from "../../../../utils/ProductController";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../../../context/MessageContext";
import { useParams } from "react-router-dom";

function EditProduct() {
  const [product, setProduct] = useState({});
  const { createMessage } = useContext(MessageContext);
  const { id } = useParams();

  useEffect(() => {
  
    ProductController.getById(id).then((response) => {
      setProduct(response.data.product); 
    });

    

  }, [id]);

  async function editProduct(product) {

    //edit product in database and create a message component
    const { message, msgType } = await ProductController.editProduct(
      id,
      product
    );

    createMessage(message, msgType);
  }

  return (
    <section className="form-container">
      {product.name && (
        <>
          <header>
            <h1>Editing: {product.name}</h1>
          </header>
          <Form btnText="Edit" handleSubmit={editProduct} data={product} />
        </>
      )}
    </section>
  );
}

export default EditProduct;
