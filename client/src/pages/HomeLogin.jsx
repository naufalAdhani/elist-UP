import { useState } from "react";
import logo from "../assets/logo.png";

const INITIAL_BOARDS = [
  { id: 1, name: "Projek 1", color: "bg-violet-300" },
  { id: 2, name: "Projek 2", color: "bg-blue-300" },
];

const COLOR_OPTIONS = [
  { label: "Violet", value: "bg-violet-300", hex: "#c4b5fd" },
  { label: "Blue", value: "bg-blue-300", hex: "#93c5fd" },
  { label: "Green", value: "bg-emerald-300", hex: "#6ee7b7" },
  { label: "Red", value: "bg-red-300", hex: "#fca5a5" },
  { label: "Yellow", value: "bg-yellow-300", hex: "#fcd34d" },
];

export default function ElistHome() {
  const [boards, setBoards] = useState(INITIAL_BOARDS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Boards");
  const [newBoardName, setNewBoardName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);

  const handleCreateBoard = () => {
    if (!newBoardName.trim()) return;
    setBoards([
      ...boards,
      { id: Date.now(), name: newBoardName.trim(), color: selectedColor.value },
    ]);
    setNewBoardName("");
    setSelectedColor(COLOR_OPTIONS[0]);
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">

      {/* ── HEADER ── */}
      <header className="bg-violet-500 h-14 flex items-center px-4 gap-3 z-30 flex-shrink-0 relative">

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-1 w-28 flex-shrink-0">
          <img src={logo} alt="Logo" className="w-9 h-9" />
          <span className="text-white font-semibold text-base hidden sm:block -ml-1">Elist</span>
        </div>

        {/* Search - center */}
        <div className="flex-1 flex justify-center">
          <div className="bg-white/20 rounded-full h-9 w-48 sm:w-64 flex items-center px-3 gap-2 cursor-text">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <span className="text-white/70 text-sm">Search...</span>
          </div>
        </div>

        {/* User */}
        <div className="relative flex-shrink-0">
          <button
            className="flex items-center gap-2"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="text-white text-sm font-medium hidden sm:block">Naufal</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-semibold text-sm text-gray-700">
              N
            </div>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-11 bg-white rounded-xl border border-gray-100 shadow-lg w-44 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Naufal</p>
                <p className="text-xs text-gray-500 mt-0.5">naufal@email.com</p>
              </div>
              <div className="py-1">
                {["Profil saya", "Pengaturan"].map((item) => (
                  <button key={item} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    {item}
                  </button>
                ))}
                <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">

        {/* ── SIDEBAR OVERLAY (mobile) ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── SIDEBAR ── */}
        <aside className={`
          absolute md:relative z-20 top-0 left-0 h-full
          w-56 bg-violet-300 flex-shrink-0 flex flex-col p-4 gap-1
          transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}>
          

          {[
            {
              label: "Boards",
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                </svg>
              ),
            },
            {
              label: "Members",
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ),
            },
          ].map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => { setActiveMenu(label); setSidebarOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left
                ${activeMenu === label
                  ? "bg-white text-violet-900"
                  : "text-violet-800 hover:bg-white/40"
                }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main
          className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white"
          onClick={() => { setDropdownOpen(false); setSidebarOpen(false); }}
        >
          <p className="text-xs font-semibold tracking-widest text-violet-600 uppercase mb-5">
            Your Boards
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

            {boards.map((board) => (
              <div key={board.id} className="group cursor-pointer">
                <div className={`${board.color} rounded-xl h-32 sm:h-36 transition-opacity group-hover:opacity-80`} />
                <p className="mt-2 text-sm text-gray-800">{board.name}</p>
              </div>
            ))}

            {/* Create new */}
            <div
              className="group cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
            >
              <div className="bg-gray-50 rounded-xl h-32 sm:h-36 border-2 border-dashed border-gray-200 flex items-center justify-center transition-colors group-hover:bg-gray-100">
                <span className="text-sm text-gray-400">+ Create new</span>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* ── MODAL CREATE ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-base font-medium text-gray-900 mb-4">Buat board baru</p>

            <label className="text-xs text-gray-500 block mb-1">Nama board</label>
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateBoard()}
              placeholder="Contoh: Projek 3"
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 mb-4"
              autoFocus
            />

            <label className="text-xs text-gray-500 block mb-2">Warna</label>
            <div className="flex gap-2 mb-5">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setSelectedColor(c)}
                  style={{ backgroundColor: c.hex }}
                  className={`w-7 h-7 rounded-full transition-all ${
                    selectedColor.value === c.value
                      ? "ring-2 ring-violet-600 ring-offset-1"
                      : "hover:scale-110"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 h-10 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleCreateBoard}
                className="flex-1 h-10 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 disabled:opacity-40"
                disabled={!newBoardName.trim()}
              >
                Buat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}