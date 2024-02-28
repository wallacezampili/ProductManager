/* eslint-disable react/prop-types */
import "./Input.css";

function Input({name, text, value, type, placeholder, handleChange}) {
    return ( 
        <div className="form-control">
            <label htmlFor={name}>{text}</label>
            <input type={type} value={value} placeholder={placeholder} name={name} onChange={handleChange} required/>
        </div>
     );
}

export default Input;