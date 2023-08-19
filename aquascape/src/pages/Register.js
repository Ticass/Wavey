import React, { useState } from "react";
import axios from 'axios';


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
  });

  console.log(formData)

  const onChange = ({target}) => {
    setFormData({ ...formData, [target.name]: target.value });
  };


  const onSubmit = (e) => {
    console.log("submitting")
    const { first_name, last_name, email, password } = formData;
    e.preventDefault();


    axios.post(`http://localhost:8080/register?first_name=${first_name}&last_name=${last_name}&email=${email}&password=${password}`,)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div style={{ background: '#333', color: '#f3f3f3', padding: '20px' }}>
      <h1>User Registration</h1>
      <form id="register-form" onSubmit={(e) => onSubmit(e)}>
        <label for="first_name" style={{ display: 'block', marginBottom: '10px' }}>
          First Name:
        </label>
        <input
          type="text"
          id="first_name"
          onChange={onChange}
          name="first_name"
          required
          style={{ marginBottom: '20px', padding: '10px', color: 'black' }} // <- Here
        />

        <label for="last_name" style={{ display: 'block', marginBottom: '10px' }}>
          Last Name:
        </label>
        <input
          type="text"
          onChange={onChange}
          id="last_name"
          name="last_name"
          required
          style={{ marginBottom: '20px', padding: '10px', color: 'black' }} // <- Here
        />

        <label for="email" style={{ display: 'block', marginBottom: '10px' }}>
          Email:
        </label>
        <input
          type="email"
          onChange={onChange}
          id="email"
          name="email"
          required
          style={{ marginBottom: '20px', padding: '10px', color: 'black' }} // <- Here
        />

        <label for="password" style={{ display: 'block', marginBottom: '10px' }}>
          Password:
        </label>
        <input
          type="password"
          onChange={onChange}
          id="password"
          name="password"
          required
          style={{ marginBottom: '20px', padding: '10px', color: 'black' }} // <- Here
        />

        <button id="submit" type="submit" value="Register" style={{ padding: '10px 20px', background: '#555', color: '#f3f3f3', border: 'none', cursor: 'pointer' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
