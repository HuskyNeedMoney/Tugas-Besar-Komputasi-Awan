import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://192.168.56.11:3000/api';

function Dashboard() {
  const [stats, setStats] = useState({ topStudent: null, topClass: null });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/stats/top`);
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  return (
    <div className="glass-panel">
      <h2>📊 Dashboard</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Ringkasan prestasi mahasiswa dan kelas unggulan.</p>
      
      <div className="dashboard-grid">
        <div className="glass-panel stat-card">
          <h3>Mahasiswa Terbaik</h3>
          {stats.topStudent ? (
            <>
              <div className="stat-value">{Number(stats.topStudent.average).toFixed(2)}</div>
              <p>{stats.topStudent.name} (Kelas {stats.topStudent.class_name})</p>
            </>
          ) : <p>Loading...</p>}
        </div>
        
        <div className="glass-panel stat-card">
          <h3>Kelas Unggulan</h3>
          {stats.topClass ? (
            <>
              <div className="stat-value">{Number(stats.topClass.average).toFixed(2)}</div>
              <p>Rata-rata Kelas {stats.topClass.class_name}</p>
            </>
          ) : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
