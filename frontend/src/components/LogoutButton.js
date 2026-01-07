import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');   // 🔥 KEY STEP
    navigate('/');                      // redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '8px 15px',
        background: '#e74c3c',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
