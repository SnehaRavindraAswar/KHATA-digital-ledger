import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

function CustomerLedger() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  /* =======================
     FORMAT DATE + TIME
  ======================= */
  const formatDateTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  /* =======================
     LOAD LEDGER
  ======================= */
  const loadLedger = async () => {
    try {
      const customerRes = await API.get(`/customer/${id}`);
      setCustomer(customerRes.data);

      const txRes = await API.get(`/customer/${id}/transactions`);
      setTransactions(txRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadLedger();
  }, [id]);

  /* =======================
     ADD TRANSACTION
  ======================= */
  const handleTransaction = async (type) => {
    if (!amount || amount <= 0) {
      alert('Enter valid amount');
      return;
    }

    try {
      await API.post('/transaction/add', {
        customer_id: id,
        amount,
        type,
        note
      });

      setAmount('');
      setNote('');
      loadLedger();
    } catch (err) {
      alert('Transaction failed');
    }
  };

  /* =======================
     DELETE TRANSACTION
  ======================= */
  const deleteTransaction = async (transactionId) => {
    if (!window.confirm('Delete this transaction?')) return;

    try {
      await API.delete(`/transaction/${transactionId}`);
      loadLedger();
    } catch (err) {
      alert('Delete failed');
    }
  };

  /* =======================
     CALCULATIONS
  ======================= */
  const totalBorrow = transactions
    .filter(t => t.type === 'BORROW')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalPaid = transactions
    .filter(t => t.type === 'PAY')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalBorrow - totalPaid;

  if (!customer) return <p>Loading...</p>;

  return (
    <div className="container mt-4">

      {/* CUSTOMER HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="mb-1">{customer.name}</h3>
          <small className="text-muted">📞 {customer.mobile}</small>
        </div>
      </div>

      {/* BALANCE SUMMARY */}
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Total Borrow</h6>
            <h5 className="text-danger">₹{totalBorrow}</h5>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h6>Total Paid</h6>
            <h5 className="text-success">₹{totalPaid}</h5>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h6>Balance</h6>
            <h5 style={{ color: balance > 0 ? 'red' : 'green' }}>
              ₹{balance}
            </h5>
          </div>
        </div>
      </div>

      {/* TRANSACTION INPUT */}
      <div className="card p-3 mt-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => handleTransaction('BORROW')}
            >
              Borrow
            </button>
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-success w-100"
              onClick={() => handleTransaction('PAY')}
            >
              Pay
            </button>
          </div>
        </div>
      </div>

      {/* TRANSACTIONS TABLE */}
      <table className="table table-bordered table-hover mt-4">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(t => (
            <tr key={t.transaction_id}>
              <td>{formatDateTime(t.transaction_date)}</td>
              <td className={t.type === 'BORROW' ? 'text-danger' : 'text-success'}>
                {t.type}
              </td>
              <td>₹{t.amount}</td>
              <td>{t.note || '-'}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteTransaction(t.transaction_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default CustomerLedger;
