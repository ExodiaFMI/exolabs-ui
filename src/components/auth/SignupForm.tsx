import { useState } from 'react';
import { Button } from '../../lib/catalyst/button';
import { Field, Label } from '../../lib/catalyst/fieldset';
import { Input } from '../../lib/catalyst/input';
import { useNavigate } from 'react-router';

const SignupForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      setSuccess('Signup successful!');
      navigate('/login', { state: { message: 'Signup successful!' } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-black text-2xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <Field>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          required
          className="w-full"
        />
      </Field>
      <Field>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
          className="w-full"
        />
      </Field>
      <Field className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
          className="w-full"
        />
      </Field>
      <Button type="submit" className="w-full p-2 bg-blue-500 text-white">
        Signup
      </Button>
      <p className="text-black mt-4 text-center">
        Already have an account?{' '}
        <a
          href="#"
          onClick={() => navigate('/login')}
          className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </form>
  );
};

export default SignupForm;
