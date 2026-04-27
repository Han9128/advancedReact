# React Router v7 - Complete Learning Guide

A comprehensive React Router v7 tutorial demonstrating all major routing concepts and patterns. This project showcases modern React Router practices using the **Data Router** approach with `createBrowserRouter` and `RouterProvider`.

## 📚 What You'll Learn

This project covers essential React Router concepts:
- ✅ **Nested Routing** - Layout components with child routes
- ✅ **Dynamic Routes** - URL parameters and useParams hook
- ✅ **Navigation Components** - Link, NavLink, and useNavigate
- ✅ **Route Actions** - Form handling with action handlers
- ✅ **Error Boundaries** - Error handling with errorElement
- ✅ **Programmatic Navigation** - Navigate to routes from code
- ✅ **Active Route Styling** - Highlight current route with NavLink

---

## 🏗️ Project Structure

```
src/
├── App.js                           # Main router configuration
├── index.js                        # Application entry point
├── pages/
│   ├── Root.js                     # Layout component (parent route)
│   ├── Home.js                     # Home page route
│   ├── Product.js                  # Product listing (dynamic links)
│   ├── ProductInfo.js              # Product detail (URL parameters)
│   ├── NewProduct.js               # Form handling (actions)
│   ├── Todos.js                    # Todo page route
│   ├── Error.js                    # Error boundary page
│   └── Navbar/
│       ├── Navbar.js               # Navigation bar (NavLink)
│       └── navbar.css              # Navigation styling
├── index.css                       # Global styles
└── README.md                       # This file
```

