import PropTypes from "prop-types";
import { PiArmchairBold } from "react-icons/pi";

const Default = ({ label, data, onClick }) => {
  // Path
  if (data?.type === "path")
    return <div className="min-w-4 min-h-2 bg-slat-50 w-full h-full "></div>;

  // Divider
  if (data?.type === "divider") {
    return <div className="w-full h-1 border-separate border-2"> </div>;
  }

  return (
    <>
      <button
        disabled={data?.disabled}
        className={`
      min-w-4 min-h-4 bg-slat-50 w-full h-full p-2 rounded-sm flex justify-center items-center text-xs disabled:bg-gray-200 group relative
      
      ${
        data?.type === "fixed"
          ? "bg-slate-100 text-slate-950 "
          : data?.type === "small"
          ? "rounded-t-lg "
          : "text-stone-50"
      }
      ${data?.employeeName ? "bg-[#499557] text-gray-100" : "bg-slate-200 "}
      `}
        onClick={() => onClick(true, data)}
        title={data?.employeeName || ""}
      >
        <p className="text-xs text-ellipsis overflow-hidden font-semibold text-nowrap ">
          {data?.type === "fixed" && label}
          {data?.type === "block" && data?.employeeName && data?.employeeName}
          {["block", "small"].includes(data?.type) && data?.employeeName}
        </p>

        {/* <PiArmchairBold /> */}

        {data?.employeeName && (
          <div className="absolute bottom-full bg-white shadow-lg border-separate border-1 px-5 py-4 hidden group-hover:inline-block z-30 text-slate-950 text-nowrap rounded-md text-md">
            {data?.employeeName || "--"}
          </div>
        )}
      </button>
    </>
  );
};

Default.propTypes = {
  label: PropTypes.string,
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    employeeName: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Default;
