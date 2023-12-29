import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signN from "../assets/auth/signin.jpg";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormdData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormdData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <section className="flex items-center justify-center space-x-1 lg:space-x-40 max-w-6xl mx-auto">
      {/* left img */}
      <div className=" hidden lg:flex shrink-0">
        <img src={signN} alt="img" className="w-[500px] h-[420px] mt-9" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-[#F0FDF4] border-[3px] mt-9 w-[350px] md:w-[450px] lg:w-[500px] h-[480px] rounded-[0.6rem] shadow-lg">
          <div className=" font-bold text-white text-[25px]  bg-[#ed5012] rounded-[0.4rem]  h-[48px] ">
            <p className="mx-4 p-1 font-bold text-[25px]">Sign In</p>
          </div>

          <div className=" mx-4 my-6">
            <span className="text-[16px] cursor-default font-semibold">
              Email or Mobile phone Number
            </span>
            <input
              className="w-[400px] lg:w-[430px] mt-2 px-4 py-2 text-xl text-gray-800 bg-white border-[1px] border-gray-400 rounded transition ease-out"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>

          <div className=" mx-4 my-3">
            <span className="text-[16px] cursor-default font-semibold">
              Password
            </span>
            <input
              className="w-[400px] lg:w-[430px] mt-2 px-4 py-2 text-xl text-gray-800 border-[1px] bg-white border-gray-400 rounded transition ease-out"
              type="password"
              id="password"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between px-4 mt-14 lg:text-[15px]  text-[13px] ">
            <p>
              Don't Have an Account?
              <Link
                to="/sign-up"
                className="text-red-600 font-medium hover:text-red-700 transition duration-200 ease-in-out"
              >
                sign Up
              </Link>
            </p>

            <p>
              <Link
                to="/"
                className="text-blue-500 font-medium hover:text-blue-600"
              >
                Forgot password?
              </Link>
            </p>
          </div>

          <div className="flex justify-center flex-wrap">
            <button
              disabled={loading}
              className="w-[420px] lg:w-[440px] text-white font-medium text-sm bg-blue-600 px-7 py-2 mt-4 rounded-sm shadow-sm hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 uppercase
        "
              type="submit"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            <div
              className="flex items-center  my-3 before:border-t  before:flex-1 before:border-gray-300 
          after:border-t  after:flex-1 after:border-gray-300 "
            >
              {/* <p className="text-center font-semibold mx-4 ">OR</p> */}
            </div>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </form>
    </section>
  );
}
