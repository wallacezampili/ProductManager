import "./Card.css";
import { FaTrashAlt as Delete, FaPencilAlt as Edit } from "react-icons/fa";
import { ProductController } from "../../../utils/ProductController";

function Card({ _id, name, price, description, handleDelete }) {
  return (
    <div className="card">
      <h1>{name}</h1>
      <p>{description}</p>
      <h2>R$ {price}</h2>
      <div className="actions">
        <a href={`/edit/${_id}`}>
          <Edit />
        </a>

        <button
          onClick={async () => {
            await handleDelete(_id);
          }}
        >
          <Delete />
        </button>
      </div>
    </div>
  );
}

export default Card;