---

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development Server
```bash
npm start
```
Opens [http://localhost:3000](http://localhost:3000) in your browser. The page reloads on code changes.

### Production Build
```bash
npm run build
```
Creates optimized production build in the `build/` folder.

### Run Tests
```bash
npm test
```
Launches the test runner in interactive watch mode.

---

## 🎯 Core Concepts Explained

### 1. **Router Configuration (App.js)**

The application uses the **Data Router** pattern, which is the modern React Router approach:

```javascript
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,           // Layout component
    errorElement: <Error />,     // Error boundary
    children: [
      { path: "/home", element: <Home /> },
      { path: "/product", element: <Product /> },
      { path: "/product/:id", element: <ProductInfo /> },
      { path: "/new-product", element: <NewProduct />, action: addProductAction }
    ]
  }
]);
```

**Key Points:**
- `path`: URL route (e.g., "/home", "/product/:id")
- `element`: Component to render for this route
- `errorElement`: Fallback for errors (404, runtime errors)
- `children`: Nested child routes (inherit parent layout)
- `action`: Function called on form submission

### 2. **Nested Routing with Outlet (Root.js)**

The Root component is a **layout component** that wraps all pages:

```javascript
function Root() {
  return (
    <div className="root">
      <Navbar />
      <Outlet />           {/* Child routes render here */}
      <footer>...</footer>
    </div>
  );
}
```

**The Flow:**
1. User navigates to `/product/p1`
2. React Router matches route `/product/:id`
3. ProductInfo component renders inside `<Outlet />`
4. Root layout (Navbar + Footer) stays constant
5. Only content between Navbar and Footer changes

**Benefits:**
- Consistent layout across pages
- Persistent navigation bar
- Shared header/footer
- Maintained state across route changes

### 3. **Navigation Components**

#### **Link** - Basic Navigation
```javascript
<Link to="/product">Go to Products</Link>
```
- Basic client-side navigation
- No page reload (efficient)
- No built-in active state

#### **NavLink** - Navigation with Active State (Used in Navbar)
```javascript
<NavLink 
  to="/home" 
  className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
>
  Home
</NavLink>
```
- Automatically adds "active" class to current route
- Enables visual feedback (highlight current page)
- Receives `{ isActive, isPending, isTransitioning }` in className function

**Why NavLink for Navigation Menus:**
- Users see which page they're on
- Better UX and accessibility
- No extra logic needed for styling

#### **useNavigate** - Programmatic Navigation
```javascript
const navigate = useNavigate();

// Navigate to a route
navigate("/home");

// Go back in history
navigate(-1);

// Replace current history entry
navigate("/home", { replace: true });
```

**Use Cases:**
- Redirect after form submission
- Navigate after API call succeeds
- Programmatic back button
- Conditional navigation

### 4. **Dynamic Routes with URL Parameters (Product.js → ProductInfo.js)**

**Scenario:** Create links to individual product pages.

**In Product.js:**
```javascript
{dummy_products.map((prod) => (
  <Link to={`/product/${prod.id}`}>{prod.name}</Link>
))}
```
Creates URLs: `/product/p1`, `/product/p2`, `/product/p3`

**In ProductInfo.js - Access Parameter:**
```javascript
import { useParams } from "react-router";

function ProductInfo() {
  const params = useParams();  // { id: 'p1' }
  console.log(params.id);      // 'p1'
  
  return <h3>Product: {params.id}</h3>;
}
```

**The Flow:**
1. Route config: `{ path: "/product/:id", element: <ProductInfo /> }`
2. `:id` is a URL parameter (matches any value)
3. URL: `/product/p1` → `params.id = 'p1'`
4. useParams() extracts parameters from current route

**Real-World Usage:**
```javascript
const { id } = useParams();
const product = products.find(p => p.id === id);  // Fetch specific product
```

### 5. **Form Handling with Actions (NewProduct.js)**

React Router's **Form** and **action** pattern replaces traditional form handling:

**In App.js - Route Configuration:**
```javascript
{
  path: "/new-product",
  element: <NewProduct />,
  action: addProductAction  // Function called on form submission
}
```

**In NewProduct.js - Form Component:**
```javascript
<Form method="POST">
  <input type="text" name="productName" placeholder="Product name" />
  <button type="submit">Add Product</button>
</Form>
```

**Action Handler:**
```javascript
export async function addProductAction({ request }) {
  const formData = await request.formData();
  const productName = formData.get("productName");
  
  // Process data: validate, send to API, etc.
  console.log("New product:", productName);
  
  // Redirect to confirmation page
  return redirect("/home");
}
```

**The Flow:**
1. User fills form and clicks submit
2. Form component collects data (name attributes)
3. Calls `addProductAction()` with form data
4. Action processes data and returns redirect or data
5. User is redirected to success page

**Advantages Over Traditional Forms:**
- ✅ No manual form state management
- ✅ Automatic error handling
- ✅ Server-like form handling on client
- ✅ Optimistic UI updates possible
- ✅ Type-safe (if using TypeScript)

### 6. **Error Handling (Error.js)**

**Error Boundary Setup in App.js:**
```javascript
{
  path: "/",
  element: <Root />,
  errorElement: <Error />,  // Shown on errors or 404
  children: [...]
}
```

**Error.js - Handle Errors:**
```javascript
function Error() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/home");  // Redirect to home on error
  }, [navigate]);
  
  return <h1>Page Not Found</h1>;
}
```

**When Error Boundary Shows:**
- User navigates to undefined route (404)
- Component throws an error
- Route handler fails

**Better Error Handling:**
```javascript
function Error() {
  const error = useRouteError();  // Get error details
  
  return (
    <div>
      <h1>Error: {error.status}</h1>
      <p>{error.statusText}</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}
```

### 7. **Active Route Styling with NavLink (Navbar.js)**

**NavLink Features:**
```javascript
<NavLink 
  to="/product"
  className={({ isActive, isPending }) => (
    `nav-item ${isActive ? "active" : ""}`
  )}
>
  Product
</NavLink>
```

**CSS for Active State:**
```css
.nav-item {
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  border-bottom: 2px solid transparent;
}

.nav-item.active {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}
```

---

## 🔄 Request/Response Flow

### Simple Navigation Flow
```
User clicks Link/NavLink
    ↓
React Router matches route
    ↓
Component renders
    ↓
useParams() hook (if needed)
    ↓
Component displays content
```

### Form Submission Flow
```
User submits Form
    ↓
Form data collected
    ↓
Action handler called: addProductAction()
    ↓
Validate & process data
    ↓
Return redirect() or data
    ↓
User redirected to new page
```

### Error Flow
```
User navigates to unknown route OR error occurs
    ↓
React Router catches error
    ↓
errorElement component renders
    ↓
Error page displayed (Error.js)
    ↓
User can navigate back
```

---

## 📋 Common Patterns

### Pattern 1: Product Listing → Product Details
```javascript
// Product.js - List with links
<Link to={`/product/${product.id}`}>{product.name}</Link>

// ProductInfo.js - Access ID
const { id } = useParams();
```

### Pattern 2: Form Submission → Confirmation
```javascript
// NewProduct.js
<Form method="POST">
  <input name="productName" />
  <button type="submit">Add</button>
</Form>

// Handler in addProductAction
return redirect("/home");  // Confirm with redirect
```

### Pattern 3: Conditional Navigation
```javascript
const navigate = useNavigate();

// After API call
if (response.ok) {
  navigate("/success");
} else {
  navigate("/error");
}
```

### Pattern 4: Dynamic Active State
```javascript
<NavLink
  to={`/admin/${userId}`}
  className={({ isActive }) => isActive ? "active" : ""}
>
  Admin
</NavLink>
```

---

## 🔧 Advanced Usage (Not in This Demo)

### Loaders - Fetch Data Before Rendering
```javascript
async function productLoader({ params }) {
  const product = await fetch(`/api/products/${params.id}`);
  return product;
}

// Route config
{ path: "/product/:id", element: <ProductInfo />, loader: productLoader }

// In component
const product = useLoaderData();
```

### Redirects in Loaders/Actions
```javascript
if (!user.isAuthenticated) {
  return redirect("/login");
}
```

### Relative Links
```javascript
<Link to=".">Current page</Link>
<Link to="..">Parent page</Link>
<Link to="../sibling">Sibling page</Link>
```

### Layout Routes (No Path)
```javascript
{
  element: <AuthLayout />,
  children: [
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> }
  ]
}
```

---

## 📚 React Router v7 Hooks Cheat Sheet

| Hook | Purpose | Returns |
|------|---------|---------|
| `useParams()` | Get URL parameters | Object with params |
| `useNavigate()` | Programmatic navigation | Navigation function |
| `useLocation()` | Get current location | Location object |
| `useRouteError()` | Get error details | Error object |
| `useLoaderData()` | Get data from loader | Loader data |
| `useActionData()` | Get action response | Action data |
| `useNavigation()` | Get navigation state | Navigation state |

---

## 🧪 Testing Routes

### Test Navigation
```javascript
// Navigate to different routes via browser
localhost:3000/home
localhost:3000/product
localhost:3000/product/p1
localhost:3000/product/p2
localhost:3000/new-product
localhost:3000/nonexistent  // Shows error page
```

### Test Active State
- Click navbar links - note active link highlighting
- Current link should be highlighted with "active" class

### Test Form Submission
1. Navigate to "New Product"
2. Enter product name
3. Click "Add Product"
4. Should redirect to home

### Test URL Parameters
1. Go to Product page
2. Click product link (e.g., "Product 1")
3. URL changes to `/product/p1`
4. ProductInfo component shows ID

---

## 🐛 Debugging Tips

1. **Check Route Paths**
   - Ensure `to` prop matches route `path` exactly
   - Case-sensitive: `/Home` ≠ `/home`

2. **useParams Not Working?**
   - Confirm parameter in route: `{ path: "/product/:id", ... }`
   - useParams must be inside component rendered by React Router

3. **Link Not Navigating?**
   - Use Link/NavLink from react-router (not HTML `<a>`)
   - Check `to` prop value

4. **Form Action Not Called?**
   - Ensure `action` is added to route config in App.js
   - Use `<Form method="POST">` (not HTML `<form>`)
   - Input must have `name` attribute

5. **Active State Not Highlighting?**
   - Use `<NavLink>` (not `<Link>`)
   - Check CSS selector for `.active` class

---

## 📖 Resources

- [React Router Official Docs](https://reactrouter.com)
- [React Router v7 Migration Guide](https://reactrouter.com/migration)
- [Client-Side Routing Explained](https://reactrouter.com/start/concepts)

---

## 🎓 Learning Path

1. **Start Here:** Review App.js to understand router config
2. **Learn Navigation:** Study Navbar.js and Link usage
3. **Master Parameters:** Explore Product.js and ProductInfo.js
4. **Handle Forms:** Deep dive into NewProduct.js and actions
5. **Error Handling:** Check Error.js for error boundaries
6. **Practice:** Modify routes and test in browser

---

## 📝 Notes

- This project uses React Router v7 (latest)
- Data Router is the recommended approach for new projects
- Nested routing enables powerful layout patterns
- URL parameters enable dynamic content
- Actions enable server-like form handling

Happy Learning! 🚀

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
