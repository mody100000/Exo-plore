import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LandingPage />
    ),
  },
  {
    path: "/home",
    element: (
      <HomePage />
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;