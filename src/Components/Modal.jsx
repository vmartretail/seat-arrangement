import { useState } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback } from "react";
import { IoIosClose } from "react-icons/io";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const Modal = ({ isOpen, setIsOpen, data, setAllSeats }) => {
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onSubmit = useCallback(
    async (e) => {
      try {
        setIsLoading(true);
        e.preventDefault();

        // Access the form element directly
        const formElement = e.target;

        // Create FormData using the form element
        let formData = new FormData(formElement);

        // Convert FormData to an object
        const formDataObject = {};
        formData.forEach((value, key) => {
          formDataObject[key] = value;
        });

        if (String(formDataObject["userName"] || "")?.trim() === "")
          throw new Error("Please Fill the employee name.");

        const docId = `${
          data["docId"] || `${data["floor"]}_${data["seriesNo"]}`
        }`;

        await updateDoc(doc(db, "rows", docId), {
          ...data,
          isSelected: true,
          employeeName: formDataObject["userName"],
          desc: formDataObject["desc"] || "",
        });

        setAllSeats((prev) =>
          prev.map((ele) =>
            ele?.seatId === data?.seatId
              ? {
                  ...ele,
                  isSelected: true,
                  employeeName: formDataObject["userName"],
                  desc: formDataObject["desc"] || "",
                }
              : ele
          )
        );

        closeModal();
        setIsLoading(false);
      } catch (err) {
        setIsError(
          err?.message ||
            "An error occurred while processing your request. Please try again later."
        );
        setIsLoading(false);
        console.log("err::", err);
      }
    },
    [closeModal, setAllSeats, data]
  );

  const onRemove = useCallback(
    async (e) => {
      try {
        setIsLoading(true);
        e.preventDefault();

        const docId = `${
          data["docId"] || `${data["floor"]}_${data["seriesNo"]}`
        }`;

        await updateDoc(doc(db, "rows", docId), {
          ...data,
          isSelected: false,
          employeeName: null,
        });

        setAllSeats((prev) =>
          prev.map((ele) =>
            ele?.seatId === data?.seatId
              ? { ...ele, isSelected: false, employeeName: "", desc: "" }
              : ele
          )
        );

        closeModal();
        setIsLoading(false);
      } catch (err) {
        setIsError(
          err?.message || "Something went wrong on removing the employee."
        );
        setIsLoading(false);
      }
    },
    [closeModal, data, setAllSeats]
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Seat detail of{" "}
                  {data?.seatId && <strong>{data?.seatId}</strong>}
                </Dialog.Title>
                <form className="mt-2" onSubmit={onSubmit}>
                  {isError && (
                    <div className="text-sm bg-red-100 px-4 py-2 rounded-sm relative">
                      <p className="text-red-900 w-[95%] font-semibold">
                        {isError}
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsError()}
                        className="text-sm absolute top-1/2 right-2 transform -translate-y-1/2"
                      >
                        <IoIosClose className="text-red-900 text-xl" />
                      </button>
                    </div>
                  )}

                  <div className="mt-2">
                    <div className="w-full my-2">
                      <label className="text-sm" htmlFor="userName">
                        Employee Name
                      </label>
                      <input
                        type={"text"}
                        className="block mt-2 w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                        name="userName"
                        placeholder="John Doe"
                        id="userName"
                        defaultValue={data?.employeeName || ""}
                        required
                      />
                    </div>

                    <div className="w-full my-2">
                      <label className="text-sm" htmlFor="desc">
                        Employee Description
                      </label>
                      <textarea
                        className="block mt-2 w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                        name="desc"
                        placeholder="Anything about employee..."
                        id="desc"
                        defaultValue={data?.desc || ""}
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center gap-2">
                    <div className="flex justify-between items-center gap-2">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        disabled={isLoading}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={onRemove}
                        disabled={isLoading}
                      >
                        Remove
                      </button>
                    </div>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setAllSeats: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default Modal;
