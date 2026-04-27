
import React from "react";
import { Link } from "react-router";

/**
 * ============================================================================
 * HOME PAGE COMPONENT
 * ============================================================================
 * 
 * This is a simple route component that demonstrates basic navigation.
 * 
 * KEY CONCEPTS:
 * 
 * 1. Link Component:
 *    - Use React Router's Link instead of HTML <a> tags
 *    - Link prevents full page reload
 *    - Enables client-side navigation (single-page app behavior)
 *    - to="/product" specifies the target route
 * 
 * 2. Why not <a href>:
 *    - HTML <a> causes full page refresh (inefficient)
 *    - React Router's Link keeps component state
 *    - Faster navigation experience
 * 
 * 3. Navigation Options:
 *    - Link: For user-clickable links (navigation menus)
 *    - NavLink: Link with active state styling (navigation bars)
 *    - useNavigate hook: Programmatic navigation after actions
 */
function Home() {
  return (
    <div className="home">
      <h1>Welcome to Home Page</h1>
      <p>Use the navigation bar to explore the application.</p>
      
      {/**
       * Link Component: Client-side navigation
       * - to="/product": Target route (matches route path in App.js)
       * - No page reload, state is preserved
       * - Better UX than traditional <a> tags
       */}
      {/* Example of Link (commented, use Navbar for navigation):
      <Link to="/product">Go to Products</Link>
      */}
    </div>
  );
}

export default Home;