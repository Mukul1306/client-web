import { Link } from "react-router-dom";
import "./layout.css";

export default function Header() {
  return (
    <header className="site-header">
      <h2>Alyvrapharma</h2>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
}
