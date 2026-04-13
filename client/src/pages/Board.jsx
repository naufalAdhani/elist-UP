import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

// Ikon-ikon
function TrashIcon(){return <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>;}
function PlusIcon(){return <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1={12} y1={5} x2={12} y2={19}/><line x1={5} y1={12} x2={19} y2={12}/></svg>;}
function XIcon(){return <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1={18} y1={6} x2={6} y2={18}/><line x1={6} y1={6} x2={18} y2={18}/></svg>;}
function PencilIcon(){return <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;}
function GripIcon(){return <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={9} cy={5} r={1} fill="#a78bfa"/><circle cx={15} cy={5} r={1} fill="#a78bfa"/><circle cx={9} cy={12} r={1} fill="#a78bfa"/><circle cx={15} cy={12} r={1} fill="#a78bfa"/><circle cx={9} cy={19} r={1} fill="#a78bfa"/><circle cx={15} cy={19} r={1} fill="#a78bfa"/></svg>;}

export default function Board() {
  const navigate = useNavigate();
  
  const [lists, setLists] = useState([
    {id:1, title:'To Do', cards:[{id:101,text:'Belajar React'},{id:102,text:'Setup project'}]},
    {id:2, title:'In Progress', cards:[{id:201,text:'Bikin UI'}]},
    {id:3, title:'Done', cards:[]}
  ]);
  
  const [search] = useState('');
  const [newList, setNewList] = useState('');
  const [showListInput, setShowListInput] = useState(false);
  const [errorList, setErrorList] = useState(false);
  const [newCardText, setNewCardText] = useState({});
  const [activeCardInput, setActiveCardInput] = useState(null);
  const [showInvite, setShowInvite] = useState(false);
  const [email, setEmail] = useState('');
  const [boardName, setBoardName] = useState('Project 1');
  const [editingBoard, setEditingBoard] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [editingCardText, setEditingCardText] = useState('');
  const [editingListId, setEditingListId] = useState(null);
  const [editingListTitle, setEditingListTitle] = useState('');

  const cardDrag = useRef({});
  const [draggingCard, setDraggingCard] = useState(null);
  const [dragOverCard, setDragOverCard] = useState(null);

  const listDrag = useRef({});
  const [draggingList, setDraggingList] = useState(null);
  const [dragOverList, setDragOverList] = useState(null);

  const addList = () => {
    if(!newList.trim()){setErrorList(true);setTimeout(()=>setErrorList(false),500);return;}
    setLists([...lists,{id:Date.now(),title:newList,cards:[]}]);
    setNewList('');setShowListInput(false);
  };
  const deleteList = id => setLists(lists.filter(l=>l.id!==id));
  
  const addCard = listId => {
    const text = (newCardText[listId]||'').trim();
    if(!text)return;
    setLists(lists.map(l=>l.id===listId?{...l,cards:[...l.cards,{id:Date.now(),text}]}:l));
    setNewCardText({...newCardText,[listId]:''});
  };
  const saveCard = (listId,cardId) => {
    const t = editingCardText.trim();
    if(t) setLists(lists.map(l=>l.id===listId?{...l,cards:l.cards.map(c=>c.id===cardId?{...c,text:t}:c)}:l));
    else setLists(lists.map(l=>l.id===listId?{...l,cards:l.cards.filter(c=>c.id!==cardId)}:l));
    setEditingCard(null);
  };
  const deleteCard = (listId,cardId) => {
    setLists(lists.map(l=>l.id===listId?{...l,cards:l.cards.filter(c=>c.id!==cardId)}:l));
    setEditingCard(null);
  };
  const saveListTitle = listId => {
    const t = editingListTitle.trim();
    if(t) setLists(lists.map(l=>l.id===listId?{...l,title:t}:l));
    setEditingListId(null);
  };

  const onCardDragStart = (e,listId,cardId) => {
    e.stopPropagation(); cardDrag.current={listId,cardId};
    setDraggingCard({listId,cardId}); e.dataTransfer.effectAllowed='move';
  };
  const onCardDragEnd = () => {setDraggingCard(null);setDragOverCard(null);cardDrag.current={};};
  const onCardDragOver = (e,listId,index) => {e.preventDefault();e.stopPropagation();if(!cardDrag.current.cardId)return;setDragOverCard({listId,index});};
  const onCardDrop = (e,toListId,toIndex) => {
    e.preventDefault();e.stopPropagation();
    const{listId:fromListId,cardId} = cardDrag.current;
    if(!cardId)return;
    setLists(prev=>{
      const fromList = prev.find(l=>l.id===fromListId);
      const card = fromList.cards.find(c=>c.id===cardId);
      return prev.map(l=>{
        if(l.id===fromListId&&l.id===toListId){
          const cards = l.cards.filter(c=>c.id!==cardId);
          const insertAt = toIndex>fromList.cards.findIndex(c=>c.id===cardId)?toIndex-1:toIndex;
          cards.splice(Math.max(0,insertAt),0,card); return{...l,cards};
        }
        if(l.id===fromListId)return{...l,cards:l.cards.filter(c=>c.id!==cardId)};
        if(l.id===toListId){const cards=[...l.cards];cards.splice(toIndex,0,card);return{...l,cards};}
        return l;
      });
    });
    setDraggingCard(null);setDragOverCard(null);cardDrag.current={};
  };

  const onListDragStart = (e,listId) => {
    listDrag.current={listId}; setDraggingList(listId); e.dataTransfer.effectAllowed='move';
  };
  const onListDragEnd = () => {setDraggingList(null);setDragOverList(null);listDrag.current={};};
  const onListDragOver = (e,listId) => {
    e.preventDefault();
    if(!listDrag.current.listId||cardDrag.current.cardId)return;
    if(listDrag.current.listId!==listId)setDragOverList(listId);
  };
  const onListDrop = (e,toListId) => {
    e.preventDefault();
    const{listId:fromListId} = listDrag.current;
    if(!fromListId||fromListId===toListId)return;
    setLists(prev=>{
      const from = prev.findIndex(l=>l.id===fromListId);
      const to = prev.findIndex(l=>l.id===toListId);
      const next = [...prev];
      const[moved] = next.splice(from,1);
      next.splice(to,0,moved); return next;
    });
    setDraggingList(null);setDragOverList(null);listDrag.current={};
  };

  return (
    <Layout>
      <style>{`
        .pi::placeholder{color:#bbb!important}
        .card-item:hover .cedit{opacity:1!important}
      `}</style>

      {/* Header Board & Tombol Kembali */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/homelogin')} 
            className="text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-1"
          >
            ← Back
          </button>
          
          {/* Edit Nama Board */}
          {editingBoard
            ? <input autoFocus value={boardName} onChange={e=>setBoardName(e.target.value)} onBlur={()=>setEditingBoard(false)} onKeyDown={e=>{if(e.key==='Enter')setEditingBoard(false);}} className="pi font-bold text-xl text-gray-900 border-b-2 border-purple-600 bg-transparent outline-none px-1 w-48"/>
            : <div className="flex items-center gap-2 cursor-pointer group" onClick={()=>setEditingBoard(true)}>
                <h2 className="text-xl font-bold text-gray-900">{boardName}</h2>
                <span className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"><PencilIcon/></span>
              </div>
          }
        </div>
        <button onClick={()=>setShowInvite(true)} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm">
          + Invite Member
        </button>
      </div>

      {/* Area Kanban Board */}
      <div className="flex gap-4 overflow-x-auto items-start h-[calc(100vh-160px)] pb-4 px-2" style={{WebkitOverflowScrolling:'touch'}}>
        {lists.map(list=>{
          const filtered = list.cards.filter(c=>c.text.toLowerCase().includes(search.toLowerCase()));
          if(search && list.cards.length>0 && filtered.length===0) return null;
          const isDraggingThisList = draggingList===list.id;
          const isListDropTarget = dragOverList===list.id;
          
          return (
            <div key={list.id}
              draggable onDragStart={e=>onListDragStart(e,list.id)} onDragEnd={onListDragEnd} onDragOver={e=>onListDragOver(e,list.id)} onDrop={e=>onListDrop(e,list.id)}
              className="min-w-[260px] w-[260px] flex-shrink-0 bg-white shadow-sm border border-gray-200 p-3 rounded-2xl transition-all"
              style={{
                background: isListDropTarget ? '#f3e8ff' : '#ffffff',
                opacity: isDraggingThisList ? 0.4 : 1,
                border: isListDropTarget ? '2px dashed #a78bfa' : '1px solid #e5e7eb'
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="cursor-grab opacity-40 hover:opacity-100 transition-opacity"><GripIcon/></span>
                  {editingListId===list.id
                    ? <input autoFocus value={editingListTitle} onChange={e=>setEditingListTitle(e.target.value)} onBlur={()=>saveListTitle(list.id)} onKeyDown={e=>{if(e.key==='Enter')saveListTitle(list.id);}} className="pi font-semibold text-sm text-gray-900 border-b-2 border-purple-600 bg-transparent outline-none w-32"/>
                    : <span className="font-semibold text-sm text-gray-800 cursor-pointer" onClick={()=>{setEditingListId(list.id);setEditingListTitle(list.title);}}>{list.title}</span>
                  }
                </div>
                <button onClick={()=>deleteList(list.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1"><TrashIcon/></button>
              </div>

              {/* Cards List */}
              <div className="min-h-[10px]">
                {filtered.map((card,index)=>{
                  const isDraggingThisCard = draggingCard?.cardId===card.id;
                  const isCardOver = dragOverCard?.listId===list.id && dragOverCard?.index===index;
                  const isEditing = editingCard?.listId===list.id && editingCard?.cardId===card.id;
                  
                  return (
                    <React.Fragment key={card.id}>
                      {isCardOver && <div className="h-1 bg-purple-600 rounded my-1 opacity-70"/>}
                      {isEditing
                        ? <div className="mb-2">
                            <textarea autoFocus value={editingCardText} onChange={e=>setEditingCardText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();saveCard(list.id,card.id);}if(e.key==='Escape')setEditingCard(null);}} rows={2} className="w-full p-2 rounded-lg border-2 border-purple-600 text-sm resize-none outline-none text-gray-700 shadow-sm"/>
                            <div className="flex gap-2 mt-1.5">
                              <button onClick={()=>saveCard(list.id,card.id)} className="bg-purple-600 text-white rounded px-3 py-1 text-xs font-medium hover:bg-purple-700">Save</button>
                              <button onClick={()=>deleteCard(list.id,card.id)} className="bg-red-50 text-red-500 rounded px-2 py-1 text-xs font-medium hover:bg-red-100">Delete</button>
                              <button onClick={()=>setEditingCard(null)} className="text-gray-400 hover:bg-gray-100 rounded px-1.5"><XIcon/></button>
                            </div>
                          </div>
                        : <div
                            className="card-item group cursor-grab active:cursor-grabbing bg-gray-50 border border-gray-100 hover:border-gray-200 p-3 rounded-xl text-sm mb-2 text-gray-700 shadow-sm flex justify-between items-start gap-2 transition-all"
                            draggable onDragStart={e=>onCardDragStart(e,list.id,card.id)} onDragEnd={onCardDragEnd} onDragOver={e=>onCardDragOver(e,list.id,index)} onDrop={e=>onCardDrop(e,list.id,index)}
                            style={{opacity: isDraggingThisCard ? 0.4 : 1, border: isDraggingThisCard ? '2px dashed #a78bfa' : ''}}
                          >
                            <span className="break-words w-full leading-relaxed">{card.text}</span>
                            <span className="cedit opacity-0 transition-opacity text-gray-400 hover:text-purple-600 flex-shrink-0 cursor-pointer mt-0.5" onClick={e=>{e.stopPropagation();setEditingCard({listId:list.id,cardId:card.id});setEditingCardText(card.text);}}>
                              <PencilIcon/>
                            </span>
                          </div>
                      }
                    </React.Fragment>
                  );
                })}
                {dragOverCard?.listId===list.id && dragOverCard?.index>=filtered.length && <div className="h-1 bg-purple-600 rounded my-1 opacity-70"/>}
              </div>

              {/* Add Card Input */}
              {activeCardInput===list.id
                ? <div className="mt-2">
                    <textarea autoFocus value={newCardText[list.id]||''} onChange={e=>setNewCardText({...newCardText,[list.id]:e.target.value})} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();addCard(list.id);}}} rows={2} placeholder="Tulis tugas..." className="w-full p-2 rounded-lg border border-purple-300 text-sm resize-none outline-none shadow-sm"/>
                    <div className="flex gap-2 mt-1.5">
                      <button onClick={()=>addCard(list.id)} className="bg-purple-600 text-white rounded px-3 py-1.5 text-xs font-medium hover:bg-purple-700">Add</button>
                      <button onClick={()=>setActiveCardInput(null)} className="text-gray-400 hover:bg-gray-100 rounded px-2"><XIcon/></button>
                    </div>
                  </div>
                : <button onClick={()=>setActiveCardInput(list.id)} className="w-full text-left mt-1 py-2 px-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded-lg flex items-center gap-2 transition-colors">
                    <PlusIcon/> Add a card
                  </button>
              }
            </div>
          );
        })}

        {/* Add New List */}
        {showListInput
          ? <div className={`min-w-[260px] w-[260px] bg-white p-3 rounded-2xl shadow-sm border ${errorList ? 'border-red-400' : 'border-gray-200'}`}>
              <input autoFocus value={newList} onChange={e=>setNewList(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addList();}}} placeholder="Judul list..." className="w-full p-2 rounded-lg border border-purple-300 text-sm outline-none mb-2 focus:ring-1 focus:ring-purple-400"/>
              <div className="flex gap-2">
                <button onClick={addList} className="bg-purple-600 text-white rounded px-3 py-1.5 text-xs font-medium hover:bg-purple-700">Add List</button>
                <button onClick={()=>setShowListInput(false)} className="text-gray-400 hover:bg-gray-100 rounded px-2"><XIcon/></button>
              </div>
            </div>
          : <button onClick={()=>setShowListInput(true)} className="min-w-[260px] w-[260px] flex-shrink-0 h-14 bg-purple-50 hover:bg-purple-100 rounded-2xl border border-transparent hover:border-purple-200 cursor-pointer text-sm font-medium text-purple-700 flex items-center justify-center gap-2 transition-all">
              <PlusIcon/> Add another list
            </button>
        }
      </div>

      {/* INVITE MODAL */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={e=>{if(e.target===e.currentTarget)setShowInvite(false);}}>
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl">
            <h2 className="text-base font-bold text-gray-900 mb-4">Invite to workspace</h2>
            <div className="relative mb-5">
              <label className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="address or name" className="w-full pl-12 pr-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none focus:border-purple-500"/>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={()=>setShowInvite(false)} className="bg-transparent border-none cursor-pointer text-sm font-medium text-gray-500 px-4 py-2 hover:bg-gray-50 rounded-lg">Cancel</button>
              <button onClick={()=>{if(!email)return;alert(`Invite sent to ${email}`);setEmail('');setShowInvite(false);}} className="bg-purple-600 text-white border-none rounded-lg px-4 py-2 cursor-pointer text-sm font-medium hover:bg-purple-700">Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}