import { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_URL = 'http://192.168.56.11:3000/api';

function StudentStats() {
  const [nim, setNim] = useState('');
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/stats/student/${nim}`);
      const formattedData = res.data.map(d => ({
        name: `Semester ${d.semester}`,
        RataRata: Number(d.average_score).toFixed(2)
      }));
      setData(formattedData);
      setSearched(true);
    } catch (err) {
      console.error(err);
      setData([]);
      setSearched(true);
    }
  };

  return (
    <div className="glass-panel">
      <h2>📈 Statistik Perkembangan Individu</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input 
          type="text" 
          className="input-field" 
          placeholder="Masukkan NIM Mahasiswa..." 
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          style={{ marginBottom: 0, maxWidth: '300px' }}
          required
        />
        <button type="submit" className="btn">Cari</button>
      </form>

      {searched && data.length > 0 && (
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Legend />
              <Line type="monotone" dataKey="RataRata" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      {searched && data.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Tidak ada data ditemukan untuk NIM tersebut.</p>
      )}
    </div>
  );
}

export default StudentStats;
