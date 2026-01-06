function CustomerSearch({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by name / mobile / email"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: '10px',
        width: '350px',
        marginBottom: '15px',
        borderRadius: '6px',
        border: '1px solid #ccc'
      }}
    />
  );
}

export default CustomerSearch;
