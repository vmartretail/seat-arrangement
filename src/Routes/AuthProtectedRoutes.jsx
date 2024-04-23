import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../services/firebase";
import { ImSpinner } from "react-icons/im";

const AuthProtectedRoutes = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
      }
      setIsLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="container flex p-2 w-full h-svh justify-center items-center m-auto">
        <div className="flex flex-1 justify-center items-center gap-2 text-md">
          <ImSpinner className="animate-spin text-4xl text-[#9c2a5b]" />
          Loading...
        </div>
      </div>
    );
  }

  return isLogIn ? (
    <main className="main-container">
      <Outlet />
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthProtectedRoutes;
