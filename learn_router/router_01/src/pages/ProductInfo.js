import { useParams } from "react-router";

/**
 * ============================================================================
 * PRODUCT INFO COMPONENT - DYNAMIC ROUTING
 * ============================================================================
 * 
 * This component demonstrates the use of URL parameters (dynamic routing).
 * Route definition in App.js: { path: "/product/:id", element: <ProductInfo /> }
 * 
 * KEY CONCEPTS:
 * 
 * 1. URL Parameters:
 *    - Route: /product/:id
 *    - :id is a parameter that can be any value (p1, p2, p3, etc.)
 *    - Full URLs: /product/p1, /product/p2, /product/p3
 * 
 * 2. useParams() Hook:
 *    - Retrieves URL parameters from the current route
 *    - Returns an object: { id: 'p1' }
 *    - Only works for parameters defined in the route path
 *    - Must be called inside a component rendered by React Router
 */
function ProductInfo() {
  // useParams() returns an object with all URL parameters
  // For route /product/:id, this returns { id: 'value' }
  const params = useParams();
  console.log(params); // Output: { id: 'p1' } (or p2, p3, etc.)

  return (
    <div className="product-info">
      <h2>Product Information</h2>
      {/* 
        Display the product ID from URL parameter.
        This demonstrates how to access dynamic route parameters.
        In a real app, you would:
        1. Use params.id to fetch product data from API
        2. Display product details like name, price, description
        3. Handle loading and error states
      */}
      <h3>Product ID: {params.id}</h3>
      {/* Example: Could add more product details here based on params.id */}
    </div>
  );
}

export default ProductInfo;