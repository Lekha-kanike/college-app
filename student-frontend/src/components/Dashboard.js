import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard({ students=[], fees=[], attendance=[], marks=[] }){
  const totalStudents = students.length;
  const totalFee = fees.reduce((s,f)=> s + (Number(f.totalFee)||Number(f.total)||0), 0);
  const paidFee = fees.reduce((s,f)=> s + (Number(f.paidAmount)||Number(f.paid)||0), 0);
  const pendingFee = totalFee - paidFee;
  const avgAtt = attendance.length? Math.round(attendance.reduce((s,a)=> s + (Number(a.percentage)||0), 0) / attendance.length) : 0;

  const sortedMarks = [...marks].sort((a,b)=>(b.overallScore||b.total||0)-(a.overallScore||a.total||0));
  const getStudent = (id) => students.find(s=>s.id===id);

  // PIE CHART DATA
  const deptData = ["CSE","ECE","EEE","MECH"].map(dept=>({
    name: dept,
    value: students.filter(s=> (s.department||s.course)===dept).length
  })).filter(d=>d.value>0);

  const feeData = [
    { name: "Paid", value: paidFee },
    { name: "Pending", value: pendingFee }
  ];

  // BAR CHART DATA - Top 5 students marks
  const barData = sortedMarks.slice(0,5).map(m=>({
    name: getStudent(m.studentId)?.name?.substring(0,6) || "Std",
    score: m.overallScore||m.total||0
  }));

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];
  const cardStyle = { background:"white", padding:"18px", borderRadius:"12px", boxShadow:"0 2px 8px rgba(0,0,0,0.1)", flex:1, minWidth:"280px" };

  return (
    <div style={{padding:"20px", background:"#f8fafc", minHeight:"100vh"}}>
      <h2>📊 Dashboard - Colorful Analytics</h2>

      {/* TOP CARDS */}
      <div style={{display:"flex", gap:"15px", flexWrap:"wrap", marginTop:"15px"}}>
        <div style={{...cardStyle, minWidth:"180px"}}><small>Total Students</small><h1 style={{color:"#2563eb"}}>{totalStudents}</h1></div>
        <div style={{...cardStyle, minWidth:"180px"}}><small>Fees Paid</small><h1 style={{color:"#16a34a"}}>₹{paidFee.toLocaleString()}</h1><small style={{color:"#ef4444"}}>Pending ₹{pendingFee.toLocaleString()}</small></div>
        <div style={{...cardStyle, minWidth:"180px"}}><small>Avg Attendance</small><h1 style={{color: avgAtt<75?"#ef4444":"#16a34a"}}>{avgAtt}%</h1></div>
        <div style={{...cardStyle, minWidth:"180px"}}><small>Topper</small><h1 style={{color:"#eab308"}}>{getStudent(sortedMarks[0]?.studentId)?.name || "N/A"}</h1><small>{sortedMarks[0]?.overallScore||0} Marks</small></div>
      </div>

      {/* CHARTS ROW */}
      <div style={{display:"flex", gap:"15px", marginTop:"20px", flexWrap:"wrap"}}>

        {/* PIE - DEPT */}
        <div style={cardStyle}>
          <h3 style={{textAlign:"center"}}>Department Wise</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={deptData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {deptData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* PIE - FEES */}
        <div style={cardStyle}>
          <h3 style={{textAlign:"center"}}>Fees Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={feeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR - TOPPERS */}
        <div style={cardStyle}>
          <h3 style={{textAlign:"center"}}>Top 5 Scorers</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LOW ATTENDANCE + TOP 3 - Same old */}
      <div style={{display:"flex", gap:"15px", marginTop:"20px", flexWrap:"wrap"}}>
        <div style={{...cardStyle, minWidth:"250px"}}>
          <h3>🏆 Top 3 Rankers</h3>
          {sortedMarks.slice(0,3).map((m,i)=>(
            <div key={m.id} style={{display:"flex", justifyContent:"space-between", padding:"8px", background: i===0?"#fef3c7":"white", borderRadius:"6px", marginBottom:"4px"}}>
              <span>{i===0?"🥇":i===1?"🥈":"🥉"} {getStudent(m.studentId)?.name}</span>
              <b>{m.overallScore||m.total}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}