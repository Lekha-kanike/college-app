import { useState } from "react";
import axios from "axios";

export default function Attendance({ attendance, students, load }) {
  const API = "http://localhost:8082";
  const [search, setSearch] = useState("");

  const getStudent = (id) => students.find(s => s.id === id);

  const markPresent = async (a) => {
    const newAttended = a.attended + 1;
    if (newAttended > a.totalClasses) {
      alert("Attended classes cannot exceed total classes!");
      return;
    }
    const newPercentage = a.totalClasses === 0 ? 0 : Math.round((newAttended / a.totalClasses) * 100);
    
    await axios.put(`${API}/attendance/${a.id}`, {
      ...a,
      attended: newAttended,
      percentage: newPercentage
    });
    load();
  };

  const editAttendance = async (a) => {
    const s = getStudent(a.studentId);
    const total = prompt(`Enter Total Classes for ${s?.name}?`, a.totalClasses);
    if (total === null) return;
    const attended = prompt(`Enter Attended Classes for ${s?.name}?`, a.attended);
    if (attended === null) return;

    const t = Number(total);
    const att = Number(attended);
    if (att > t) { alert("Attended classes cannot exceed total classes!"); return; }
    const perc = t === 0 ? 0 : Math.round((att / t) * 100);

    await axios.put(`${API}/attendance/${a.id}`, {
      ...a,
      totalClasses: t,
      attended: att,
      percentage: perc
    });
    load();
  };

  const filtered = attendance.filter(a => {
    const s = getStudent(a.studentId);
    if (!s) return false;
    return s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div style={{ padding: "20px" }}>
      <input placeholder="🔍 Search Name / Roll" value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "15px" }} />

      <h3>Attendance Management ({filtered.length})</h3>
      <table border="1" cellPadding="10" width="100%" style={{ borderCollapse: "collapse", background: "white", marginTop: "10px" }}>
        <thead style={{ background: "#0f172a", color: "white" }}>
          <tr><th>Roll</th><th>Name</th><th>Dept</th><th>Total</th><th>Attended</th><th>Percentage</th><th>Action</th></tr>
        </thead>
        <tbody>
          {filtered.map(a => {
            const s = getStudent(a.studentId);
            return (
              <tr key={a.id}>
                <td>{s?.rollNo}</td>
                <td><b>{s?.name}</b></td>
                <td>{s?.department}</td>
                <td>{a.totalClasses}</td>
                <td style={{ fontWeight: "bold", color: "#16a34a" }}>{a.attended}</td>
                <td style={{ fontWeight: "bold", color: a.percentage < 75 ? "#ef4444" : "#16a34a" }}>{a.percentage}%</td>
                <td style={{ display: "flex", gap: "6px" }}>
                  {/* Absent button removed */}
                  <button onClick={() => markPresent(a)} style={{ background: "#22c55e", color: "white", border: "none", padding: "6px 12px", borderRadius: "5px", cursor: "pointer" }}>Present</button>
                  <button onClick={() => editAttendance(a)} style={{ background: "#f97316", color: "white", border: "none", padding: "6px 12px", borderRadius: "5px", cursor: "pointer" }}>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}