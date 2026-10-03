import { useState } from "react";
import axios from "axios";

export default function Marks({ marks, students, load }){
  const [search, setSearch] = useState("");
  const API = "http://localhost:8082";
  const getStudent = (id) => students.find(s=>s.id===id);

  const filtered = marks.filter(m=>{
    const s = getStudent(m.studentId);
    if(!s) return false;
    return s.name.toLowerCase().includes(search.toLowerCase());
  }).sort((a,b)=> b.overallScore - a.overallScore);

  const updateScore = async (m, newScore) => {
    await axios.put(`${API}/marks/${m.id}`, {...m, overallScore: newScore, total: newScore});
    load();
  };

  return (
    <div style={{padding:"20px"}}>
      <input placeholder="🔍 Search Student..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:"100%", padding:"12px", borderRadius:"8px", border:"1px solid #cbd5e1", marginBottom:"15px"}}/>
      <h3 style={{marginBottom:"10px"}}>🏆 Marks - Rank Wise ({filtered.length})</h3>
      <table border="1" cellPadding="10" width="100%" style={{borderCollapse:"collapse", background:"white", borderRadius:"10px", overflow:"hidden"}}>
        <thead style={{background:"#0f172a", color:"white"}}><tr><th>Rank</th><th>Roll</th><th>Name</th><th>Dept</th><th>Score</th><th>Action</th></tr></thead>
        <tbody>
          {filtered.map((m, idx)=>{
            const s = getStudent(m.studentId);
            return (
              <tr key={m.id} style={{background: idx===0?"#fef9c3": idx===1?"#e2e8f0": "white"}}>
                <td>{idx===0?"🥇 1": idx===1?"🥈 2": idx===2?"🥉 3": idx+1}</td>
                <td>{s?.rollNo}</td><td><b>{s?.name}</b></td><td>{s?.department}</td>
                <td><b style={{fontSize:"18px", color:"#16a34a"}}>{m.overallScore}</b></td>
                <td style={{display:"flex", gap:"6px"}}>
                  <button onClick={()=>updateScore(m, m.overallScore+10)} style={{background:"#22c55e", color:"white", border:"none", padding:"6px 12px", borderRadius:"6px", cursor:"pointer"}}>+10</button>
                  <button onClick={()=>updateScore(m, m.overallScore+20)} style={{background:"#3b82f6", color:"white", border:"none", padding:"6px 12px", borderRadius:"6px", cursor:"pointer"}}>+20</button>
                  <button onClick={()=>{ const v=prompt("Enter Score", m.overallScore); if(v) updateScore(m, Number(v))}} style={{background:"#f59e0b", color:"white", border:"none", padding:"6px 12px", borderRadius:"6px", cursor:"pointer"}}>Set</button>
                  <button onClick={()=>updateScore(m, 0)} style={{background:"#ef4444", color:"white", border:"none", padding:"6px 12px", borderRadius:"6px", cursor:"pointer"}}>Reset</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}