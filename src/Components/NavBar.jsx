import { IoIosPerson } from "react-icons/io";

const NavBar = () => {
  return (
    <div className="w-full py-4 px-2 bg-primary bg-[#2c3e50]">
      <div className="container flex justify-between items-center gap-2 m-auto px-2">
        <p className="text-white text-2xl">Seat Arrangement</p>

        <div>
          <IoIosPerson className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-white text-gray-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
