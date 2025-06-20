import { useNavigate } from "react-router";
import React, { useState } from 'react';
import * as z from 'zod/v4';
import { emailMessage, passwordMinMessage, passwordMismatchErrorMessage } from "../messages/errorValidation";
const API_URL = import.meta.env.VITE_API_URL;

const registerSchema = z.object({
  email: z.string().email({ message: emailMessage }),
  password: z.string().min(8, { message: passwordMinMessage }), 
  confirmPassword: z.string().min(8, { message: passwordMinMessage }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});


export function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({})

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = registerSchema.safeParse({email, password, confirmPassword })
    if(!result.success) {
      const errors: Record< string, string> = {} 
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !errors[field]) {
          errors[field] = issue.message; 
        }
      }
      setErrors(errors)
      return;
    }
    setErrors({})
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
        navigate("/login");
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          {errors.email && <p>{errors.email}</p>}
          <input type="text" name="email" id="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          {errors.password && <p>{errors.password}</p>}
          <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          <input type="password" name="confirmPassword" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)}/>
        </div>
        <button>Continue</button>
      </form>
    </div>
  );
}
