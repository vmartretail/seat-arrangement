import { IoIosPerson } from "react-icons/io";
import { useState, useEffect, useCallback } from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;

    setUser(currentUser);
  }, [navigate]);

  const handleLogOut = useCallback(async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.log("err::", err);
    }
  }, []);

  return (
    <div className="w-full py-4 px-2 bg-primary bg-[#2c3e50]">
      <div className="container flex justify-between items-center gap-2 m-auto px-2">
        <div className="flex justify-start items-center gap-2">
          <img
            className="w-10"
            src={"https://www.vmart.co.in/wp-content/uploads/2022/07/logo.png"}
            alt="logo"
          />
          <p className="text-white text-2xl">Seating Arrangement</p>
        </div>

        <div className="flex gap-4 justify-between items-center">
          <button
            className="text-md px-4 py-2 text-red-400 rounded"
            onClick={handleLogOut}
          >
            Logout
          </button>

          {user?.displayName && (
            <h3 className="text-white text-semibold text-md">
              {user?.displayName}
            </h3>
          )}

          {user?.photoURL ? (
            <img
              className="w-6 h-6 rounded-full"
              src={user?.photoURL}
              alt="user_profile"
            />
          ) : (
            <IoIosPerson className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-white text-gray-500 cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
