import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 20px',
      background: '#2e86de',
      color: '#fff'
    }}>
      <h3>KHATA</h3>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link style={linkStyle} to="/dashboard">Dashboard</Link>
        <Link style={linkStyle} to="/customers">Customers</Link>
        <LogoutButton />
      </div>
    </div>
  );
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold'
};

export default Navbar;
