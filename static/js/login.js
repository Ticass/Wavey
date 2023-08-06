const Login = () => {
    const registerForm = document.querySelector('#login-form');
    const errorElement = document.querySelector('#error-message');

    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent regular form submission
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      if ( !email || !password) {
        errorElement.textContent = 'Please fill in all fields.';
        return;
      }

      fetch(`/login?&email=${email}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    });
  };

  // Call the Register function when the DOM content is loaded
  document.addEventListener('DOMContentLoaded', () => {
    Login();
  });
