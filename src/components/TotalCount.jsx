const TotalCount = ({ totalCount }) => {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        maxWidth: "300px",
        backgroundColor: "white",
      }}
    >
      <p style={{ fontSize: "15px" }}>
        Total: <span style={{ color: "red" }}>{totalCount}</span>
      </p>
    </div>
  );
};

export default TotalCount;
