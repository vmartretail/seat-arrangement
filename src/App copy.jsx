import { useState, useEffect } from "react";
import DynamicLayout from "./Components/DynamicLayout";
import SelectFloor from "./Components/SelectFloor";
import HomeLayout from "./Layout/HomeLayout";
import { ImSpinner } from "react-icons/im";
import { db } from "./services/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db1 } from "./services/newFirebase";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState({
    id: 1,
    name: "Under Ground Floor",
    key: "UG",
  });
  const [isError, setIsError] = useState("");

  const [allSeats, setAllSeats] = useState([]);
  const [floorDetails, setFloorDetails] = useState({});

  // Fetch data
  useEffect(() => {
    // Function to fetch data from the firebase
    async function fetchData() {
      try {
        setIsLoading(true);

        let floorDetails = {};

        // get from the firebase
        const querySnapshot = await getDocs(collection(db, "floorDetails"));
        try {
          await Promise.all(
            querySnapshot.docs.map(async (firestoreDoc) => {
              floorDetails[firestoreDoc.id] = firestoreDoc.data();
              await setDoc(
                doc(db1, "floorDetails", firestoreDoc.id),
                firestoreDoc.data() // Passing data separately
              );
              console.log("floorDetails:::", firestoreDoc.id);
            })
          );
        } catch (error) {
          console.error("Error occurred:", error);
        }

        let allRowData = [];

        let count = 0;
        const queryRowSnapshot = await getDocs(collection(db, "rows"));
        try {
          await Promise.all(
            queryRowSnapshot.docs.map(async (firestoreDoc) => {
              floorDetails[firestoreDoc.id] = firestoreDoc.data();
              await setDoc(
                doc(db1, "floorDetails", firestoreDoc.id),
                firestoreDoc.data()
              );
              count++;
              console.log("floorDetails:::", firestoreDoc.id);
            })
          );
        } catch (error) {
          console.error("Error occurred:", error);
        }

        console.log("row Count:::", count);
        // get from the firebase
        // const queryRowSnapshot = await getDocs(collection(db, "rows"));
        // queryRowSnapshot.forEach((doc) => {
        //   // floorDetails[doc.id] = doc.data();
        //   allRowData.push(doc.data());

        // });

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
                <p className="min-w-6 min-h-6 bg-[#499557] rounded-md"> </p>
              </div>
              <div className="flex justify-start gap-1 items-center">
                vacant:{" "}
                <p className="min-w-6 min-h-6 rounded-md bg-slate-200"> </p>
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
      ) : isError ? (
        <div className="text-sm bg-red-100 px-4 py-2 rounded-sm relative">
          <p className="text-red-900 w-[95%] font-semibold">
            {isError || "Something went Wrong !!"}
          </p>
        </div>
      ) : (
        <DynamicLayout
          data={allSeats
            .filter((ele) => ele?.floor === selected["key"])
            .sort((a, b) => a?.seriesNo - b?.seriesNo)}
          numRows={floorDetails[selected["key"]]?.numRows}
          numCols={floorDetails[selected["key"]]?.numCols}
          setAllSeats={setAllSeats}
        />
      )}
    </HomeLayout>
  );
};

export default App;