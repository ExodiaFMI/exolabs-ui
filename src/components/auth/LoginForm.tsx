import { useState } from 'react';
import { Button } from '../../lib/catalyst/button';
import { Field, Label } from '../../lib/catalyst/fieldset';
import { Input } from '../../lib/catalyst/input';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  error: string;
  success: string;
  message: string;
  onSignUpRedirectClick: () => void;
}

const LoginForm = ({
  onSubmit,
  error,
  success,
  message,
  onSignUpRedirectClick,
}: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-black text-2xl font-bold mb-4">Login</h2>
      {message && <p className="text-blue-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <Field>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
        />
      </Field>
      <Field>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />
      </Field>
      <Button type="submit" className="w-full mt-4">
        Login
      </Button>
      <p className="text-black mt-4 text-center">
        Don't have an account?{' '}
        <a
          href="#"
          onClick={onSignUpRedirectClick}
          className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
