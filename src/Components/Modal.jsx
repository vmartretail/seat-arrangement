import { useState } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback } from "react";
import { IoIosClose } from "react-icons/io";

const Modal = ({ isOpen, setIsOpen, data }) => {
  const [isError, setIsError] = useState("");
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onSubmit = useCallback((e) => {
    try {
      e.preventDefault();
      console.log("here");
    } catch (err) {
      setIsError(err?.message || "Something went wrong! please try again!");
      console.log("err::", err);
    }
  }, []);

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
                  User Detail
                </Dialog.Title>
                <form className="mt-2" onSubmit={onSubmit}>
                  {isError && (
                    <div className="text-sm bg-red-100 px-4 py-2 rounded-sm relative">
                      <p className="text-red-900 w-[95%] font-semibold">
                        Error
                      </p>
                      <button className="text-sm absolute top-1/2 right-2 transform -translate-y-1/2">
                        <IoIosClose className="text-red-900 text-xl" />
                      </button>
                    </div>
                  )}

                  <div className="mt-2">
                    <div className="w-full my-2">
                      <label className="text-sm" htmlFor="userName">
                        User Name
                      </label>
                      <input
                        type={"text"}
                        className="block mt-2 w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                        name="userName"
                        placeholder="Employee Name"
                        id="userName"
                        defaultValue={data?.employeeName || ""}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center gap-2">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Remove
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
  data: PropTypes.object.isRequired,
};

export default Modal;
