export default function Navbar({ setTab }){
  return (
    <div style={{background:"#1e293b", padding:"15px", display:"flex", gap:"10px"}}>
      <b style={{color:"white", marginRight:"20px"}}>Codegnan</b>
      <button onClick={()=>setTab("dashboard")} style={btn}>Dashboard</button>
      <button onClick={()=>setTab("students")} style={btn}>Students</button>
      <button onClick={()=>setTab("fees")} style={btn}>Fees</button>
      <button onClick={()=>setTab("attendance")} style={btn}>Attendance</button>
      <button onClick={()=>setTab("marks")} style={btn}>Marks</button>
    </div>
  )
}
const btn={background:"#334155", color:"white", border:"none", padding:"6px 12px", borderRadius:"6px", cursor:"pointer"};