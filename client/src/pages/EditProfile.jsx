import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

// Ikon-ikon
function PencilIcon({ size = 14 }) { 
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>; 
}
function XIcon({ size = 20 }) { 
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} /></svg>; 
}

export default function EditProfile() {
  const navigate = useNavigate();

  // State untuk menyimpan data profil sementara
  const [profile, setProfile] = useState({
    fullName: "Kyra ",
    publicName: "Kyraa ",
    jobTitle: "UI UX",
    email: "Kyraa@gmail.com"
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(profile[field]);
  };

  const handleSave = (field) => {
    if (tempValue.trim()) {
      setProfile({ ...profile, [field]: tempValue });
    }
    setEditingField(null);
  };

  const fields = [
    { key: "fullName", label: "Full name" },
    { key: "publicName", label: "Public name" },
    { key: "jobTitle", label: "Job title" },
    { key: "email", label: "Email" }
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-950 font-sans relative">
      <style>{`
        .edit-input::placeholder{color:#777!important}
      `}</style>

      {/* HEADER MINIMALIS */}
      <header className="flex items-center justify-between bg-purple-500 px-6 py-2.5 text-white flex-shrink-0 z-20 shadow-md">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/homelogin')}>
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="font-bold text-lg">Elist</span>
        </div>
        <button 
          onClick={() => navigate('/homelogin')} 
          className="bg-transparent border-none cursor-pointer p-1 text-white hover:text-gray-200 transition-colors"
          title="Tutup & Kembali"
        >
          <XIcon size={24} />
        </button>
      </header>

      {/* KARTU PROFIL DI TENGAH */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#EBE5FF]">
        <div className="bg-white p-8 rounded-2xl w-full max-w-xl shadow-xl relative">
          
          {/* TOMBOL BACK BARU DI SINI */}
          <button 
            onClick={() => navigate('/homelogin')} 
            className="mb-5 text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-1.5"
          >
            ← Back to Dasbor
          </button>

          <h2 className="text-2xl font-bold mb-8 text-gray-900 tracking-wide border-b pb-4">
            Profile Account page
          </h2>

          <div className="space-y-4">
            {fields.map(({ key, label }) => (
              <div key={key} className="flex justify-between items-center bg-gray-900 rounded-xl p-4 text-sm font-medium transition-all group">
                
                {editingField === key ? (
                  <input 
                    autoFocus 
                    value={tempValue} 
                    onChange={e => setTempValue(e.target.value)} 
                    onBlur={() => handleSave(key)} 
                    onKeyDown={e => { 
                      if (e.key === 'Enter') handleSave(key); 
                      if (e.key === 'Escape') setEditingField(null); 
                    }} 
                    className="edit-input w-full p-2.5 rounded-lg border-2 border-purple-500 bg-gray-800 text-sm outline-none text-white shadow-inner" 
                  />
                ) : (
                  <div className="flex gap-4 items-center w-full">
                    <span className="text-gray-400 text-sm w-28 flex-shrink-0">{label}</span>
                    <span className="text-gray-100 text-sm font-semibold truncate">{profile[key]}</span>
                  </div>
                )}
                
                {/* Tombol Aksi */}
                {editingField === key ? (
                  <div className="flex gap-2 items-center flex-shrink-0 ml-4">
                    <button onClick={() => handleSave(key)} className="bg-purple-600 hover:bg-purple-500 text-white border-none rounded-lg px-4 py-1.5 cursor-pointer text-xs font-bold transition-colors">Save</button>
                    <button onClick={() => setEditingField(null)} className="text-gray-400 hover:text-white bg-transparent border-none cursor-pointer p-1 transition-colors"><XIcon size={18} /></button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleEdit(key)} 
                    className="bg-transparent text-gray-400 opacity-60 group-hover:opacity-100 border-none cursor-pointer p-1 flex gap-1.5 items-center transition-all hover:text-purple-400"
                  >
                    <PencilIcon />
                    <span className="text-xs font-semibold uppercase tracking-wider">Edit</span>
                  </button>
                )}
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}