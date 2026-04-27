import Home from "./pages/Home";
import Product from "./pages/Product";
import {createBrowserRouter} from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./pages/Root";
import ProductInfo from "./pages/ProductInfo";
import Error from "./pages/Error";
import ToDos from "./pages/Todos";
import NewProduct from "./pages/NewProduct";
import { addProductAction } from "./pages/NewProduct";

/**
 * ============================================================================
 * REACT ROUTER v7 - DATA ROUTER IMPLEMENTATION
 * ============================================================================
 * This application uses React Router's modern Data Router approach with
 * createBrowserRouter and RouterProvider. This is the recommended method
 * for new projects as it provides better performance and cleaner code.
 * 
 * KEY FEATURES DEMONSTRATED:
 * ✓ Nested routing with layouts (Root layout wraps all pages)
 * ✓ Dynamic routes with parameters (:id)
 * ✓ Route-level action handlers for form submissions
 * ✓ Error boundary handling (errorElement)
 * ✓ Component-based route configuration
 */

/**
 * ROUTER CONFIGURATION
 * The router array defines all routes and their hierarchy.
 * Routes are matched top-to-bottom, so more specific paths should come first.
 */
const router = createBrowserRouter([
  {
    // ROOT LAYOUT ROUTE
    // This is the parent route that wraps all child routes
    // The Root component contains common layout (Navbar, Footer, etc.)
    path: "/",
    element: <Root />,
    
    // Error boundary - shown when any child route encounters an error
    // Also catches undefined routes (404 errors)
    errorElement: <Error />,
    
    // NESTED CHILD ROUTES
    // These routes inherit the Root layout and are rendered via <Outlet />
    children: [
      // Home page route
      { path: "/home", element: <Home /> },
      
      // Product listing page route
      { path: "/product", element: <Product /> },
      
      // DYNAMIC ROUTE: Product detail page
      // The :id is a URL parameter that can be accessed via useParams() hook
      // Example URLs: /product/p1, /product/p2, /product/p3
      { path: "/product/:id", element: <ProductInfo /> },
      
      // Todos page route
      { path: "/todos", element: <ToDos /> },
      
      // FORM ACTION ROUTE: New product creation
      // The action property runs when the form is submitted
      // addProductAction receives form data and handles server logic
      // This demonstrates React Router's server-like form handling
      { path: "/new-product", element: <NewProduct />, action: addProductAction }
    ]
  }

  // {
  //   path: "/",
  //   element: <Home />
  // },

  // {
  //   path: "/product",
  //   element: <Product />
  // }
])

/**
 * APP COMPONENT
 * Main component that provides routing to the entire application.
 * RouterProvider wraps the app and enables all routing capabilities.
 */
function App() {
  return (

    // <div className="App">
    //   <h1>Hello, React Router</h1>
    //   <Home />
    //   <Product />
    // </div>
    
    // {/* wrap with this for routing with data method*/}
    <RouterProvider router={router} />
  );
}

export default App;
