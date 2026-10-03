import { useState, useEffect } from "react";
import axios from "axios";
import Students from "./components/Students";
import Fees from "./components/Fees";
import Attendance from "./components/Attendance";
import Marks from "./components/Marks";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn")==="true");
  const [tab, setTab] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);

  const API = "http://localhost:8082";

  const load = async () => {
    try {
      const s = await axios.get(`${API}/students`);
      const f = await axios.get(`${API}/fees`);
      const a = await axios.get(`${API}/attendance`);
      const m = await axios.get(`${API}/marks`);

      setStudents(s.data);
      setFees(f.data);
      setAttendance(a.data);
      setMarks(m.data);
    } catch (e) {
      console.log("Load Error:", e);
    }
  };

  useEffect(() => {
    if(isLoggedIn){
      load();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setTab("dashboard");
  };

  const tabStyle = (isActive) => ({
    padding:"8px 18px",
    background: isActive? "#22c55e" : "white",
    color: isActive? "white" : "black",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer",
    fontWeight: isActive? "bold" : "normal"
  });

 
  if(!isLoggedIn){
    return <Login onLogin={()=>setIsLoggedIn(true)} />
  }

  return (
    <div>
      <div style={{background:"#1e293b", padding:"12px", display:"flex", gap:"10px", alignItems:"center", flexWrap:"wrap"}}>
        <span style={{color:"white", fontWeight:"bold", marginRight:"auto"}}>🎓 College ERP - {localStorage.getItem("username")}</span>

        <button onClick={()=>setTab("dashboard")} style={tabStyle(tab==="dashboard")}>Dashboard</button>
        <button onClick={()=>setTab("students")} style={tabStyle(tab==="students")}>Students ({students.length})</button>
        <button onClick={()=>setTab("fees")} style={tabStyle(tab==="fees")}>Fees</button>
        <button onClick={()=>setTab("attendance")} style={tabStyle(tab==="attendance")}>Attendance</button>
        <button onClick={()=>setTab("marks")} style={tabStyle(tab==="marks")}>Marks - Rank</button>

        <button onClick={handleLogout} style={{background:"#ef4444", color:"white", border:"none", padding:"8px 14px", borderRadius:"6px", cursor:"pointer", marginLeft:"10px", fontWeight:"bold"}}>Logout</button>
      </div>

      <div>
        {tab==="dashboard" && <Dashboard students={students} fees={fees} attendance={attendance} marks={marks} />}
        {tab==="students" && <Students students={students} load={load} />}
        {tab==="fees" && <Fees fees={fees} students={students} load={load} />}
        {tab==="attendance" && <Attendance attendance={attendance} students={students} load={load} />}
        {tab==="marks" && <Marks marks={marks} students={students} load={load} />}
      </div>
    </div>
  );
}

export default App;