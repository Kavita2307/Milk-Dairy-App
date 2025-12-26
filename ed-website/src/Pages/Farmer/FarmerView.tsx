export default function FarmerView() {
  return (
    <>
      <h2>Farmer Details</h2>

      <nav
        style={{ display: "flex", gap: 16, borderBottom: "2px solid orange" }}
      >
        <span>Herd Info</span>
        <span>Milking Group</span>
        <span>Non Milking Group</span>
        <span>Ingredient Store</span>
        <span>Reports</span>
      </nav>

      <section style={{ background: "white", padding: 16, marginTop: 16 }}>
        Display herd info / app workflow here
      </section>
    </>
  );
}
