
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Setelah simulasi register sukses, arahkan kembali ke halaman Login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      
      {/* Header / Logo */}
      <div className="p-8">
        <div className="flex items-center gap-2">
          {/* Logo Icon Placeholder */}
          <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm px-6">
          <h2 className="text-2xl font-bold text-center mb-8 tracking-wide">REGISTER</h2>
          
          <form className="space-y-4" onSubmit={handleRegister}>
            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700 ml-1">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md text-sm focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700 ml-1">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md text-sm focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700 ml-1">Confirm Password</label>
              <input 
                type="password" 
                placeholder="Confirm your password" 
                className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md text-sm focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 mt-2">
              <input 
                type="checkbox" 
                id="remember_reg" 
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
              />
              <label htmlFor="remember_reg" className="text-xs font-medium text-gray-600 cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-md transition-colors text-sm"
            >
              Continue
            </button>
          </form>

          {/* Link back to Login */}
          <div className="mt-6 text-center">
           <Link to="/login" className="text-xs font-medium text-indigo-600 hover:underline">
              Already have an account? Login
           </Link>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Register;