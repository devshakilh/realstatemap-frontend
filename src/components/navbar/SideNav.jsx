import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sideNav.scss";

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Icon (Visible on mobile) */}
      <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleSideNav}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Side Navigation */}
      <nav className={`sideNav ${isOpen ? "open" : ""}`}>
        <ul className="navLinks">
          <li>
            <Link to="/" className="navItem" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile" className="navItem" onClick={() => setIsOpen(false)}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/services" className="navItem" onClick={() => setIsOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="navItem" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideNav;
