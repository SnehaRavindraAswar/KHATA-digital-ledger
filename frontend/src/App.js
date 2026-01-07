import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Customers from './pages/Customers';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
        path="/customers"
        element={
        <ProtectedRoute>
        <Customers />
        </ProtectedRoute>
        }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
