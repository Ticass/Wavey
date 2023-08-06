import React, {useState} from 'react'
const RegisterPage = ({}) => {
    return (
<div>
         <h1>User Registration</h1>
<form id="register-form"></form>
  <label for="first_name">First Name:</label>
  <input type="text" id="first_name" name="first_name" required><br/></input>

  <label for="last_name">Last Name:</label>
  <input type="text" id="last_name" name="last_name" required><br/></input>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required><br/></input>

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required><br/></input>

  <button id="submit" type="submit" value="Register"></button>
  </div>

    )
}


export default RegisterPage;
