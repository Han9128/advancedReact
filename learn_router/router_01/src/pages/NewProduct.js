import React from "react";
import { Form, redirect } from "react-router";

/**
 * ============================================================================
 * NEW PRODUCT COMPONENT - FORM HANDLING WITH ACTIONS
 * ============================================================================
 * 
 * This component demonstrates React Router's form handling using:
 * - Form component (replaces HTML <form>)
 * - Action handlers (server-like request handling on client)
 * - Form submission with automatic data collection
 * 
 * KEY CONCEPTS:
 * 
 * 1. Form Component:
 *    - React Router's enhanced <form> element
 *    - Automatically prevents default submission
 *    - Collects form data and passes to the action handler
 *    - Enables optimistic UI updates
 * 
 * 2. Actions:
 *    - Functions that run BEFORE the route renders (or on submission)
 *    - Receive { request } with form data
 *    - Run on the server (or in this case, client-side)
 *    - Can return data or redirect user
 * 
 * 3. Action Handler Lifecycle:
 *    1. User fills form and submits
 *    2. Form component prevents default submission
 *    3. Form data is collected (from input names)
 *    4. addProductAction function is called
 *    5. Action processes data and redirects or returns data
 */
function NewProduct() {
  return (
    <div className="new-product">
      <h1>Add New Product</h1>
      
      {/**
       * Form Component from React Router
       * 
       * method='POST': HTTP method for form submission
       *   - 'POST' for creating/modifying data
       *   - 'GET' for retrieving/filtering data
       * 
       * No 'action' prop needed here because the route config
       * in App.js already specifies the action handler
       * 
       * Form Data:
       * - Input name="productName" becomes: formData.get("productName")
       * - Form collects all named inputs and sends to action handler
       */}
      <Form method="POST">
        <div className="new-product-info">
          {/**
           * Input name attribute is IMPORTANT
           * The 'name' property determines what key is used in formData
           * Without a name, the input won't be included in form submission
           */}
          <input 
            type="text" 
            name="productName" 
            placeholder="Enter product name" 
            required
          />
        </div>
        {/**
         * Submit button: Triggers form submission and calls the action handler
         */}
        <button type="submit">Add Product</button>
      </Form>
    </div>
  );
}

/**
 * ============================================================================
 * ACTION HANDLER - addProductAction
 * ============================================================================
 * 
 * This function is called when the form is submitted.
 * It's specified in App.js route config: { action: addProductAction }
 * 
 * FUNCTION SIGNATURE:
 * async function(params) where params = { request, params, context }
 * - request: The fetch Request object with form data
 * - params: URL parameters if any
 * - context: Additional context provided by the router
 * 
 * RESPONSIBILITIES:
 * 1. Extract form data from request
 * 2. Validate data
 * 3. Process/save data (API call, DB operation, etc.)
 * 4. Return data or redirect user
 * 
 * @param {Object} params - Action parameters object
 * @param {Request} params.request - Contains form data
 * @returns {Response|Object|redirect} - Return value or redirect
 */
export async function addProductAction({ request }) {
  // Extract form data from the request
  const formData = await request.formData();
  
  // Get specific form field by its name attribute
  const productName = formData.get("productName");
  
  // Log for debugging (in production, send to API)
  console.log("New product added:", productName);
  
  // TODO: In a real app, you would:
  // 1. Validate productName
  // 2. Send to backend API: await fetch('/api/products', { method: 'POST', ... })
  // 3. Handle errors
  // 4. Update cache/state
  
  /**
   * redirect(): Navigate user to a new route after submission
   * - Replaces the current route
   * - Equivalent to router.navigate("/home")
   * - Provides better UX than programmatic navigation
   */
  return redirect("/home");
}

export default NewProduct;