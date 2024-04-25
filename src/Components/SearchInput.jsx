import PropTypes from "prop-types";
import { Fragment, useState, useCallback, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const SearchInput = ({ setSelected, allSeats, floors, setSearchedSeat }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback(
    async (e) => {
      try {
        if (e?.floor) {
          let found = floors.find((ele) => ele?.key === e?.floor);

          if (found) {
            setSearchedSeat(e?.seriesNo);
            setSelected(found);
          }
        }
      } catch (error) {
        console.log("err:::", error);
      }
    },
    [floors, setSelected, setSearchedSeat]
  );

  // get all results
  useEffect(() => {
    if (allSeats.length === 0) return;

    setIsLoading(true);
    const docs = allSeats.filter((ele) => ele?.employeeName || ele?.desc);

    setFilteredResults(docs);
    setResults(docs);
    setIsLoading(false);
  }, [allSeats]);

  // filtered results
  useEffect(() => {
    if (query === "") {
      setFilteredResults(results);
    } else {
      const filteredResults = results.filter(
        (result) =>
          result.employeeName.toLowerCase().includes(query.toLowerCase()) ||
          result.desc.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredResults(filteredResults);
    }
  }, [query, results]);

  return (
    <Combobox onChange={handleChange} disabled={allSeats.length === 0} nullable>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            as="input"
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none disabled:bg-gray-200"
            displayValue={(person) => person?.employeeName || ""}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={"Search..."}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {isLoading ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Loading...
              </div>
            ) : filteredResults.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredResults.map((result) => (
                <Combobox.Option
                  key={result.seatId}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={result}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {result?.employeeName} ({result?.floor})
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

SearchInput.propTypes = {
  setSelected: PropTypes.func.isRequired,
  allSeats: PropTypes.array.isRequired,
  floors: PropTypes.array.isRequired,
  setSearchedSeat: PropTypes.func.isRequired,
};

export default SearchInput;
