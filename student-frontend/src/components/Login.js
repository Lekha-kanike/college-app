import { useState } from "react";

export default function Login({ onLogin }){
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    // Simple hardcoded - nuvu marchukovachu
    if(user==="admin" && pass==="admin123"){
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", user);
      onLogin();
    } else {
      alert("Wrong! Username: admin / Password: admin123");
    }
  };

  return (
    <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center", background:"#0f172a"}}>
      <div style={{background:"white", padding:"30px", borderRadius:"15px", width:"350px", boxShadow:"0 10px 30px rgba(0,0,0,0.3)", textAlign:"center"}}>
        <h2 style={{marginBottom:"5px"}}>🎓 College ERP</h2>
        <p style={{color:"#64748b", marginBottom:"20px"}}>Admin Login</p>

        <input placeholder="Username" value={user} onChange={e=>setUser(e.target.value)}
          style={{width:"100%", padding:"12px", marginBottom:"12px", borderRadius:"8px", border:"1px solid #cbd5e1"}} />

        <input type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)}
          style={{width:"100%", padding:"12px", marginBottom:"20px", borderRadius:"8px", border:"1px solid #cbd5e1"}} />

        <button onClick={handleLogin} style={{width:"100%", background:"#22c55e", color:"white", padding:"12px", border:"none", borderRadius:"8px", fontWeight:"bold", fontSize:"16px", cursor:"pointer"}}>
          Login
        </button>

        <div style={{marginTop:"15px", background:"#f1f5f9", padding:"8px", borderRadius:"6px", fontSize:"12px"}}>
          Hint: admin / admin123
        </div>
      </div>
    </div>
  )
}