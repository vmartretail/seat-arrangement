import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import Default from "./Default";
import Modal from "./Modal";

const DynamicLayout = ({
  data,
  numRows,
  numCols,
  setAllSeats,
  searchedSeat,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const onClick = useCallback((action, data) => {
    setSelectedData(data);
    setIsOpen(action);
  }, []);

  const renderItems = useCallback(() => {
    return (
      <div
        className="grid gap-1 z-1 w-full max-w-full"
        style={{
          gridTemplateColumns: `${Array.from({ length: numCols })
            .map(() => "1fr")
            .join(" ")}`,
        }}
      >
        {data?.map((row, rowIndex) => (
          <div
            key={`${rowIndex}-${"a"}`}
            className="border border-transparent"
            style={{
              gridColumn: `span ${
                row?.colSpan === Infinity ? numCols : row?.colSpan ?? 1
              }`,
              gridRow: `span ${
                row?.rowSpan === Infinity ? numRows : row?.rowSpan ?? 1
              }`,
            }}
            data-seriesno={row?.seriesNo || "NA"}
          >
            <Default
              label={row?.label || `${row?.seatId}` || ""}
              data={row}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              onClick={onClick}
              isSearched={searchedSeat === row?.seriesNo}
            />
          </div>
        ))}
      </div>
    );
  }, [data, numCols, numRows, isOpen, setIsOpen, onClick, searchedSeat]);

  return (
    <div className="flex justify-center items-center flex-1 my-2 container m-auto z-1 py-4 px-2 overflow-auto">
      {renderItems()}

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={selectedData}
        setAllSeats={setAllSeats}
      />
    </div>
  );
};

DynamicLayout.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      colSpan: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf([null, undefined]),
      ]),
      rowSpan: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf([null, undefined]),
      ]),
    })
  ).isRequired,
  numCols: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.oneOf([null, undefined]),
  ]),
  numRows: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.oneOf([null, undefined]),
  ]),
  setAllSeats: PropTypes.func.isRequired,
  searchedSeat: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([null, undefined]),
  ]),
};

export default DynamicLayout;
