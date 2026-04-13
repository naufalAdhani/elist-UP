import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Logout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-sans px-6">
      <div className="w-full max-w-sm">

        {/* Card */}
        <div className="bg-white rounded-xl shadow-md w-full px-6 py-8 flex flex-col items-center">

          {/* Logo di dalam box */}
          <div className="flex items-center justify-center gap-0 mb-6 w-full">
  <img src={logo} alt="Logo" className="w-16 h-16" />
  <span className="font-bold text-3xl -ml-2">Elist</span>
</div>

          {/* Title */}
          <h2 className="text-base font-bold text-center text-gray-800 mb-6">
            Log out of your Elist account
          </h2>

          {/* Avatar + info */}
          <div className="flex items-center gap-4 mb-6 w-full">
            <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              MA
            </div>
            <div>
              <p className="font-bold text-gray-900 text-base">Muhammad Naufal Adhani</p>
              <p className="text-gray-500 text-sm break-all">muhammadnaufalpes05@gmail.com</p>
            </div>
          </div>

          {/* Log out button */}
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors text-sm mb-4"
          >
            Log out
          </button>

          {/* Switch account */}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Log in to another account
          </button>

        </div>
      </div>
    </div>
  );
}

export default Logout;