import { useState, useEffect } from "react";
import axios from "axios";

export default function Students({ students, load }) {
  const API = "http://localhost:8082";
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dept, setDept] = useState("CSE");
  const [year, setYear] = useState("1");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const clearForm = () => {
    setName(""); setRoll(""); setEmail(""); setPhone("");
    setDept("CSE"); setYear("1"); setEditId(null);
  };

  const saveStudent = async () => {
    if (!name || !roll || !email) {
      alert("Name, Roll No, Email compulsory mawa!");
      return;
    }
    const payload = {
      name,
      rollNo: roll,
      email,
      phone,
      department: dept,
      course: dept,
      year,
    };

    try {
      if (editId) {
        await axios.put(`${API}/students/${editId}`, payload);
        alert("Updated Successfully ✅");
      } else {
        const res = await axios.post(`${API}/students`, payload);
        const sid = res.data.id;

        await axios.post(`${API}/marks`, { studentId: sid, overallScore: 0, total: 0 });
        await axios.post(`${API}/fees`, { studentId: sid, totalFee: 60000, paidAmount: 0, balance: 60000 });
        await axios.post(`${API}/attendance`, { studentId: sid, totalClasses: 0, attended: 0, percentage: 0 });

        alert(`Student Added ✅ `);
      }
      clearForm();
      load();
    } catch (e) {
      console.error(e);
      alert("Error: " + (e.response?.data?.message || e.response?.data || e.message));
    }
  };

  const edit = (s) => {
    setEditId(s.id);
    setName(s.name); setRoll(s.rollNo); setEmail(s.email);
    setPhone(s.phone || ""); setDept(s.department || "CSE"); setYear(s.year || "1");
  };

  const del = async (id) => {
    if (!window.confirm("Do You Want To Delete?")) return;
    await axios.delete(`${API}/students/${id}`);
    load();
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ background: "white", padding: "15px", borderRadius: "10px", marginBottom: "20px", boxShadow: "0 2px 8px #e2e8f0" }}>
        <h3>{editId ? "Edit Student" : "Add New Student"}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          <input placeholder="Roll No (e.g. 002)" value={roll} onChange={e => setRoll(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
          <select value={dept} onChange={e => setDept(e.target.value)} style={{ padding: "10px", borderRadius: "6px" }}>
            <option>CSE</option><option>MECH</option><option>ECE</option><option>CIVIL</option>
          </select>
          <select value={year} onChange={e => setYear(e.target.value)} style={{ padding: "10px", borderRadius: "6px" }}>
            <option>1</option><option>2</option><option>3</option><option>4</option>
          </select>
        </div>
        <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
          <button onClick={saveStudent} style={{ background: "#16a34a", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>{editId ? "Update" : "Add Student"}</button>
          <button onClick={clearForm} style={{ background: "#64748b", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px" }}>Clear</button>
        </div>
      </div>

      <input placeholder="🔍 Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "15px" }} />
      <h3>Students List ({filtered.length})</h3>
      <table border="1" cellPadding="10" width="100%" style={{ borderCollapse: "collapse", background: "white" }}>
        <thead style={{ background: "#0f172a", color: "white" }}><tr><th>Roll</th><th>Name</th><th>Dept</th><th>Email</th><th>Action</th></tr></thead>
        <tbody>
          {filtered.map(s => (
            <tr key={s.id}><td>{s.rollNo}</td><td>{s.name}</td><td>{s.department}</td><td>{s.email}</td>
              <td><button onClick={() => edit(s)} style={{ marginRight: "5px", background: "#3b82f6", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px" }}>Edit</button>
                <button onClick={() => del(s.id)} style={{ background: "#ef4444", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px" }}>Del</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}