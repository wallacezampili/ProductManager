import { Link } from "react-router-dom";
import Input from "../../layout/Input/Input";
import "./Login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

function Login() {

  const [user, setUser] = useState({});
  const{login} = useContext(AuthContext);


  async function handleSubmit(e)
  {
    e.preventDefault();
    await login(user);
    
  }

  function handleChange(e)
  {
    setUser({...user, [e.target.name]: e.target.value});
  }

  return (
    <section className="login-container">
      <header>
        <h1>Login</h1>
      </header>
      <form className="login-form" onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          text="E-mail"
          placeholder="Type your password"
          handleChange={handleChange}
        />

        <Input
          name="password"
          type="password"
          text="Password"
          placeholder="Type your password"
          handleChange={handleChange}
        />

        <input type="submit" value="Login"/>
        
      </form>
      <p>
        Does not have an accout <Link to="/register">click here!</Link>
      </p>
    </section>
  );
}

export default Login;
