import Input from "../../layout/Input/Input";
import { Link } from "react-router-dom";
import "./Register.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

function Register() {

  const [user, setUser] = useState({});
  const {register} = useContext(AuthContext);

  function handleChange(e)
  {
    setUser({...user, [e.target.name]: e.target.value});
  }

  async function handleSubmit(e)
  {
    e.preventDefault();
    await register(user);
  }

  return (
    <section className="register-container">
      <header>
        <h1>Register</h1>
      </header>
      <form className="register-form" onSubmit={handleSubmit}>
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

        <Input
          name="confirmpassword"
          type="password"
          text="Confirm your Password"
          placeholder="Confirm your Password"
          handleChange={handleChange}
        />

        <input type="submit" value="Register" />
      </form>
      <p>
        Already have an accout <Link to="/login">login!</Link>
      </p>
    </section>
  );
}

export default Register;
