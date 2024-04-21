import PropTypes from "prop-types";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

const HomeLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <NavBar />
      <div className="relative flex-1 flex flex-col">{children}</div>
      <Footer />
    </div>
  );
};

HomeLayout.propTypes = {
  children: PropTypes.any,
};

export default HomeLayout;
