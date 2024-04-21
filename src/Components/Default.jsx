import PropTypes from "prop-types";

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
      min-w-4 min-h-4 bg-slat-50 w-full h-full p-2 ring-1 rounded-sm flex justify-center items-center text-xs disabled:bg-gray-200 disabled:text-white disabled:ring-[gray-200]
      ${data?.type === "block" ? "ring-red-400" : "ring-[#2e9c5f]"}
      ${
        data?.isSelected
          ? "bg-[#2e9c5f] text-white"
          : "text-[#2e9c5f] ring-red-400"
      }
      `}
        onClick={() => onClick(true, data)}
        title={data?.employeeName || ""}
      >
        {data?.type === "fixed" && label}
        {data?.type === "block" && data?.employeeName && data?.employeeName}
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
