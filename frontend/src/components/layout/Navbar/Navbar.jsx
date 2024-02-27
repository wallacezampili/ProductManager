import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

function Navbar() {
  const { authenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo">Product Manager</div>
      <ul>
        {authenticated ? (
          <>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add</Link>
            </li>
            <li>
              <Link to="/login" onClick={logout}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
