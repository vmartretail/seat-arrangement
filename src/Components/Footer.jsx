const Footer = () => {
  return (
    <div className="w-full py-1 px-2 bg-primary bg-[#9c2a5b] flex items-center justify-center ">
      <p className="text-white text-sm ">
        @copyright {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
