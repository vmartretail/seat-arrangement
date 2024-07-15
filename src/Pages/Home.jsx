import { useState, useEffect, useMemo } from "react";
import { ImSpinner } from "react-icons/im";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import HomeLayout from "../Layout/HomeLayout";
import SelectFloor from "../Components/SelectFloor";
import DynamicLayout from "../Components/DynamicLayout";
import SearchInput from "../Components/SearchInput";
import errorImg from "../assets/error.png";

const floors = [
  { id: 1, name: "Under Ground Floor", key: "UG" },
  { id: 2, name: "Ground Floor", key: "GF" },
  { id: 3, name: "First Floor", key: "FF" },
  { id: 4, name: "Second Floor", key: "SF" },
];

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(floors[0]); // selectedFloor
  const [isError, setIsError] = useState("");
  const [searchedSeat, setSearchedSeat] = useState();
  const [floorDetails, setFloorDetails] = useState({
    occupied: 0,
    vacant: 0,
    intern: 0,
  });

  const [allSeats, setAllSeats] = useState([]);

  // floor seats
  const floorSeats = useMemo(
    () =>
      allSeats
        .filter((ele) => ele?.floor === selected["key"])
        .sort((a, b) => a?.seriesNo - b?.seriesNo) || [],
    [selected, allSeats]
  );

  // get counts
  const seatCounts = useMemo(() => {
    const initialSeatsCounts = {
      occupied: 0,
      vacant: 0,
      intern: 0,
    };

    if (!Array.isArray(floorSeats) || floorSeats?.length === 0)
      return initialSeatsCounts;

    const seatsCount = floorSeats.reduce((seatCount, currentSeat) => {
      // if no seatId then it is not seat
      if (!currentSeat?.seatId) return seatCount;
      // Check if employee name exists then it is occupied if not then vacant
      if (currentSeat.employeeName) {
        // check for the intern

        if (currentSeat.desc.toLowerCase().includes("intern")) {
          return { ...seatCount, intern: Number(seatCount?.intern) + 1 };
        } else {
          return { ...seatCount, occupied: Number(seatCount?.occupied) + 1 };
        }
      } else {
        return { ...seatCount, vacant: Number(seatCount?.vacant + 1) };
      }
    }, initialSeatsCounts);

    return seatsCount;
  }, [floorSeats]);

  // Fetch data
  useEffect(() => {
    // Function to fetch data from the firebase
    async function fetchData() {
      try {
        setIsLoading(true);

        let floorDetails = {};

        // get from the firebase
        const querySnapshot = await getDocs(collection(db, "floorDetails"));
        querySnapshot.forEach((doc) => {
          floorDetails[doc.id] = doc.data();
        });

        let allRowData = [];

        // get from the firebase
        const queryRowSnapshot = await getDocs(collection(db, "rows"));
        queryRowSnapshot.forEach((doc) => {
          // floorDetails[doc.id] = doc.data();
          allRowData.push(doc.data());
        });

        setFloorDetails(floorDetails);

        setAllSeats(allRowData);

        setIsLoading(false);
      } catch (err) {
        console.log("err::", err);
        setIsError(err?.message || "Something went wrong!!");
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  console.log("here::", floorSeats);

  return (
    <HomeLayout>
      <div className="bg-gray-100 p-4 shadow-md z-10">
        <div className="container m-auto px-2">
          <div className="flex justify-between items-center gap-2">
            <form className="flex gap-4 justify-start items-center ">
              <label
                id="listbox-label"
                className="block text-lg font-medium leading-6 text-gray-900"
              >
                Floor:{" "}
              </label>
              <SelectFloor
                selected={selected}
                setSelected={setSelected}
                floors={floors}
              />
            </form>
            <div className="flex justify-start gap-3 items-center">
              <SearchInput
                setSelected={setSelected}
                allSeats={allSeats}
                floors={floors}
                setSearchedSeat={setSearchedSeat}
              />
              <div className="flex justify-start gap-1 items-center">
                Occupied:{" "}
                <p className="min-w-6 min-h-6 bg-[#499557] rounded-md text-center px-2 py-1 text-white">
                  {" "}
                  {seatCounts?.occupied || 0}{" "}
                </p>
              </div>
              <div className="flex justify-start gap-1 items-center">
                Vacant:{" "}
                <p className="min-w-6 min-h-6 rounded-md bg-slate-200 text-center px-2 py-1">
                  {" "}
                  {seatCounts?.vacant || 0}{" "}
                </p>
              </div>
              <div className="flex justify-start gap-1 items-center">
                Intern:{" "}
                <p className="min-w-6 min-h-6 rounded-md bg-[#c59809] text-center px-2 py-1">
                  {" "}
                  {seatCounts?.intern || 0}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic layout */}
      <div className="p-4 z-1">
        {isLoading && (
          <div className="flex flex-1 justify-center items-center gap-2 text-md">
            <ImSpinner className="animate-spin text-4xl text-[#9c2a5b]" />
            Loading...
          </div>
        )}

        {!isLoading && isError ? (
          <div className="px-4 py-3 rounded-sm relative container m-auto h-full">
            <img
              src={errorImg}
              alt="error-img"
              className="max-w-[600px] m-auto"
            />
            <p className="text-red-500 w-[95%] font-semibold m-auto text-center px-2 py-4 rounded">
              {isError || "Something went Wrong !!"}
            </p>
          </div>
        ) : (
          <DynamicLayout
            data={floorSeats}
            numRows={floorDetails[selected["key"]]?.numRows}
            numCols={floorDetails[selected["key"]]?.numCols}
            setAllSeats={setAllSeats}
            searchedSeat={searchedSeat}
          />
        )}
      </div>
    </HomeLayout>
  );
};

export default HomePage;
