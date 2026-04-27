import React from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";

/**
 * ============================================================================
 * ERROR PAGE COMPONENT - ERROR BOUNDARY
 * ============================================================================
 * 
 * This component is shown when:
 * 1. A route doesn't exist (404 errors)
 * 2. An error occurs in any child route
 * 3. The errorElement is triggered in App.js
 * 
 * KEY CONCEPTS:
 * 
 * 1. Error Boundary (errorElement):
 *    - Defined in App.js: errorElement: <Error />
 *    - Catches errors from any route in the application
 *    - Acts as a fallback for invalid routes or runtime errors
 * 
 * 2. useNavigate Hook:
 *    - Programmatically navigate users to different routes
 *    - Returns a function to navigate
 *    - Useful for redirects after actions or errors
 *    - Can pass { replace: true } to replace history
 * 
 * 3. Automatic Redirect:
 *    - This component uses useEffect to redirect to /home
 *    - Demonstrates programmatic navigation pattern
 *    - In production, you might show an error message first
 */
function Error() {
  /**
   * useNavigate Hook: Get navigation function
   * Usage: navigate(path) or navigate(path, options)
   */
  const navigate = useNavigate();

  /**
   * useEffect: Redirect to home page when component mounts
   * 
   * How it works:
   * 1. Component renders (error page briefly shown)
   * 2. useEffect runs after component mounts
   * 3. navigate("/home") redirects user to home page
   * 4. navigate dependency array ensures proper cleanup
   * 
   * BEST PRACTICE:
   * In real applications, you should:
   * - Display an error message to the user first
   * - Offer options (go home, go back, contact support)
   * - Only auto-redirect if appropriate
   */
  useEffect(() => {
    // Redirect to home page after 2 seconds (optional delay)
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="error-page">
      <h1>⚠️ Page Not Found</h1>
      <p>This page doesn't exist or an error occurred.</p>
      <p>Redirecting to home page...</p>
      {/**
       * Alternative: Show error without auto-redirect
       * <button onClick={() => navigate("/home")}>Go Home</button>
       * <button onClick={() => navigate(-1)}>Go Back</button>
       * 
       * navigate(-1) goes back one page in browser history
       * navigate(-2) goes back two pages, etc.
       */}
    </div>
  );
}

export default Error;