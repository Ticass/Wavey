import React, { useState } from "react";
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
    fetch(
      `http://localhost:8080/register?first_name=${first_name}&last_name=${last_name}&email=${email}&password=${password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response here, if needed
        console.log("Response:", responseData);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch request
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form id="register-form" onSubmit={(e) => onSubmit(e)}>
        <label for="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          onChange={onChange}
          name="first_name"
          required
        />

        <label for="last_name">Last Name:</label>
        <input type="text" onChange={onChange} id="last_name" name="last_name" required />

        <label for="email">Email:</label>
        <input type="email" onChange={onChange} id="email" name="email" required />

        <label for="password">Password:</label>
        <input type="password" onChange={onChange} id="password" name="password" required />

        <button id="submit" type="submit" value="Register"></button>
      </form>
    </div>
  );
};

export default RegisterPage;
