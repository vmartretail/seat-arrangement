import { useState, useEffect } from "react";
import DynamicLayout from "./Components/DynamicLayout";
import SelectFloor from "./Components/SelectFloor";
import HomeLayout from "./Layout/HomeLayout";
import { ImSpinner } from "react-icons/im";
import {
  firstFloor,
  groundFloor,
  secondFloor,
  underGround,
} from "./utils/mock";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState({
    id: 1,
    name: "Under Ground Floor",
    key: "UG",
  });

  const [allSeats, setAllSeats] = useState([]);
  const [floorDetails, setFloorDetails] = useState({});

  // const mappedData = useMemo(
  //   () => ({
  //     UG: underGround,
  //     GF: groundFloor,
  //     FF: firstFloor,
  //     SF: secondFloor,
  //   }),
  //   []
  // );

  // Fetch data
  useEffect(() => {
    // Function to fetch data from the firebase
    async function fetchData() {
      try {
        setIsLoading(true);
        let arr = [underGround, groundFloor, firstFloor, secondFloor];

        let allRowData = [];
        let floorDetails = {};
        for (let i = 0; i < arr.length; i++) {
          const { numCols, numRows, rowData } = arr[i];

          if (arr[i]?.rowData) {
            floorDetails[rowData[0]?.floor] = { numRows, numCols };
            allRowData.push(...(rowData ?? []));
          }
        }
        setFloorDetails(floorDetails);
        setAllSeats(allRowData);

        setIsLoading(false);
      } catch (err) {
        console.log("err::", err);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <HomeLayout>
      <div className="bg-gray-100 p-4 shadow-md">
        <div className="container m-auto px-2">
          <div className="flex justify-between items-center gap-2">
            <form className="flex gap-4 justify-start items-center ">
              <label
                id="listbox-label"
                className="block text-lg font-medium leading-6 text-gray-900"
              >
                Floor:{" "}
              </label>
              <SelectFloor selected={selected} setSelected={setSelected} />
            </form>
            <div className="flex justify-start gap-3 items-center">
              <div className="flex justify-start gap-1 items-center">
                Occupied:{" "}
                <p className="min-w-6 min-h-6 bg-[#2e9c5f] rounded-md ring-1 ring-[#2e9c5f]">
                  {" "}
                </p>
              </div>
              <div className="flex justify-start gap-1 items-center">
                vacant:{" "}
                <p className="min-w-6 min-h-6 rounded-md ring-1 ring-red-400">
                  {" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic layout */}
      {isLoading ? (
        <div className="flex flex-1 justify-center items-center gap-2 text-md">
          <ImSpinner className="animate-spin text-4xl text-[#9c2a5b]" />
          Loading...
        </div>
      ) : (
        <DynamicLayout
          data={allSeats
            .filter((ele) => ele?.floor === selected["key"])
            .sort((a, b) => a?.seriesNo - b?.seriesNo)}
          numRows={floorDetails[selected["key"]]?.numRows}
          numCols={floorDetails[selected["key"]]?.numCols}
        />
      )}
    </HomeLayout>
  );
};

export default App;
