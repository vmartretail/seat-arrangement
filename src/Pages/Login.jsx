import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { Tab } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [isError, setIsError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e) => {
      try {
        e?.preventDefault();
        setIsLoading(true);

        if (index === 0) {
          // Login
          const res = await signInWithEmailAndPassword(auth, email, password);

          if (res) {
            navigate("/");
          }
        } else {
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          if (res) {
            navigate("/");
          }
        }
        setIsLoading(false);
      } catch (error) {
        const errorMessage = error.message;

        setIsError(errorMessage || "Something went wrong!");
        setIsLoading(false);
      }
    },
    [email, password, index, navigate]
  );

  const continueWithGoogle = useCallback(
    async (e) => {
      try {
        e.preventDefault();

        const userCred = await signInWithPopup(auth, googleProvider);

        if (userCred) {
          navigate("/");
        }
      } catch (err) {
        console.log("err", err);

        const errorMessage = err.message;

        setIsError(errorMessage || "Something went wrong!");
        setIsLoading(false);
      }
    },
    [navigate]
  );

  return (
    <section className="p-4 flex justify-normal items-center min-h-svh bg-[#fafafa]">
      <div className="min-w-[300px] m-auto bg-white shadow-md py-4 px-10 rounded w-1/2 max-w-[500px]">
        <h1 className="text-2xl text-center mb-2 underline underline-offset-3">
          Seating Arrangement
        </h1>

        {isError && (
          <div className="text-sm text-red-900 bg-red-100 px-4 py-2 rounded-sm relative flex justify-start items-center my-4">
            <RiErrorWarningFill className="mr-2 text-xl" />
            <p className="text-red-900 w-[95%] font-semibold ">{isError}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 mb-4"
        >
          <Tab.Group
            onChange={(index) => {
              setIndex(index);
            }}
          >
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {["Login", "Sing UP"].map((ele) => (
                <Tab
                  key={ele}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white text-blue-700 shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  {ele}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>

          <div className="w-full flex flex-col ">
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              placeholder="you@example.com"
              className="block mt-2 w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col ">
            <label className="text-md" htmlFor="email">
              Password
            </label>
            <input
              name="email"
              placeholder="*****"
              className="block mt-2 w-full rounded-md border-0 py-1.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className=" divide-y divide-y-reverse flex flex-col gap-4 ">
            <button
              type="submit"
              disabled={isLoading}
              className="py-1.5 px-4 flex justify-center items-center gap-2 w-full ring-blue-800 bg-blue-800 text-white rounded-md hover:bg-blue-900 disabled:bg-gray-100"
            >
              Continue
            </button>

            <hr className="" />

            <button
              type="button"
              className="py-1.5 px-4 flex justify-center items-center gap-2 w-full ring-gray-300 ring-1 rounded-md hover:ring-gray-800"
              onClick={continueWithGoogle}
            >
              <FcGoogle /> Continue with Google
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
