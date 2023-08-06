const Register = () => {
    const registerForm = document.querySelector('#register-form');
    const errorElement = document.querySelector('#error-message');

    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent regular form submission

      const first_name = document.querySelector('#first_name').value;
      const last_name = document.querySelector('#last_name').value;
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      if (!first_name || !last_name || !email || !password) {
        errorElement.textContent = 'Please fill in all fields.';
        return;
      }

      const data = {
        first_name,
        last_name,
        email,
        password,
      };

      fetch(`/register?first_name=${first_name}&last_name=${last_name}&email=${email}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
    Register();
  });
