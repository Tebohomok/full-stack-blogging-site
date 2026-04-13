import React from "react";
// redeploy fix
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import App from './App.jsx'
import "./index.css";
import FooterSection from "./components/FooterSection";
import SinglePostPage from "./components/moreBlogsSinglePost.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import SecondNavbar from "./components/SecondNavbar";
import ScrollToTopArrow from "./components/ScrollToTopArrow";
import SocialMediaGame from './components/SocialMediaGame';
import ProtectedRoute from "./components/ProtectedRoute";
import RouteScrollReset from "./components/RouteScrollReset.jsx";

function AppWrapper() {
  const location = useLocation(); // Get the current route

  const isAuthenticated = localStorage.getItem('myToken'); // Check authentication status

  return (
    <>
      {/* Reset scroll position on route change */}
      <RouteScrollReset />

      {/* Only show navbar if user is authenticated */}
      {isAuthenticated && <SecondNavbar />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Routes>
        {/* Authentication Routes */}
     
        <Route path="/logout" element={<LogoutPage />} />

        {/* Redirect root to sign-up if not authenticated, otherwise to home */}
        <Route path="/" element={<App />} />

     

        <Route path="/single-post/:id" element={
          <ProtectedRoute>
            <SinglePostPage />
          </ProtectedRoute>
        } />

        <Route path="/blog" element={
          <ProtectedRoute>
            <BlogPage />
          </ProtectedRoute>
        } />

    

      


        {/* Catch all - redirect to sign-up */}
       <Route path="*" element={<Navigate to="/" replace />} />

      {/* Conditionally render SocialMediaGame for authenticated users only */}
      {isAuthenticated && location.pathname !== "/sign-up" && location.pathname !== "/login" && (
        <SocialMediaGame />
      )}

      {/* Scroll to top arrow is always shown */}
      <ScrollToTopArrow />

      {/* Show footer only if user is authenticated */}
      {isAuthenticated && <FooterSection />}
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);
