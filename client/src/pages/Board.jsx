import React, { useState, useRef } from "react";
import logo from "../assets/logo.png";

function ChevronLeft({open}){return <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{transition:'transform 0.3s',transform:open?'rotate(0deg)':'rotate(180deg)'}}><polyline points="15 18 9 12 15 6"/></svg>;}
function TrashIcon(){return <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>;}
function PlusIcon(){return <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1={12} y1={5} x2={12} y2={19}/><line x1={5} y1={12} x2={19} y2={12}/></svg>;}
function XIcon(){return <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1={18} y1={6} x2={6} y2={18}/><line x1={6} y1={6} x2={18} y2={18}/></svg>;}
function PencilIcon(){return <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;}
function SearchIcon(){return <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={11} cy={11} r={8}/><line x1={21} y1={21} x2={16.65} y2={16.65}/></svg>;}
function GridIcon({active}){return <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={active?'#534AB7':'#6d28d9'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={3} width={7} height={7}/><rect x={14} y={3} width={7} height={7}/><rect x={3} y={14} width={7} height={7}/><rect x={14} y={14} width={7} height={7}/></svg>;}
function UsersIcon({active}){return <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={active?'#534AB7':'#6d28d9'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx={9} cy={7} r={4}/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;}
function GripIcon(){return <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={9} cy={5} r={1} fill="#a78bfa"/><circle cx={15} cy={5} r={1} fill="#a78bfa"/><circle cx={9} cy={12} r={1} fill="#a78bfa"/><circle cx={15} cy={12} r={1} fill="#a78bfa"/><circle cx={9} cy={19} r={1} fill="#a78bfa"/><circle cx={15} cy={19} r={1} fill="#a78bfa"/></svg>;}

export default function App() {
  const [lists, setLists] = useState([
    {id:1, title:'To Do', cards:[{id:101,text:'Belajar React'},{id:102,text:'Setup project'}]},
    {id:2, title:'In Progress', cards:[{id:201,text:'Bikin UI'}]},
    {id:3, title:'Done', cards:[]}
  ]);
  const [search,setSearch]=useState('');
  const [newList,setNewList]=useState('');
  const [showListInput,setShowListInput]=useState(false);
  const [errorList,setErrorList]=useState(false);
  const [newCardText,setNewCardText]=useState({});
  const [activeCardInput,setActiveCardInput]=useState(null);
  const [activeMenu,setActiveMenu]=useState('boards');
  const [showInvite,setShowInvite]=useState(false);
  const [email,setEmail]=useState('');
  const [showProfile,setShowProfile]=useState(false);
  const [sidebarOpen,setSidebarOpen]=useState(true);
  const [boardName,setBoardName]=useState('Project 1');
  const [editingBoard,setEditingBoard]=useState(false);
  const [editingCard,setEditingCard]=useState(null);
  const [editingCardText,setEditingCardText]=useState('');
  const [editingListId,setEditingListId]=useState(null);
  const [editingListTitle,setEditingListTitle]=useState('');

  const cardDrag=useRef({});
  const [draggingCard,setDraggingCard]=useState(null);
  const [dragOverCard,setDragOverCard]=useState(null);

  const listDrag=useRef({});
  const [draggingList,setDraggingList]=useState(null);
  const [dragOverList,setDragOverList]=useState(null);

  const addList=()=>{
    if(!newList.trim()){setErrorList(true);setTimeout(()=>setErrorList(false),500);return;}
    setLists([...lists,{id:Date.now(),title:newList,cards:[]}]);
    setNewList('');setShowListInput(false);
  };
  const deleteList=id=>setLists(lists.filter(l=>l.id!==id));
  const addCard=listId=>{
    const text=(newCardText[listId]||'').trim();
    if(!text)return;
    setLists(lists.map(l=>l.id===listId?{...l,cards:[...l.cards,{id:Date.now(),text}]}:l));
    setNewCardText({...newCardText,[listId]:''});
  };
  const saveCard=(listId,cardId)=>{
    const t=editingCardText.trim();
    if(t) setLists(lists.map(l=>l.id===listId?{...l,cards:l.cards.map(c=>c.id===cardId?{...c,text:t}:c)}:l));
    else setLists(lists.map(l=>l.id===listId?{...l,cards:l.cards.filter(c=>c.id!==cardId)}:l));
    setEditingCard(null);
  };
  const deleteCard=(listId,cardId)=>{
    setLists(lists.map(l=>l.id===listId?{...l,cards:l.cards.filter(c=>c.id!==cardId)}:l));
    setEditingCard(null);
  };
  const saveListTitle=listId=>{
    const t=editingListTitle.trim();
    if(t) setLists(lists.map(l=>l.id===listId?{...l,title:t}:l));
    setEditingListId(null);
  };

  // CARD DRAG
  const onCardDragStart=(e,listId,cardId)=>{
    e.stopPropagation();
    cardDrag.current={listId,cardId};
    setDraggingCard({listId,cardId});
    e.dataTransfer.effectAllowed='move';
  };
  const onCardDragEnd=()=>{setDraggingCard(null);setDragOverCard(null);cardDrag.current={};};
  const onCardDragOver=(e,listId,index)=>{e.preventDefault();e.stopPropagation();if(!cardDrag.current.cardId)return;setDragOverCard({listId,index});};
  const onCardDrop=(e,toListId,toIndex)=>{
    e.preventDefault();e.stopPropagation();
    const{listId:fromListId,cardId}=cardDrag.current;
    if(!cardId)return;
    setLists(prev=>{
      const fromList=prev.find(l=>l.id===fromListId);
      const card=fromList.cards.find(c=>c.id===cardId);
      return prev.map(l=>{
        if(l.id===fromListId&&l.id===toListId){
          const cards=l.cards.filter(c=>c.id!==cardId);
          const insertAt=toIndex>fromList.cards.findIndex(c=>c.id===cardId)?toIndex-1:toIndex;
          cards.splice(Math.max(0,insertAt),0,card);
          return{...l,cards};
        }
        if(l.id===fromListId)return{...l,cards:l.cards.filter(c=>c.id!==cardId)};
        if(l.id===toListId){const cards=[...l.cards];cards.splice(toIndex,0,card);return{...l,cards};}
        return l;
      });
    });
    setDraggingCard(null);setDragOverCard(null);cardDrag.current={};
  };

  // LIST DRAG
  const onListDragStart=(e,listId)=>{
    listDrag.current={listId};
    setDraggingList(listId);
    e.dataTransfer.effectAllowed='move';
  };
  const onListDragEnd=()=>{setDraggingList(null);setDragOverList(null);listDrag.current={};};
  const onListDragOver=(e,listId)=>{
    e.preventDefault();
    if(!listDrag.current.listId||cardDrag.current.cardId)return;
    if(listDrag.current.listId!==listId)setDragOverList(listId);
  };
  const onListDrop=(e,toListId)=>{
    e.preventDefault();
    const{listId:fromListId}=listDrag.current;
    if(!fromListId||fromListId===toListId)return;
    setLists(prev=>{
      const from=prev.findIndex(l=>l.id===fromListId);
      const to=prev.findIndex(l=>l.id===toListId);
      const next=[...prev];
      const[moved]=next.splice(from,1);
      next.splice(to,0,moved);
      return next;
    });
    setDraggingList(null);setDragOverList(null);listDrag.current={};
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      <style>{`
        .si::placeholder{color:rgba(255,255,255,0.6)!important}
        .pi::placeholder{color:#bbb!important}
        .card-item:hover .cedit{opacity:1!important}
      `}</style>

      {/* TOPBAR */}
      <div className="flex items-center justify-between bg-purple-400 px-4 py-2.5 text-white flex-shrink-0 z-20">
  <div className="flex items-center gap-0 w-28 flex-shrink-0">
    <img src={logo} alt="Logo" className="w-15 h-15" />
    <span className="font-bold text-base -ml-2">Elist</span>
  </div>
        <div className="relative flex-1 max-w-xs mx-4">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex"><SearchIcon/></div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="si w-full pl-9 pr-3 py-2 rounded-full border border-white/30 text-sm outline-none bg-white/20 text-white"/>
        </div>
        <div className="flex items-center gap-2 relative">
          <span className="text-sm">Naufal</span>
          <div onClick={()=>setShowProfile(!showProfile)} className="w-8 h-8 bg-white text-gray-700 rounded-full flex items-center justify-center cursor-pointer text-sm font-semibold">N</div>
          {showProfile && (
            <div className="absolute top-10 right-0 w-52 bg-white text-black rounded-2xl shadow-xl p-3 z-50">
              <p className="font-bold text-sm mb-0.5 text-gray-900">Naufal</p>
              <p className="text-xs text-gray-400 mb-2">Account</p>
              <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-gray-100 text-sm text-gray-800">Switch Account</button>
              <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-gray-100 text-sm text-gray-800">Account</button>
              <hr className="my-2"/>
              <button onClick={()=>alert('Logged out')} className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-red-50 text-sm text-red-500">Log out</button>
            </div>
          )}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <div className={`bg-purple-300 p-3 flex-shrink-0 transition-all duration-300 relative flex flex-col overflow-hidden ${sidebarOpen?'w-44':'w-12'}`}>
          <button onClick={()=>setSidebarOpen(!sidebarOpen)} className="absolute -right-2.5 top-1/2 -translate-y-1/2 bg-white border-none rounded-full w-5 h-5 flex items-center justify-center cursor-pointer shadow-md z-10 p-0">
            <ChevronLeft open={sidebarOpen}/>
          </button>
          {!sidebarOpen && <div className="h-7 mb-4"/>}
          <div className="flex flex-col gap-1">
            <div onClick={()=>setActiveMenu('boards')} className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer text-sm whitespace-nowrap text-purple-900 transition-colors ${activeMenu==='boards'?'bg-white font-semibold':'hover:bg-purple-200'}`}>
              <GridIcon active={activeMenu==='boards'}/>{sidebarOpen&&'Boards'}
            </div>
            <div onClick={()=>setActiveMenu('members')} className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer text-sm whitespace-nowrap text-purple-900 transition-colors ${activeMenu==='members'?'bg-white font-semibold':'hover:bg-purple-200'}`}>
              <UsersIcon active={activeMenu==='members'}/>{sidebarOpen&&'Members'}
            </div>
          </div>
        </div>

        {/* BOARD */}
        <div className="flex-1 flex flex-col overflow-hidden bg-purple-100">
          <div className="flex justify-between items-center px-4 py-2.5 bg-purple-200 flex-shrink-0">
            {editingBoard
              ? <input autoFocus value={boardName} onChange={e=>setBoardName(e.target.value)} onBlur={()=>setEditingBoard(false)} onKeyDown={e=>{if(e.key==='Enter')setEditingBoard(false);}} className="pi font-semibold text-sm text-purple-900 border-b-2 border-purple-600 bg-transparent outline-none px-1 w-40"/>
              : <div className="flex items-center gap-1.5 cursor-pointer" onClick={()=>setEditingBoard(true)}>
                  <h2 className="m-0 font-semibold text-sm text-purple-900">{boardName}</h2>
                  <span className="text-purple-500 opacity-50"><PencilIcon/></span>
                </div>
            }
            <button onClick={()=>setShowInvite(true)} className="bg-white border-none rounded-lg px-3.5 py-1 cursor-pointer text-sm font-medium text-purple-700">Invite</button>
          </div>

          <div className="flex gap-4 p-4 overflow-x-auto flex-1 items-start" style={{WebkitOverflowScrolling:'touch'}}>
            {lists.map(list=>{
              const filtered=list.cards.filter(c=>c.text.toLowerCase().includes(search.toLowerCase()));
              if(search&&list.cards.length>0&&filtered.length===0)return null;
              const isDraggingThisList=draggingList===list.id;
              const isListDropTarget=dragOverList===list.id;
              return (
                <div key={list.id}
                  draggable
                  onDragStart={e=>onListDragStart(e,list.id)}
                  onDragEnd={onListDragEnd}
                  onDragOver={e=>onListDragOver(e,list.id)}
                  onDrop={e=>onListDrop(e,list.id)}
                  className="min-w-[220px] w-[220px] flex-shrink-0 p-3 rounded-2xl transition-all"
                  style={{
                    background:isListDropTarget?'#e9d5ff':'#f5f3ff',
                    opacity:isDraggingThisList?0.4:1,
                    border:isListDropTarget?'2px dashed #a78bfa':isDraggingThisList?'2px dashed #c4b5fd':'2px solid transparent'
                  }}
                >
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex items-center gap-1.5 flex-1">
                      <span className="cursor-grab opacity-60 flex items-center flex-shrink-0"><GripIcon/></span>
                      {editingListId===list.id
                        ? <input autoFocus value={editingListTitle} onChange={e=>setEditingListTitle(e.target.value)} onBlur={()=>saveListTitle(list.id)} onKeyDown={e=>{if(e.key==='Enter')saveListTitle(list.id);}} className="pi font-semibold text-sm text-purple-900 border-b-2 border-purple-600 bg-transparent outline-none w-28"/>
                        : <span className="font-semibold text-sm text-purple-900 cursor-pointer" onClick={()=>{setEditingListId(list.id);setEditingListTitle(list.title);}}>{list.title}</span>
                      }
                    </div>
                    <button onClick={()=>deleteList(list.id)} className="bg-transparent border-none cursor-pointer text-red-400 p-0.5 flex-shrink-0"><TrashIcon/></button>
                  </div>

                  {filtered.map((card,index)=>{
                    const isDraggingThisCard=draggingCard?.cardId===card.id;
                    const isCardOver=dragOverCard?.listId===list.id&&dragOverCard?.index===index;
                    const isEditing=editingCard?.listId===list.id&&editingCard?.cardId===card.id;
                    return (
                      <React.Fragment key={card.id}>
                        {isCardOver&&<div className="h-1 bg-purple-600 rounded my-0.5 opacity-70"/>}
                        {isEditing
                          ? <div className="mb-2">
                              <textarea autoFocus value={editingCardText} onChange={e=>setEditingCardText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();saveCard(list.id,card.id);}if(e.key==='Escape')setEditingCard(null);}} rows={2} className="pi w-full p-2 rounded-lg border-2 border-purple-600 text-xs resize-none outline-none text-gray-700"/>
                              <div className="flex gap-1.5 mt-1">
                                <button onClick={()=>saveCard(list.id,card.id)} className="bg-purple-600 text-white border-none rounded px-3 py-1 cursor-pointer text-xs">Save</button>
                                <button onClick={()=>deleteCard(list.id,card.id)} className="bg-red-100 text-red-500 border-none rounded px-2.5 py-1 cursor-pointer text-xs">Hapus</button>
                                <button onClick={()=>setEditingCard(null)} className="bg-transparent border-none cursor-pointer p-1"><XIcon/></button>
                              </div>
                            </div>
                          : <div
                              className="card-item cursor-grab active:cursor-grabbing bg-white p-2 rounded-lg text-sm mb-2 text-gray-700 flex justify-between items-start gap-1.5 transition-opacity"
                              draggable
                              onDragStart={e=>onCardDragStart(e,list.id,card.id)}
                              onDragEnd={onCardDragEnd}
                              onDragOver={e=>onCardDragOver(e,list.id,index)}
                              onDrop={e=>onCardDrop(e,list.id,index)}
                              style={{opacity:isDraggingThisCard?0.4:1,border:isDraggingThisCard?'2px dashed #a78bfa':'2px solid transparent'}}
                            >
                              <span>{card.text}</span>
                              <span className="cedit opacity-0 transition-opacity text-purple-400 flex-shrink-0 cursor-pointer mt-0.5" onClick={e=>{e.stopPropagation();setEditingCard({listId:list.id,cardId:card.id});setEditingCardText(card.text);}}>
                                <PencilIcon/>
                              </span>
                            </div>
                        }
                      </React.Fragment>
                    );
                  })}

                  {dragOverCard?.listId===list.id&&dragOverCard?.index>=filtered.length&&<div className="h-1 bg-purple-600 rounded my-0.5 opacity-70"/>}

                  {activeCardInput===list.id
                    ? <div className="mt-2">
                        <textarea autoFocus value={newCardText[list.id]||''} onChange={e=>setNewCardText({...newCardText,[list.id]:e.target.value})} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();addCard(list.id);}}} rows={2} placeholder="Tulis card..." className="pi w-full p-2 rounded-lg border border-purple-300 text-xs resize-none outline-none text-gray-700"/>
                        <div className="flex gap-1.5 mt-1">
                          <button onClick={()=>addCard(list.id)} className="bg-purple-600 text-white border-none rounded px-3 py-1 cursor-pointer text-xs">Add</button>
                          <button onClick={()=>setActiveCardInput(null)} className="bg-transparent border-none cursor-pointer p-1"><XIcon/></button>
                        </div>
                      </div>
                    : <button onClick={()=>setActiveCardInput(list.id)} className="bg-transparent border-none cursor-pointer text-xs text-purple-700 flex items-center gap-1 py-1 mt-1 w-full">
                        <PlusIcon/> Add Card
                      </button>
                  }
                </div>
              );
            })}

            {showListInput
              ? <div className={`min-w-[220px] w-[220px] flex-shrink-0 bg-purple-50 p-3 rounded-2xl ${errorList?'border-2 border-red-400':''}`}>
                  <textarea autoFocus value={newList} onChange={e=>setNewList(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addList();}}} rows={2} placeholder="List title..." className="pi w-full p-2 rounded-lg border border-purple-300 text-xs resize-none outline-none text-gray-700"/>
                  <div className="flex gap-1.5 mt-1.5">
                    <button onClick={addList} className="bg-purple-600 text-white border-none rounded px-3.5 py-1 cursor-pointer text-xs">Add List</button>
                    <button onClick={()=>setShowListInput(false)} className="bg-transparent border-none cursor-pointer p-1"><XIcon/></button>
                  </div>
                </div>
              : <button onClick={()=>setShowListInput(true)} className="min-w-[220px] w-[220px] flex-shrink-0 h-20 bg-purple-200 rounded-2xl border-none cursor-pointer text-sm font-medium text-purple-700">
                  + Add List
                </button>
            }
          </div>
        </div>
      </div>

      {/* INVITE MODAL */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={e=>{if(e.target===e.currentTarget)setShowInvite(false);}}>
          <div className="bg-white p-5 rounded-2xl w-full max-w-xs">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Invite Member</h2>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Masukkan email..." className="pi w-full p-2 rounded-lg border border-gray-200 text-sm text-gray-900 outline-none mb-3"/>
            <div className="flex justify-end gap-2">
              <button onClick={()=>setShowInvite(false)} className="bg-transparent border-none cursor-pointer text-sm text-gray-500 px-3 py-1.5">Cancel</button>
              <button onClick={()=>{if(!email)return;alert(`Invite sent to ${email}`);setEmail('');setShowInvite(false);}} className="bg-purple-600 text-white border-none rounded-lg px-4 py-1.5 cursor-pointer text-sm">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}