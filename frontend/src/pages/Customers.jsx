import React, { useEffect, useState } from 'react';
import API from '../services/api';
import CustomerSearch from '../components/CustomerSearch';
import CustomerTable from '../components/CustomerTable';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      fetchCustomers();
    } else {
      searchCustomers();
    }
  }, [search]);

  const fetchCustomers = async () => {
    const res = await API.get('/customer/list');
    setCustomers(res.data);
  };

  const searchCustomers = async () => {
    const res = await API.get(`/customer/search?q=${search}`);
    setCustomers(res.data);
  };

  return (
    <div>
      <h2>Customers</h2>

      <CustomerSearch search={search} setSearch={setSearch} />

      <CustomerTable customers={customers} />
    </div>
  );
}

export default Customers;
