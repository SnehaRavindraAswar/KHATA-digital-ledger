function CustomerTable({ customers }) {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Mobile</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(c => (
          <tr key={c.customer_id}>
            <td>{c.name}</td>
            <td>{c.mobile}</td>
            <td>{c.email || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerTable;
