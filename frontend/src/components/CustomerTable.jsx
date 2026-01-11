import { useNavigate } from 'react-router-dom';

function CustomerTable({ customers }) {
  const navigate = useNavigate();

  return (
    <table className="table table-bordered table-hover">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>

      <tbody>
        {customers.map((c, index) => (
           <tr
            key={c.customer_id}
            onClick={() => navigate(`/customer/${c.customer_id}`)}
            style={{ cursor: 'pointer' }}
          >
            <td>{index + 1}</td>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.mobile}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerTable;
