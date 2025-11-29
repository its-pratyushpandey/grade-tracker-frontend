import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Lock, User, Mail, UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (formData.username.length < 3) {
      toast.error('Username must be at least 3 characters long');
      return;
    }

    setLoading(true);

    try {
      await authAPI.register({
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
      });
      
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error: any) {
      const errorMessage = error.response?.data || error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back to Login Link */}
        <Link
          to="/login"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Sign up to get started with Student Grade Tracker</p>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserPlus className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  className="input pl-10"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="label">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  minLength={3}
                  className="input pl-10"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">At least 3 characters</p>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="input pl-10"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">At least 6 characters</p>
            </div>

            <div>
              <label className="label">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="input pl-10"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
              </div>
            </div>

            <Button type="submit" className="w-full" loading={loading}>
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          © 2025 CodeAlpha. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
