import { useState } from "react";
const cityList = ["Los Angeles", "New York", "Las Vegas", "Houston", "Austin"];
const GradientReact = () => {
  const [openDropdown, setopenDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validEmail, setValidEmail] = useState();
  const [validName, setValidName] = useState();
  const [validPassword, setValidPassword] = useState();
  const [validcity, setValidcity] = useState();
  const [validLanguage, setValidlanguage] = useState();
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    react: false,
    next: false,
    vue: false,
  });
  const chnageFromData = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };
  const selectCity = (value) => {
    setopenDropdown(!openDropdown);
    setFromData({ ...formData, city: value });
  };
  const selectLanguage = (data) => {
    const check = formData?.language?.includes(data);
    if (!check) {
      const checkedList =
        formData?.language?.length > 0 ? [...formData?.language, data] : [data];
      setFromData({ ...formData, language: checkedList, [data]: true });
    } else {
      const checkedList = formData?.language?.filter((datas) => datas !== data);
      setFromData({ ...formData, language: checkedList, [data]: false });
    }
  };
  const submitForm = () => {
    const whiteSpace = /^[a-zA-Z]/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      formData?.name == "" ||
      formData?.email == "" ||
      formData?.password == "" ||
      formData?.name?.length < 3 ||
      formData?.password?.length < 3 ||
      !formData?.language ||
      formData?.language?.length == 0 ||
      !formData?.city ||
      !formData?.email?.match(emailRegex) ||
      !whiteSpace?.test(formData?.name)
    ) {
      !formData?.name
        ? setValidName("First Name is required")
        : !whiteSpace?.test(formData?.name)
        ? setValidName("First Name starts with a letter [a-zA-z]")
        : formData?.name?.length < 3
        ? setValidName("First Name must be 3 characters long")
        : setValidName("");
      !formData?.password
        ? setValidPassword("Password is required")
        : formData?.password?.length < 3
        ? setValidPassword("Password must be 3 characters long")
        : setValidPassword("");
      !formData?.email
        ? setValidEmail("Email is required")
        : !formData?.email?.match(emailRegex)
        ? setValidEmail("Please enter valid email")
        : setValidEmail("");
      !formData?.city ? setValidcity("City is required") : setValidcity("");
      !formData?.language || formData?.language?.length == 0
        ? setValidlanguage("Please select at least one programming language")
        : setValidlanguage("");
    } else {
      setFromData({
        name: "",
        password: "",
        email: "",
        language: [],
        city: "",
        next: false,
        react: false,
        vue: false,
      });
      setValidlanguage("");
      setValidName("");
      setValidPassword("");
      setValidEmail("");
      setValidcity("");
      alert(
        "Thank you!\nThanks for signing up. Welcome to our community. We are happy to have you on board."
      );
    }
  };
  return (
    <div className="flex flex-col min-h-screen py-5 lg:py-14 justify-center gap-9 bg-gray-400 relative px-5">
      <div className="max-w-4xl flex justify-center w-full mx-auto overflow-hidden rounded-xl">
        <div className="min-w-[400px] bg-gradient-to-tl from-pink-400 via-red-500 to-yellow-500 px-0.5 lg:flex justify-center items-center hidden p-1">
          <h1 className="text-2xl text-white font-semibold text-center">
            A once in a lifetime experience
          </h1>
        </div>
        <div className="w-full max-w-xl h-full bg-white px-2 mx-auto flex flex-col items-center py-6 rounded-xl lg:rounded-none gap-2">
          <div className="w-full h-full bg-white px-2 mx-auto flex flex-col items-center pt-6 pb-3 gap-4 sm:gap-6">
            <div className="flex justify-start gap-2 ">
              <span className="text-lg lg:text-2xl font-extrabold whitespace-nowrap">
                Create Your Account
              </span>
            </div>
            <div className="sm:h-12 flex flex-col items-start sm:items-center w-full max-w-sm relative">
              {validName && (
                <span className="block sm:absolute text-red-600 -top-6 left-1">
                  {validName}
                </span>
              )}
              <div className="flex items-center justify-center group rounded-lg text-sm font-semibold w-full bg-gradient-to-r from-pink-300 via-red-400 to-yellow-500 focus-within:from-pink-400 focus-within:via-red-500 focus-within:to-yellow-500 p-[3px] focus-within:p-[3px] focus-within:shadow-md">
                <div className="bg-white w-full py-2 px-3 rounded-lg flex justify-between items-center group">
                  <input
                    type="text"
                    className=" w-11/12 h-6 text-black group outline-none placeholder-gray-500"
                    placeholder="Enter Your First Name"
                    onChange={chnageFromData}
                    autoComplete="off"
                    name="name"
                    value={formData?.name}
                  />
                </div>
              </div>
            </div>
            <div className="sm:h-12 flex flex-col items-start sm:items-center w-full max-w-sm relative">
              {validEmail && (
                <span className="block sm:absolute text-red-600 -top-6 left-1">
                  {validEmail}
                </span>
              )}
              <div className="flex items-center justify-center group rounded-lg text-sm font-semibold w-full bg-gradient-to-r from-pink-300 via-red-400 to-yellow-500 focus-within:from-pink-400 focus-within:via-red-500 focus-within:to-yellow-500 p-[3px] focus-within:p-[3px] focus-within:shadow-md">
                <div className="bg-white w-full py-2 px-3 rounded-lg flex justify-between items-center group">
                  <input
                    type="text"
                    className=" w-11/12 h-6 text-black group outline-none placeholder:text-gray-500 placeholder:bg-transparent"
                    placeholder="Enter Your Email"
                    name="email"
                    autoComplete="off"
                    onChange={chnageFromData}
                    value={formData?.email}
                  />
                </div>
              </div>
            </div>
            <div className="sm:h-12 flex flex-col items-start sm:items-center w-full max-w-sm relative">
              {validPassword && (
                <span className="block sm:absolute text-red-600 -top-6 left-1">
                  {validPassword}
                </span>
              )}
              <div className="flex items-center justify-center group rounded-lg text-sm font-semibold w-full bg-gradient-to-r from-pink-300 via-red-400 to-yellow-500 focus-within:from-pink-400 focus-within:via-red-500 focus-within:to-yellow-500 p-[3px] focus-within:p-[3px] focus-within:shadow-md">
                <div className="bg-white w-full py-2 px-3 rounded-lg flex justify-between items-center group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className=" w-11/12 h-6 text-black group outline-none placeholder-gray-500"
                    placeholder="Enter Your Password"
                    onChange={chnageFromData}
                    value={formData?.password}
                    autoComplete="off"
                    name="password"
                  />
                  {showPassword ? (
                    <svg
                      className="w-5 h-5 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div className="relative group z-30 w-full max-w-sm">
              {validcity && (
                <span className="block sm:absolute text-red-600 -top-6 left-1">
                  {validcity}
                </span>
              )}
              <div
                className={`cursor-pointer bg-gradient-to-r flex justify-between font-bold from-pink-400 py-2 via-red-500 to-yellow-500 px-2 text-white ${
                  openDropdown ? "rounded-t-lg" : "delay-1000 rounded-lg"
                }`}
                onClick={() => setopenDropdown(!openDropdown)}
              >
                {formData?.city == "" || !formData?.city
                  ? "Select Your City"
                  : formData?.city}
                <div className="bg-transparent w-6 h-6 rounded-full flex justify-center items-center font-bold">
                  {openDropdown ? "-" : "+"}
                </div>
              </div>
              <ul
                className={`absolute w-full transition-all duration-1000 ease-in bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 max-h-[120px] overflow-hidden overflow-y-scroll rounded-b-lg pb-2 ${
                  openDropdown ? "h-[100px]" : "h-0 !py-0"
                }`}
              >
                {cityList?.map((data, index) => (
                  <li
                    className="bg-transparent border border-transparent border-b-white mt-2 px-2 cursor-pointer hover:font-bold text-white"
                    key={index}
                    onClick={() => selectCity(data)}
                  >
                    {data}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-start max-w-sm w-full relative">
              {validLanguage && (
                <span className="block sm:absolute text-red-600 -top-[22px] left-1">
                  {validLanguage}
                </span>
              )}
              <h1 className="text-xl">Select Programming Language</h1>
              <div className="relative z-10 flex flex-wrap gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className=" flex items-center p-0.5 bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 rounded-md">
                    <input
                      type="checkbox"
                      className="relative w-6 h-6 appearance-none rounded-md cursor-pointer checked:bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-white 
                         before:content-[''] before:absolute before:checked:bg-[url('https://www.tailwindtap.com/assets/components/gradient/check.png')] before:bg-contain before:pointer-events-none before:h-6 before:-left-[1px] before:-top-px before:w-6"
                      onChange={() => selectLanguage("react")}
                      checked={formData?.react}
                    />
                  </div>
                  React Js
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className=" flex items-center p-0.5 bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 rounded-md">
                    <input
                      type="checkbox"
                      className="relative w-6 h-6 appearance-none rounded-md cursor-pointer checked:bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-white 
                         before:content-[''] before:absolute before:checked:bg-[url('https://www.tailwindtap.com/assets/components/gradient/check.png')] before:bg-contain before:pointer-events-none before:h-6 before:-left-[1px] before:-top-px before:w-6"
                      onChange={() => selectLanguage("next")}
                      checked={formData?.next}
                    />
                  </div>
                  Next js
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className=" flex items-center p-0.5 bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 rounded-md">
                    <input
                      type="checkbox"
                      className="relative w-6 h-6 appearance-none rounded-md cursor-pointer checked:bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-white 
                         before:content-[''] before:absolute before:checked:bg-[url('https://www.tailwindtap.com/assets/components/gradient/check.png')] before:bg-contain before:pointer-events-none before:h-6 before:-left-[1px] before:-top-px before:w-6"
                      onChange={() => selectLanguage("vue")}
                      checked={formData?.vue}
                    />
                  </div>
                  Vue Js
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full max-w-sm hover:bg-gradient-to-r group from-pink-400 via-red-500 to-yellow-500 flex justify-center py-2 rounded-lg mt-3 border border-black hover:border-transparent"
              onClick={submitForm}
            >
              <h1 className="text-center text-balck group-hover:text-white font-bold">
                Sign Up
              </h1>
            </button>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-sm items-center">
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-10 bg-[#868686]"></div>
              <h1 className="uppercase font-medium">or</h1>
              <div className="h-0.5 w-10 bg-[#868686]"></div>
            </div>
            <div className="flex flex-col gap-4 w-fit max-w-xs rounded-lg items-center">
              <div className="w-full py-1 flex items-center gap-2 border border-[#868686] rounded-3xl px-4 cursor-pointer hover:shadow-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 48 48"
                  className="h-6 w-h-6"
                >
                  <defs>
                    <path
                      id="a"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    />
                    <clipPath id="b">
                      <use xlinkHref="#a" overflow="visible" />
                    </clipPath>
                  </defs>
                  <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11L17 24z" />
                  <path
                    clipPath="url(#b)"
                    fill="#EA4335"
                    d="M0 11L17 24l7-6.1L48 14V0H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#34A853"
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#4285F4"
                    d="M48 48L17 24l-4-3 35-10z"
                  />
                </svg>
                <h3>Sign Up With Google</h3>
              </div>
              <div className="w-full py-1 flex items-center gap-2 border px-4 border-[#868686] justify-start rounded-3xl cursor-pointer hover:shadow-xl">
                <img
                  src="https://www.tailwindtap.com/assets/components/gradient/facebook.png"
                  className="h-6 w-6"
                />
                <h3>Sign Up With Facebook</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GradientReact;
