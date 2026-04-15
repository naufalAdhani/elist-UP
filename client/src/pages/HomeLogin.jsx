import { useState } from "react";
import { useNavigate } from "react-router-dom";
// KUNCI UTAMA: Kita panggil Layout yang sudah punya fungsi pindah halaman
import Layout from "../components/Layout"; 

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

export default function HomeLogin() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState(INITIAL_BOARDS);
  const [modalOpen, setModalOpen] = useState(false);
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
    <Layout>
      {/* SEMUA KONTEN DI DALAM SINI AKAN MUNCUL DI BAGIAN TENGAH LAYOUT */}
      <p className="text-xs font-semibold tracking-widest text-violet-600 uppercase mb-5">
        Your Boards
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        {boards.map((board) => (
          <div 
            key={board.id} 
            className="group cursor-pointer"
            onClick={() => navigate('/board')} // Jika kamu ingin klik kotak ini pergi ke halaman Board Kanban
          >
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
    </Layout>
  );
}