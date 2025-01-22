"use client";

import Link from "next/link";
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {

  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
   const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);
      toast.success("login success");
      router.push("/profile");
      
    } catch (error : any) {
      console.log( "login failed",error.message);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length  > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen py-2">
    //   <h1 className="p-4 font-bold text-2xl">{loading ? "Processing" : "Login"}</h1>
    //   <label htmlFor="email">Email</label>
    //   <input
    //     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
    //   focus:border-gray-600 text-black"
    //     id="email"
    //     type="text"
    //     value={user.email}
    //     onChange={(e) => setUser({ ...user, email: e.target.value })}
    //     placeholder="email"
    //   />
    //   <label htmlFor="password">Password</label>
    //   <input
    //     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
    //   focus:border-gray-600 text-black"
    //     id="password"
    //     type="password"
    //     value={user.password}
    //     onChange={(e) => setUser({ ...user, password: e.target.value })}
    //     placeholder="password"
    //   />
    //   <button
    //     onClick={onLogin}
    //     className="p-2 bg-white border border-gray-300 rounded-lg mb-4 focus:outline-nonefocus:border-gray-600 text-blue-700 font-bold">
    //     {buttonDisabled ? "Can't Login" : "Login"} </button>
    //     <Link href='/signup'>Using app for first time Click to Signup</Link>
    // </div>


    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-8 px-6">
  <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
    {loading ? "Processing..." : "Login"}
  </h1>

  <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl space-y-6">
    <div className="space-y-2">
      <label htmlFor="email" className="text-lg font-semibold text-gray-700">
        Email
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
      />
    </div>

    <div className="space-y-2">
      <label htmlFor="password" className="text-lg font-semibold text-gray-700">
        Password
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
      />
    </div>

    <button
      onClick={onLogin}
      className={`w-full p-3 rounded-lg font-semibold transition duration-300 ${
        buttonDisabled
          ? "bg-gray-400 text-gray-800 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
      disabled={buttonDisabled}
    >
      {buttonDisabled ? "Can't Login" : "Login"}
    </button>

    <p className="text-center text-gray-600 text-sm">
      Using the app for the first time?{" "}
      <Link href="/signup" className="text-blue-600 hover:underline">
        Click to Signup
      </Link>
    </p>
  </div>
</div>

  );
}
