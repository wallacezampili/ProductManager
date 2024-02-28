import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import { MessageProvider } from "./context/MessageContext";
import { AuthProvider } from "./context/AuthContext";
import Message from "./components/layout/Message/Message";
function App() {
  return (
    <>
      <MessageProvider>
        <AuthProvider>
          <Navbar />
          <Message />
          <Outlet />
      </AuthProvider>
      </MessageProvider>
    </>
  );
}

export default App;
