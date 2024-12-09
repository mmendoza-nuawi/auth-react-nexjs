import Link from "next/link";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#999" }}>
      <Link href="/" style={{ marginRight: "15px", color: "#fff", textDecoration: "none" }}>
        Home
      </Link>
      <Link href="/pagina-prueba" style={{ color: "#fff", textDecoration: "none" }}>
        Página Prueba
      </Link>
    </nav>
  );
};

export default Navbar;
