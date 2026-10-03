import { useState } from "react";
import axios from "axios";

export default function Fees({ fees, students, load }) {
  const API = "http://localhost:8082";
  const [amounts, setAmounts] = useState({});
  const [search, setSearch] = useState("");

  const getStudent = (id) => students.find(s => s.id === id);

  const pay = async (f, full = false) => {
    const inputAmt = amounts[f.id] || 0;
    const amt = full ? (f.totalFee - f.paidAmount) : Number(inputAmt);
    if (amt <= 0) { alert("Enter amount !"); return; }
    
    const newPaid = f.paidAmount + amt;
    if (newPaid > f.totalFee) { alert("Entered amount exceeds total fee!"); return; }

    await axios.put(`${API}/fees/${f.id}`, {
      ...f,
      paidAmount: newPaid,
      balance: f.totalFee - newPaid
    });
    setAmounts({ ...amounts, [f.id]: "" });
    load();
  };

  const filtered = fees.filter(f => {
    const s = getStudent(f.studentId);
    if (!s) return false;
    return s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div style={{ padding: "20px" }}>
      <input placeholder="🔍 Search Name / Roll" value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "15px" }} />
      
      <h3>Fees Management ({filtered.length})</h3>
      <table border="1" cellPadding="10" width="100%" style={{ borderCollapse: "collapse", background: "white", marginTop: "10px" }}>
        <thead style={{ background: "#0f172a", color: "white" }}>
          <tr><th>Roll</th><th>Name</th><th>Dept</th><th>Total</th><th>Paid</th><th>Pending</th><th>Action</th></tr>
        </thead>
        <tbody>
          {filtered.map(f => {
            const s = getStudent(f.studentId);
            const pending = f.totalFee - f.paidAmount;
            return (
              <tr key={f.id}>
                <td>{s?.rollNo}</td>
                <td><b>{s?.name}</b></td>
                <td>{s?.department}</td>
                <td>₹{f.totalFee}</td>
                <td style={{ color: "#16a34a", fontWeight: "bold" }}>₹{f.paidAmount}</td>
                <td style={{ color: pending === 0 ? "#16a34a" : "#ef4444", fontWeight: "bold" }}>₹{pending}</td>
                <td style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={amounts[f.id] || ""}
                    onChange={e => setAmounts({ ...amounts, [f.id]: e.target.value })}
                    style={{ width: "80px", padding: "6px", borderRadius: "5px", border: "1px solid #cbd5e1" }}
                  />
                  <button onClick={() => pay(f, false)} style={{ background: "#22c55e", color: "white", border: "none", padding: "6px 10px", borderRadius: "5px", cursor: "pointer" }}>Pay</button>
                  <button onClick={() => pay(f, true)} disabled={pending === 0} style={{ background: pending === 0 ? "#94a3b8" : "#3b82f6", color: "white", border: "none", padding: "6px 10px", borderRadius: "5px", cursor: "pointer" }}>Full Pay</button>
                
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}