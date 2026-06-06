import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav className="nav-bar">
      <h2>🎓 EduGrade</h2>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/class">Kelas</Link>
        <Link to="/student">Statistik</Link>
        {user.role === 'admin' && <Link to="/input">Input Nilai</Link>}
        <button onClick={onLogout} className="btn" style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
