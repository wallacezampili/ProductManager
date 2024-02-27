import "./Message.css";
import { useContext } from "react";
import { MessageContext } from "../../../context/MessageContext";
import { FaRegCircleCheck as Success, FaCircleXmark as Error } from "react-icons/fa6";

function Message() {
  const { msg, msgType } = useContext(MessageContext);

  return (
    msg && (
        <div className={`message ${msgType}`}>
            {
                msgType == 'success' && (
                    <Success className="success-icon"/>
                )  
            }

            {
                 msgType == 'error' && (
                    <Error className="error-icon"/>
                )
            }

            <p>
                {msg}
            </p>
        </div>
        )
    );
}

export default Message;
