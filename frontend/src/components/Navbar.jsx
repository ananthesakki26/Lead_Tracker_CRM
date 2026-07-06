import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar px-4" >
      <Link to="/" className="navbar-brand text-dark fw-bold fs-4">📊 Lead Pipeline <br/> <p className="fw-light">Track leads from first contact to closed deal. </p></Link>
      <Link to="/new" className="btn btn-dark btn-sm p-3" >+ New Lead</Link>
    </nav>
  );
}
