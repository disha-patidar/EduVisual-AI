import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="brand">

        <span className="brand-mark">
          <Sparkles size={18} />
        </span>

        <span>
          Edu<span className="gradient-text">Visual</span> AI
        </span>

      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/explore">
          Explore
        </Link>

      </div>

      <Link
        to="/explore"
        className="nav-cta"
      >
        Start learning
      </Link>

    </nav>
  );
}

export default Navbar;