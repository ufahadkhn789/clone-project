import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !email || !password) {
      return setError('Please fill in all fields');
    }

    const result = await register(username, email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h1 className="absolute top-6 left-6 md:left-12 text-netflix text-4xl md:text-5xl font-bold">NETFLIX</h1>
        
        <div className="bg-black/80 p-12 rounded-md w-full max-w-[450px]">
          <h2 className="text-3xl font-bold mb-8 text-white">Sign Up</h2>
          
          {error && <div className="bg-[#e87c03] text-white p-3 rounded mb-4 text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Username" 
              className="bg-[#333] text-white px-4 py-3 rounded outline-none focus:bg-[#454545]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-[#333] text-white px-4 py-3 rounded outline-none focus:bg-[#454545]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="bg-[#333] text-white px-4 py-3 rounded outline-none focus:bg-[#454545]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-netflix text-white py-3 rounded font-bold mt-4 hover:bg-[#f40612] transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-[#737373] mt-16">
            Already have an account? <Link to="/login" className="text-white hover:underline">Sign in now</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
