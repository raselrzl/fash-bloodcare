"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavigationLink from '../components/NavigationLink';

const AdminAuth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber:'',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Check if the user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log('Server response:', data);

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        alert('Login successful!');
        localStorage.setItem('isLoggedIn', 'true');

        // Check if the user is a super admin and set the flag
        if (data.user.superAdmin) {
          localStorage.setItem('superAdminLoggedIn', 'true');
        } else {
          localStorage.setItem('superAdminLoggedIn', 'false');
        }

        // Redirect based on the returned redirectPath
        router.push(data.redirectPath);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber:formData.phoneNumber,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log('Server response:', data);

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        alert('Registration successful!');
        // You can decide what happens after registration, e.g., login automatically or redirect elsewhere
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match!');
        setLoading(false);
        return;
      }
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-gray-200 py-8 px-2 overflow-x-hidden">
      <div className="space-y-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-xl border border-gray-700 p-4 md:px-10 lg:px-20 xl:px-24">
        <h2 className="text-2xl font-bold text-center m-6">
          {isRegister ? 'Admin Register' : 'Admin Login'}
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleFormSubmit}>
          {isRegister && (
            <div className="mb-4">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder='Full Name'
                required
                className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
              />
            </div>
          )}

          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Email'
              required
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            />
          </div>
          {isRegister && (
          <div className="mb-4">
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder='Phone Number'
              required
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            />
          </div>
              )}

          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Password'
              required
              className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
            />
          </div>

          {isRegister && (
            <div className="mb-4">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder='Confirm Password'
                required
                className="bg-gray-800 font-bold text-white border border-gray-700 px-4 py-2 w-full"
              />
            </div>
          )}

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="relative px-6 py-3 font-bold text-white bg-transparent border-2 border-transparent overflow-hidden group hover:border-gray-400 hover:bg-gray-800"
              disabled={loading}
            >
              <span className="absolute inset-0 border-2 border-gradient opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 px-10 text-base md:text-lg lg:text-xl">
                {loading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
              </span>
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            type="button"
            className="text-gray-400 underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
          </button>
        </div>
      </div>
      <NavigationLink />
    </div>
  );
};

export default AdminAuth;
