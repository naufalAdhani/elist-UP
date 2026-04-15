import React, { useState } from "react";
import Layout from "../components/Layout";

// Ikon
function SearchIcon({ size = 15 }) { return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2={16.65} y2={16.65} /></svg>; }
function XIcon({ size = 18 }) { return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} /></svg>; }

export default function Members() {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Data dummy member
  const [members, setMembers] = useState([
    { id: 1, name: "Username1", handle: "@username1", email: "username1@mail.com" },
    { id: 2, name: "Username2", handle: "@username2", email: "username2@mail.com" },
    { id: 3, name: "Username3", handle: "@username3", email: "username3@mail.com" },
  ]);

  // Fungsi Search
  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <style>{`
        .inv-input::placeholder{color:#ccc!important}
      `}</style>

      <div className="max-w-3xl">
        {/* Header Members */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Members Management</h2>
          <button
            onClick={() => setShowInviteDialog(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            + Invite Member
          </button>
        </div>

        {/* Container List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          {/* Search Bar */}
          <div className="relative mb-5 max-w-sm">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <SearchIcon size={14} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members..."
              className="w-full pl-9 pr-3 py-2 rounded-full border border-gray-200 text-sm outline-none text-gray-700 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          {/* Members List */}
          <div className="space-y-2">
            {filteredMembers.map((member) => (
              <div key={member.id} className="group flex gap-3 items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-700 font-bold uppercase">
                    {member.name.substring(0, 2)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">{member.name}</span>
                    <span className="text-xs text-gray-500">{member.handle}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-indigo-500 font-medium">{member.email}</span>
                  <button 
                    onClick={() => setMembers(members.filter(m => m.id !== member.id))}
                    className="text-red-500 text-xs font-medium hover:underline opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {filteredMembers.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">
                Tidak ada member yang ditemukan.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* INVITE DIALOG (Sesuai Desain Figma) */}
      {showInviteDialog && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setShowInviteDialog(false)}
        >
          <div
            className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 w-full">
              <h2 className="text-base font-semibold text-gray-900">Invite for workspace</h2>
              <button onClick={() => setShowInviteDialog(false)} className="bg-transparent border-none cursor-pointer p-1 text-gray-500 hover:text-gray-800 transition-colors">
                <XIcon size={18} />
              </button>
            </div>

            <div className="relative mb-5">
              <label className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs flex gap-1">
                Email <span className="opacity-0"> address or name</span>
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                placeholder="address or name"
                className="w-full pl-14 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:border-indigo-500 inv-input"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowInviteDialog(false)}
                className="bg-transparent border-none cursor-pointer text-sm font-medium text-gray-500 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!emailInput) return;
                  alert(`Invite sent to ${emailInput}`);
                  setEmailInput('');
                  setShowInviteDialog(false);
                }}
                className="bg-indigo-600 text-white border-none rounded-lg px-4 py-2 cursor-pointer text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Send invite
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}