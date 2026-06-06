import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://192.168.56.11:3000/api';

function InputGrade() {
  const [formData, setFormData] = useState({
    nim: '',
    subject: '',
    score: '',
    semester: ''
  });
  
  const [studentData, setStudentData] = useState({
    nim: '',
    name: '',
    className: ''
  });

  const [message, setMessage] = useState('');
  const [studentMessage, setStudentMessage] = useState('');

  const handleSubmitGrade = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/grades`, formData);
      setMessage('✅ Nilai berhasil ditambahkan!');
      setFormData({ nim: '', subject: '', score: '', semester: '' });
    } catch (err) {
      setMessage('❌ Gagal menambahkan nilai. Pastikan NIM valid.');
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/students`, studentData);
      setStudentMessage('✅ Mahasiswa/Kelas berhasil ditambahkan!');
      setStudentData({ nim: '', name: '', className: '' });
    } catch (err) {
      setStudentMessage(`❌ Gagal: ${err.response?.data?.error || 'Terjadi kesalahan'}`);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div className="glass-panel">
        <h2>📝 Input Nilai Mahasiswa</h2>
        {message && <p style={{ marginBottom: '1rem', color: message.includes('✅') ? '#4ade80' : '#ef4444' }}>{message}</p>}
        
        <form onSubmit={handleSubmitGrade}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>NIM Mahasiswa</label>
            <input 
              type="text" 
              className="input-field" 
              value={formData.nim}
              onChange={(e) => setFormData({...formData, nim: e.target.value})}
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Mata Kuliah</label>
            <input 
              type="text" 
              className="input-field" 
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1, marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Semester</label>
              <input 
                type="number" 
                className="input-field" 
                value={formData.semester}
                onChange={(e) => setFormData({...formData, semester: e.target.value})}
                required
              />
            </div>
            <div style={{ flex: 1, marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Nilai (Score)</label>
              <input 
                type="number" 
                step="0.01"
                className="input-field" 
                value={formData.score}
                onChange={(e) => setFormData({...formData, score: e.target.value})}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>Simpan Nilai</button>
        </form>
      </div>

      <div className="glass-panel">
        <h2>👤 Tambah Mahasiswa Baru</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Tambahkan mahasiswa baru di sini. Anda juga bisa membuat kelas baru hanya dengan mengetikkan nama kelas yang belum ada.
        </p>
        {studentMessage && <p style={{ marginBottom: '1rem', color: studentMessage.includes('✅') ? '#4ade80' : '#ef4444' }}>{studentMessage}</p>}
        
        <form onSubmit={handleAddStudent}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>NIM</label>
            <input 
              type="text" 
              className="input-field" 
              value={studentData.nim}
              onChange={(e) => setStudentData({...studentData, nim: e.target.value})}
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Nama Lengkap</label>
            <input 
              type="text" 
              className="input-field" 
              value={studentData.name}
              onChange={(e) => setStudentData({...studentData, name: e.target.value})}
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Kelas</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Contoh: 12C atau TI-A"
              value={studentData.className}
              onChange={(e) => setStudentData({...studentData, className: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn" style={{ width: '100%', background: '#10b981' }}>Tambah Mahasiswa</button>
        </form>
      </div>
    </div>
  );
}

export default InputGrade;
