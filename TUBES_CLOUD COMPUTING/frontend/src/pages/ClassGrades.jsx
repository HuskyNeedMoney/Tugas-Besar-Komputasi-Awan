import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://192.168.56.11:3000/api';

function ClassGrades() {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState('');
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (className) fetchGrades();
  }, [className]);

  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${API_URL}/classes`);
      setClasses(res.data);
      if (res.data.length > 0) {
        setClassName(res.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGrades = async () => {
    try {
      const res = await axios.get(`${API_URL}/grades/class/${className}`);
      setGrades(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="glass-panel">
      <h2>🏫 Nilai Mahasiswa per Kelas</h2>
      <div style={{ marginBottom: '1rem' }}>
        <select 
          className="input-field" 
          value={className} 
          onChange={(e) => setClassName(e.target.value)}
          style={{ width: '200px' }}
        >
          {classes.map((cls, idx) => (
            <option key={idx} value={cls}>Kelas {cls}</option>
          ))}
          {classes.length === 0 && <option value="">Tidak ada kelas</option>}
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Mata Kuliah</th>
              <th>Semester</th>
              <th>Nilai</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, idx) => (
              <tr key={idx}>
                <td>{g.nim}</td>
                <td>{g.name}</td>
                <td>{g.subject}</td>
                <td>{g.semester}</td>
                <td>{g.score}</td>
              </tr>
            ))}
            {grades.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>Tidak ada data.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassGrades;
