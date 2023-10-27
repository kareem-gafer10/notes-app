import React from "react";
import { Toaster } from "react-hot-toast";

// routes
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import SignUp from "./pages/SignUp";
import Layout from "./components/layout";
import SignIn from "./pages/SignIn";
import Notes from "./pages/Notes";
import NotesContextProvider from "./Context/NotesContext";
import ProtectedRoutes from "./components/protectedRoutes";

const App = () => {
  const router = createBrowserRouter([
    {path: "/",element: <Layout />,children: [
        { index: true, element: <SignUp /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/notes", element: <ProtectedRoutes><Notes /></ProtectedRoutes> },
      ]},
  ]);

  return (
    <>
    <Toaster/>
    <NotesContextProvider>
    <RouterProvider router={router} />
    </NotesContextProvider>
    </>
  );
};

export default App;
