import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Customers from './pages/Customers';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import CustomerLedger from './pages/CustomerLedger';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route
        path="/dashboard"
        element={
        <ProtectedRoute>
        <Layout>
        <Dashboard />
        </Layout>
        </ProtectedRoute>
        }
        /> */}
        <Route
        path="/customers"
        element={
        <ProtectedRoute>
        <Layout>
        <Customers />
        </Layout>
        </ProtectedRoute>
        }
      />
      <Route path="/customer/:id" element={<CustomerLedger />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
