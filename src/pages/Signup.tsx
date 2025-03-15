import SignupForm from '../components/auth/SignupForm';

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
