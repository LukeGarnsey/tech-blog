const registerFormHandler = async (event) => {
  // TODO: Add a comment describing the functionality of this statement
  event.preventDefault();

  // TODO: Add a comment describing the functionality of these expressions
  const username = document.querySelector('#register-username').value.trim();
  const password = document.querySelector('#register-password').value.trim();

  if (username && password) {
    // TODO: Add a comment describing the functionality of this expression
    const response = await fetch('/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to register');
    }
  }
};

document
  .querySelector('.register-form')
  .addEventListener('submit', registerFormHandler);
