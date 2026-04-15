import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

// Ikon-ikon
function SearchIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2={16.65} y2={16.65} /></svg>; }
function GridIcon({ active }) { return <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={active ? '#534AB7' : '#6d28d9'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={3} width={7} height={7} /><rect x={14} y={3} width={7} height={7} /><rect x={3} y={14} width={7} height={7} /><rect x={14} y={14} width={7} height={7} /></svg>; }
function UsersIcon({ active }) { return <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={active ? '#534AB7' : '#6d28d9'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx={9} cy={7} r={4} /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>; }

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* TOPBAR */}
      <header className="flex items-center justify-between bg-purple-400 px-4 py-2.5 text-white z-20">
        <div className="flex items-center gap-1 w-28 cursor-pointer" onClick={() => navigate('/homelogin')}>
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="font-bold text-base">Elist</span>
        </div>
        
        <div className="relative flex-1 max-w-xs mx-4">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex"><SearchIcon /></div>
          <input placeholder="Search..." className="w-full pl-9 pr-3 py-2 rounded-full border border-white/30 text-sm outline-none bg-white/20 text-white placeholder-white/60" />
        </div>
        
        {/* BAGIAN PROFIL KANAN ATAS */}
        <div className="relative flex items-center gap-2">
          <span className="text-sm font-medium hidden sm:block">Kyraa </span>
          
          {/* Tombol Bulat Inisial */}
          <div 
            onClick={() => setShowProfile(!showProfile)} 
            className="w-8 h-8 bg-white text-gray-700 rounded-full flex items-center justify-center cursor-pointer text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Ky
          </div>

          {/* DROPDOWN MENU PROFIL */}
          {showProfile && (
            <div className="absolute right-0 top-11 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
              {/* Info User */}
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-sm font-bold text-gray-900">Kyraa </p>
                <p className="text-xs text-gray-500">Kyraa@email.com</p>
              </div>
              
              {/* Menu List */}
              <div className="py-1 flex flex-col">
                <button 
                  onClick={() => {
                    setShowProfile(false);
                    alert("Fitur Switch Account akan datang!");
                  }} 
                  className="px-4 py-2 text-sm text-left text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                >
                  Switch Account
                </button>
                
                <button 
                  onClick={() => {
                    setShowProfile(false);
                    navigate('/edit-profile'); // Mengarah ke halaman Edit Profile
                  }} 
                  className="px-4 py-2 text-sm text-left text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                >
                  Profile
                </button>
                
                <hr className="my-1 border-gray-100" />
                
                <button 
                  onClick={() => {
                    setShowProfile(false);
                    navigate('/login'); // Mengarah kembali ke halaman Login saat Logout
                  }} 
                  className="px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 font-medium transition-colors"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-56 bg-purple-300 p-4 flex flex-col gap-1">
          <button onClick={() => navigate('/homelogin')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/homelogin' ? 'bg-white text-purple-900 shadow-sm' : 'text-purple-800 hover:bg-white/40'}`}>
            <GridIcon active={location.pathname === '/homelogin'} /> Boards
          </button>
          <button onClick={() => navigate('/member')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/member' ? 'bg-white text-purple-900 shadow-sm' : 'text-purple-800 hover:bg-white/40'}`}>
            <UsersIcon active={location.pathname === '/member'} /> Members
          </button>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main 
          className="flex-1 overflow-y-auto p-6 bg-white" 
          onClick={() => setShowProfile(false)} // Menutup dropdown jika user klik area kosong
        >
          {children}
        </main>
      </div>
    </div>
  );
}