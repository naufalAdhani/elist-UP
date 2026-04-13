import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

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
    <div className="min-h-screen bg-gradient-to-b from-[#cbb4f7] to-[#7c5cff] text-black">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-4">
        <div className="flex items-center gap-1">
          <img src={logo} alt="Logo" className="w-20 h-20" />
          <h1 className="text-xl font-bold -ml-2">Elist</h1>
        </div>
        <div className="flex gap-2 md:gap-3">
          <button onClick={() => navigate("/login")} className="px-4 py-2 bg-white/60 rounded-md hover:bg-white transition">Log In</button>
          <button onClick={() => navigate("/register")} className="px-4 py-2 bg-white rounded-md font-medium hover:scale-105 transition">Sign Up</button>
        </div>
      </nav>

      {/* HERO */}
      <div className="grid md:grid-cols-2 px-6 md:px-10 py-16 gap-10">

        {/* LEFT */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Rekam, atur, dan <br />
            selesaikan semua tugas Anda <br />
            dengan mudah.
          </h1>
          <p className="text-gray-700 mb-6">Ucapkan selamat tinggal pada kerumitan—saatnya bekerja lebih cerdas.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" placeholder="Email" className="px-4 py-2 rounded-md w-full sm:w-64 bg-white/70 outline-none" />
            <button onClick={() => navigate("/register")} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Register</button>
          </div>
        </div>

        {/* RIGHT — interactive mini board */}
        <div className="flex flex-row items-start gap-4 overflow-x-auto pb-2">
          {lists.map(list => (
            <div key={list.id} className="bg-white/30 backdrop-blur-md p-4 rounded-2xl shadow-lg w-56 flex-shrink-0">
              <h2 className="mb-3 font-medium">{list.title}</h2>

              {list.cards.map((card, i) => (
                <div key={i} className="bg-white p-3 rounded-md mb-2 text-sm">{card}</div>
              ))}

              {/* Input add card */}
              <input
                type="text"
                placeholder="Add a card..."
                value={newCards[list.id] || ""}
                onChange={e => setNewCards({ ...newCards, [list.id]: e.target.value })}
                onKeyDown={e => e.key === "Enter" && handleAddCard(list.id)}
                className="w-full px-2 py-1 text-sm rounded-md bg-white/60 outline-none mb-2"
              />
              <button onClick={() => handleAddCard(list.id)} className="text-sm text-indigo-600">
                + Add Card
              </button>
            </div>
          ))}

          {/* Add List */}
          {showAddList ? (
            <div className="bg-white/30 backdrop-blur-md p-4 rounded-2xl shadow-lg w-56 flex-shrink-0">
              <input
                type="text"
                placeholder="List title..."
                value={newListTitle}
                onChange={e => setNewListTitle(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAddList()}
                className="w-full px-2 py-1 text-sm rounded-md bg-white/60 outline-none mb-2"
                autoFocus
              />
              <div className="flex gap-2">
                <button onClick={handleAddList} className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md">Add</button>
                <button onClick={() => setShowAddList(false)} className="text-sm text-gray-600">Cancel</button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddList(true)}
              className="px-5 py-3 bg-white/40 rounded-xl shadow flex-shrink-0 self-start"
            >
              + Add List
            </button>
          )}
        </div>

      </div>

      {/* BOARD */}
      <div className="px-6 md:px-10 pb-20">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Board</h2>
          <p className="text-gray-700 text-sm md:text-base">Kelola semua task dalam satu tampilan visual. Geser, klik, dan pantau progress dengan mudah.</p>
        </div>
        <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-lg">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2">
            {["Todo", "In Progress", "Done"].map((col) => (
              <div key={col} className="bg-gray-100 p-4 rounded-xl min-w-[160px] sm:min-w-[220px] flex-shrink-0 snap-start hover:scale-[1.02] transition">
                <p className="font-semibold mb-3 text-sm md:text-base">{col}</p>
                <div onClick={() => setSelected(col)} className="bg-white p-3 rounded-lg shadow text-xs md:text-sm cursor-pointer hover:bg-indigo-100 active:scale-95 transition">
                  {col === "Todo" && "Design UI"}
                  {col === "In Progress" && "Build Feature"}
                  {col === "Done" && "Planning"}
                </div>
                <button className="mt-3 text-xs text-indigo-600 hover:underline">+ Add Card</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION BAWAH */}
      <div className="px-6 md:px-10 py-16 space-y-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Member</h2>
            <p className="text-gray-700">Tambahkan anggota tim dan kolaborasi lebih mudah.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow flex gap-3">
            <div className="w-10 h-10 bg-indigo-400 rounded-full"></div>
            <div className="w-10 h-10 bg-pink-400 rounded-full"></div>
            <div className="w-10 h-10 bg-green-400 rounded-full"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Inbox</h2>
            <p className="text-gray-700">Semua task masuk dalam satu tempat agar tidak terlewat.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="bg-gray-100 p-3 rounded mb-2 text-sm">Add task...</div>
            <button className="text-indigo-600 text-sm">+ Add Task</button>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded-lg">
          Klik: {selected}
        </div>
      )}

    </div>
  );
}