
import React from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

/**
 * ============================================================================
 * PRODUCT LISTING COMPONENT
 * ============================================================================
 * 
 * This component demonstrates:
 * 1. Rendering lists with dynamic route links
 * 2. Creating links to dynamic routes with parameters
 * 3. useNavigate hook for programmatic navigation
 */

// Dummy product data - in real app, fetch from API
const dummy_products = [
  { id: "p1", name: "Product 1" },
  { id: "p2", name: "Product 2" },
  { id: "p3", name: "Product 3" }
];

function Product() {
  // useNavigate hook: Get navigation function for programmatic navigation
  // Uncomment line below to use programmatic navigation
  // const navigate = useNavigate();

  // Example: Redirect to home after 5 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/home");
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className="product">
      <h1>Product Listing</h1>
      
      {/**
       * DYNAMIC ROUTES WITH PARAMETERS
       * 
       * Concept:
       * - Route in App.js: { path: "/product/:id", element: <ProductInfo /> }
       * - :id is a URL parameter (placeholder)
       * - Template literal creates URLs: /product/p1, /product/p2, etc.
       * 
       * How it works:
       * 1. User clicks link to /product/p1
       * 2. React Router matches :id to 'p1'
       * 3. ProductInfo component renders with params.id = 'p1'
       * 4. Component uses useParams() to access the 'id' value
       */}
      <ul>
        {dummy_products.map((prod) => (
          <li key={prod.id}>
            {/**
             * Dynamic Link: Creates URL with product ID parameter
             * to={`/product/${prod.id}`}:
             * - /product/p1 for product 1
             * - /product/p2 for product 2
             * - /product/p3 for product 3
             */}
            <Link to={`/product/${prod.id}`}>{prod.name}</Link>
          </li>
        ))}
      </ul>

      {/**
       * PROGRAMMATIC NAVIGATION with useNavigate:
       * 
       * When to use:
       * - After form submission
       * - After API call completes
       * - Based on user interactions with conditions
       * - After errors or success messages
       * 
       * Example usage:
       * <button onClick={() => navigate("/home")}>Go Home</button>
       * <button onClick={() => navigate(-1)}>Go Back</button>
       * 
       * Note: navigate(-1) works like browser back button
       */}
    </div>
  );
}

export default Product;