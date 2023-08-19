import React, {useState, useContext} from 'react'
import UserContext from '../contexts/user/UserContext'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {user, getCurrentUser} = useContext(UserContext);


    const onSubmit = (e) => {
      e.preventDefault()

        fetch(`http://localhost:8080/login?&email=${email}&password=${password}`, {
          method: 'POST',
          credentials: 'include'
        })
          .then(response => response.json())
          .then(responseData => {
            // Handle the response here, if needed
            console.log('Response:', responseData);
          })
          .catch(error => {
            // Handle any errors that occurred during the fetch request
            console.error('Error:', error);
          });
    }

    const categoryHandlers = {
        email: setEmail,
        password: setPassword,
    }

    const onChange = ({target}) => {
        categoryHandlers[target.name](target.value)
    }



    return (
        <html>
<head>
  <title>Login Page</title>
</head>
<body>
  <div class="container">
    <h2>Login</h2>
    <form id="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" onChange={onChange} name="email" required></input>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" onChange={onChange} required></input>
      </div>
      <div class="form-group">
        <button id="submit" onClick={(e) => onSubmit(e)} type="submit">Login</button>
      </div>
    </form>
  </div>
</body>
</html>
    )
}

export default Login;


