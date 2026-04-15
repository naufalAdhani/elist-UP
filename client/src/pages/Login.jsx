import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { login } from '../api/authapi';

export default function Login() {
  const navigate = useNavigate();
  
  // State untuk menyimpan input dan error
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Hapus error saat user mulai mengetik
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email tidak boleh kosong";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password tidak boleh kosong";
    }
    
    return newErrors;
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
  } else {
    try {
      await login({ 
        email: formData.email, 
        password: formData.password 
      });
      navigate('/homelogin');
    } catch (err) {
      alert("Login gagal");
    }
  }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Logo - pojok kiri atas, hanya desktop */}
      <div className="hidden md:flex items-center gap-0 p-8">
        <img src={logo} alt="Logo" className="w-14 h-14" />
        <span className="font-bold text-xl -ml-2">Elist</span>
      </div>

      {/* Form + logo mobile */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Logo - tengah, hanya mobile */}
          <div className="flex md:hidden items-center justify-center gap-0 mb-8">
            <img src={logo} alt="Logo" className="w-20 h-20" />
            <span className="font-bold text-xl -ml-3">Elist</span>
          </div>

          <h2 className="text-2xl font-bold text-center mb-8 tracking-wide">LOGIN</h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700 ml-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 bg-gray-100 border rounded-md text-sm outline-none transition-all focus:bg-white focus:ring-2 
                  ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:border-indigo-500 focus:ring-indigo-500'}`}
              />
              {errors.email && <span className="text-[10px] text-red-500 ml-1 mt-0.5">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700 ml-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 bg-gray-100 border rounded-md text-sm outline-none transition-all focus:bg-white focus:ring-2 
                  ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:border-indigo-500 focus:ring-indigo-500'}`}
              />
              {errors.password && <span className="text-[10px] text-red-500 ml-1 mt-0.5">{errors.password}</span>}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs font-medium text-gray-600 cursor-pointer">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-md transition-colors text-sm"
            >
              Continue
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/register" className="text-xs font-medium text-indigo-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}