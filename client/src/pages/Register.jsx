import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { register } from '../api/authapi';

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
     try {
    await register({ email, password });
    navigate('/login');
  } catch (err) {
    alert("Register gagal");
  }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">

      {/* Logo - pojok kiri atas, hanya desktop */}
      <div className="hidden md:flex items-center gap-0 p-8">
        <img src={logo} alt="Logo" className="w-14 h-14" />
        <span className="font-bold text-xl -ml-2">Elist</span>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 md:py-0">
        <div className="w-full max-w-sm">

          {/* Logo - tengah, hanya mobile */}
          <div className="flex md:hidden items-center justify-center gap-0 mb-8 w-full">
            <img src={logo} alt="Logo" className="w-16 h-16" />
            <span className="font-bold text-xl -ml-2">Elist</span>
          </div>

          <h2 className="text-2xl font-bold text-center mb-8 tracking-wide">REGISTER</h2>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700 ml-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700 ml-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700 ml-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="remember_reg"
                className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="remember_reg" className="text-xs font-medium text-gray-600 cursor-pointer">
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