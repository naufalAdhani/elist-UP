import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

// Ikon Bantuan
function ArrowRightIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1={5} y1={12} x2={19} y2={12} /><polyline points="12 5 19 12 12 19" /></svg>; }
function BoardIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={3} width={18} height={18} rx={2} ry={2} /><line x1={9} y1={3} x2={9} y2={21} /><line x1={15} y1={3} x2={15} y2={21} /></svg>; }
function UsersIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx={9} cy={7} r={4} /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>; }
function InboxIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>; }

export default function Home() {
  const [selected, setSelected] = useState("");
  const [lists, setLists] = useState([{ id: 1, title: "Inbox", cards: ["Add a todo..."] }]);
  const [newListTitle, setNewListTitle] = useState("");
  const [showAddList, setShowAddList] = useState(false);
  const [newCards, setNewCards] = useState({});
  const navigate = useNavigate();

  const handleAddList = () => {
    if (!newListTitle.trim()) return;
    setLists([...lists, { id: Date.now(), title: newListTitle, cards: [] }]);
    setNewListTitle("");
    setShowAddList(false);
  };

  const handleAddCard = (listId) => {
    const text = newCards[listId];
    if (!text?.trim()) return;
    setLists(lists.map(l => l.id === listId ? { ...l, cards: [...l.cards, text] } : l));
    setNewCards({ ...newCards, [listId]: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">

      {/* ─── HERO SECTION (Latar Ungu) ─── */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white rounded-b-[2rem] md:rounded-b-[4rem] shadow-xl pb-16 relative">
        
        {/* Dekorasi Latar (Opsional) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-b-[4rem]">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-48 -left-24 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>

        {/* NAVBAR */}
        <nav className="relative z-10 flex justify-between items-center px-6 md:px-12 py-5 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <h1 className="text-2xl font-extrabold tracking-tight">Elist</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => navigate("/login")} className="px-4 py-2 text-sm font-medium bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all">
              Log In
            </button>
            <button onClick={() => navigate("/register")} className="px-5 py-2 text-sm font-bold bg-white text-purple-700 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              Sign Up
            </button>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 grid lg:grid-cols-2 px-6 md:px-12 pt-12 md:pt-20 pb-10 max-w-7xl mx-auto gap-12 items-center">
          
          {/* KIRI: Teks & CTA */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Rekam, atur, dan <br className="hidden lg:block"/>
              selesaikan <span className="text-yellow-300">semua tugas</span>
            </h1>
            <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
              Ucapkan selamat tinggal pada kerumitan—saatnya bekerja lebih cerdas dan cepat dengan Elist.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
              <input 
                type="email" 
                placeholder="Masukkan email Anda" 
                className="px-5 py-3.5 rounded-xl w-full sm:flex-1 bg-white/10 border border-white/30 text-white placeholder-purple-200 outline-none focus:bg-white/20 focus:border-white transition-all backdrop-blur-sm" 
              />
              <button onClick={() => navigate("/register")} className="px-6 py-3.5 bg-yellow-400 text-purple-900 font-bold rounded-xl shadow-lg hover:bg-yellow-300 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                Daftar Gratis <ArrowRightIcon />
              </button>
            </div>
          </div>

          {/* KANAN: Interactive Mini Board (Glassmorphism) */}
          <div className="flex flex-row items-start gap-4 overflow-x-auto pb-4 pt-4 hide-scrollbar">
            {lists.map(list => (
              <div key={list.id} className="bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl shadow-2xl w-64 flex-shrink-0 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/40"></div>
                <h2 className="mb-4 font-bold text-lg">{list.title}</h2>

                <div className="space-y-2.5 mb-3">
                  {list.cards.map((card, i) => (
                    <div key={i} className="bg-white text-gray-800 p-3 rounded-xl text-sm shadow-sm border border-gray-100 font-medium hover:scale-[1.02] transition-transform cursor-default">
                      {card}
                    </div>
                  ))}
                </div>

                {/* Input Add Card */}
                <div className="mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  <input
                    type="text"
                    placeholder="Tulis kartu baru..."
                    value={newCards[list.id] || ""}
                    onChange={e => setNewCards({ ...newCards, [list.id]: e.target.value })}
                    onKeyDown={e => e.key === "Enter" && handleAddCard(list.id)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-black/10 border border-transparent text-white placeholder-white/60 outline-none focus:bg-black/20 focus:border-white/30 mb-2 transition-all"
                  />
                  <button onClick={() => handleAddCard(list.id)} className="text-sm font-semibold text-yellow-300 hover:text-yellow-200 flex items-center gap-1">
                    + Add Card
                  </button>
                </div>
              </div>
            ))}

            {/* Add List Button */}
            {showAddList ? (
              <div className="bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl shadow-xl w-64 flex-shrink-0">
                <input
                  type="text"
                  placeholder="Nama list..."
                  value={newListTitle}
                  onChange={e => setNewListTitle(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAddList()}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-black/10 text-white placeholder-white/60 outline-none mb-3"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button onClick={handleAddList} className="px-4 py-1.5 bg-yellow-400 text-purple-900 font-bold text-sm rounded-lg hover:bg-yellow-300 transition-colors">Add</button>
                  <button onClick={() => setShowAddList(false)} className="px-3 py-1.5 text-sm text-white/70 hover:text-white transition-colors">Cancel</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddList(true)}
                className="px-5 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl shadow-lg flex-shrink-0 self-start font-medium transition-all flex items-center gap-2"
              >
                + Add List
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── FITUR UTAMA SECTION (Latar Putih/Abu) ─── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-24">
        
        {/* FITUR 1: Board Kanban */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3 text-center lg:text-left">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto lg:mx-0 shadow-sm"><BoardIcon /></div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Manajemen Board Visual</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Kelola semua task dalam satu tampilan interaktif. Geser, klik, dan pantau progress pekerjaan tim Anda dengan sangat mudah.
            </p>
          </div>
          
          <div className="lg:w-2/3 w-full bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {["To Do", "In Progress", "Done"].map((col, index) => (
                <div key={col} className="bg-gray-50 border border-gray-100 p-4 rounded-2xl min-w-[200px] sm:min-w-[240px] flex-shrink-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-red-400' : index === 1 ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                    <p className="font-bold text-gray-800">{col}</p>
                  </div>
                  
                  <div 
                    onClick={() => setSelected(col)} 
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-purple-300 hover:shadow-md active:scale-95 transition-all group"
                  >
                    <p className="font-medium text-gray-700 group-hover:text-purple-700 transition-colors">
                      {col === "To Do" && "Design UI Dashboard"}
                      {col === "In Progress" && "Integrasi Backend"}
                      {col === "Done" && "Riset Kompetitor"}
                    </p>
                  </div>
                  <button className="mt-4 text-sm font-semibold text-gray-400 hover:text-purple-600 transition-colors flex items-center gap-1">+ Tambah Kartu</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FITUR 2 & 3: Member & Inbox (Grid 2 Kolom) */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Member Card */}
          <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-6"><UsersIcon /></div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">Kolaborasi Tim</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Undang anggota tim ke dalam workspace Anda. Bagikan tugas dan capai target bersama-sama.
            </p>
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">A</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">B</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">C</div>
              </div>
              <button className="ml-2 w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-purple-500 hover:text-purple-500 transition-colors">
                +
              </button>
            </div>
          </div>

          {/* Inbox Card */}
          <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center mb-6"><InboxIcon /></div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">Inbox Universal</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Simpan semua ide dan tugas mentah di satu tempat sebelum diorganisir ke dalam papan proyek.
            </p>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col gap-3">
              <div className="bg-white p-3 rounded-xl text-sm text-gray-600 shadow-sm border border-gray-50 flex items-center gap-2">
                <div className="w-4 h-4 rounded border border-gray-300"></div> Catat ide fitur baru...
              </div>
              <button className="text-sm font-semibold text-purple-600 hover:text-purple-800 text-left px-2 transition-colors">
                + Tambah Task Cepat
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* POPUP NOTIFIKASI KECIL SAAT KARTU DIKLIK */}
      {selected && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl font-medium animate-bounce z-50 flex items-center gap-3">
          <span>Memilih: <strong className="text-yellow-300">{selected}</strong></span>
          <button onClick={() => setSelected("")} className="text-gray-400 hover:text-white bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-xs">✕</button>
        </div>
      )}

      {/* CSS Tambahan untuk menyembunyikan scrollbar tapi tetap bisa di-scroll */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}