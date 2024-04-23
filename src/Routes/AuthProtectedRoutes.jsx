import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../services/firebase";

const AuthProtectedRoutes = () => {
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLogIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return isLogIn ? (
    <main className="main-container">
      <Outlet />
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthProtectedRoutes;
