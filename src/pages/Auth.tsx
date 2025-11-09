import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Mail, Lock, BookOpen } from 'lucide-react';
import { User } from '../types/models';
import { dummyUsers } from '../utils/dummyData';

interface AuthProps {
  onLogin: (user: User) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Placeholder authentication logic
    // In a real app, this would call an API
    if (isLogin) {
      const user = dummyUsers.find((u) => u.email === email);
      if (user) {
        onLogin(user);
        navigate(user.role === 'teacher' ? '/teacher' : '/student');
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Signup logic (placeholder)
      // For demo, create a student account
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'student',
        grade: 10,
      };
      onLogin(newUser);
      navigate('/student');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-16 w-16 text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-gray-300">
            {isLogin
              ? 'Sign in to your account to continue'
              : 'Join our learning community'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-red-300">
          {/* Toggle */}
          <div className="flex mb-6 bg-red-50 rounded-lg p-1">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                isLogin
                  ? 'bg-red-800 text-white'
                  : 'text-red-800 hover:text-red-900'
              }`}
            >
              <LogIn className="h-4 w-4 inline mr-2" />
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                !isLogin
                  ? 'bg-red-800 text-white'
                  : 'text-red-800 hover:text-red-900'
              }`}
            >
              <UserPlus className="h-4 w-4 inline mr-2" />
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="text-sm text-gray-600">
              <p className="mb-2">Demo credentials:</p>
              <p>Teacher: sarah@lms.com</p>
              <p>Student: john@student.com</p>
            </div>

            <button
              type="submit"
              className="w-full bg-red-800 text-white py-3 rounded-lg font-semibold hover:bg-red-900 transition shadow-md"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

