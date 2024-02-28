import { createContext } from "react";
import { useMessage } from "../hooks/useMessage";

const MessageContext = createContext(undefined);

function MessageProvider({ children }) {
  const {msg, msgType, createMessage} = useMessage();
  
  return (
    <MessageContext.Provider value={{ msg, msgType, createMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export { MessageContext, MessageProvider };
