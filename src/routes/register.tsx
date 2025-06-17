import { useNavigate } from '@tanstack/react-router'
const API_URL = import.meta.env.VITE_API_URL;

export const Route = createFileRoute({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log('EMAIL + PASSWORD: ', email, password);

    fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) throw new Error('Registration failed');
        return response.json();
      })
      .then(data => {
        console.log('Registration successful:', data);
        navigate({ to: '/login' });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
        <label htmlFor="password">Register</label>
        <input type="password" name="password" id="password" />
        <button>Continue</button>
      </form>
    </div>
  );
}
