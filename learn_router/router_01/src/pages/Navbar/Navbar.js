import { NavLink } from "react-router";
import "./navbar.css";

/**
 * ============================================================================
 * NAVBAR COMPONENT
 * ============================================================================
 * Navigation bar with active route highlighting.
 * 
 * KEY ROUTING CONCEPTS:
 * 
 * 1. NavLink vs Link:
 *    - Link: Basic navigation, no built-in active state
 *    - NavLink: Link with active state support (preferred for navigation menus)
 * 
 * 2. className Function:
 *    NavLink accepts a function for className that receives { isActive }
 *    This allows conditional styling based on whether the route is active.
 * 
 * 3. Dynamic Active State:
 *    The active class is automatically applied when the route matches the 'to' prop.
 *    This helps users understand which page they're currently viewing.
 */
function Navbar() {
  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        {/* 
          NavLink: Navigation component with active state support
          
          Key features:
          - to="/home": Destination route (matches route path in App.js)
          - className: Can be a function that receives { isActive } object
          - isActive: Boolean indicating if current route matches this link's path
          - When isActive is true, the "active" class is applied for styling
        */}
        <li className="nav-items">
          <NavLink 
            to="/home" 
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            Home
          </NavLink>
        </li>

        <li className="nav-items">
          <NavLink 
            to="/product" 
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            Product
          </NavLink>
        </li>

        <li className="nav-items">
          <NavLink 
            to="/todos" 
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            ToDos
          </NavLink>
        </li>

        <li className="nav-items">
          <NavLink 
            to="/new-product" 
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            New Product
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;