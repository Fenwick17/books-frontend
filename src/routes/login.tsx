import { useNavigate } from "react-router";
import React from 'react'
const API_URL = import.meta.env.VITE_API_URL;

export function Login() {
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) throw new Error('Login failed');
        return response.json();
      })
      .then(data => {
        console.log('Login successful:', data);
        navigate("/");
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
        <button type="submit" data-testid="login-submit">Continue</button>
      </form>
    </div>
  );
}
