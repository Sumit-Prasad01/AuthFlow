"use client";

import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import {useRouter} from "next/navigation";
import  axios  from "axios";
import  { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      // console.log("Signup success", response.data);
      router.push("/login");
    } catch (error : any) {
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen py-2">
    //   <h1>{loading ? "Processing" : "Signup"}</h1>
    //   <label htmlFor="username">Username</label>
    //   <input
    //     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
    //   focus:border-gray-600 text-black"
    //     id="username"
    //     type="text"
    //     value={user.username}
    //     onChange={(e) => setUser({ ...user, username: e.target.value })}
    //     placeholder="username"
    //   />
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
    //     onClick={onSignup}
    //     className="p-2 bg-white border border-gray-300 rounded-lg mb-4 focus:outline-nonefocus:border-gray-600 text-blue-700 font-bold"
    //   >
    //     {buttonDisabled ? "Can't Signup" : "Signup"}
    //   </button>
    //   <Link href="/login">Already Signed Up visit login page.</Link>
    // </div>



    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 py-8 px-4">
  <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
    {loading ? "Processing..." : "Signup"}
  </h1>

  <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl space-y-6">
    <div className="space-y-2">
      <label htmlFor="username" className="text-lg font-semibold text-gray-700">
        Username
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter your username"
      />
    </div>

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
      onClick={onSignup}
      className={`w-full p-3 rounded-lg font-semibold transition duration-300 ${
        buttonDisabled
          ? "bg-gray-400 text-gray-800 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
      disabled={buttonDisabled}
    >
      {buttonDisabled ? "Can't Signup" : "Signup"}
    </button>

    <p className="text-center text-gray-600 text-sm">
      Already signed up?{" "}
      <Link href="/login" className="text-blue-600 hover:underline">
        Visit login page
      </Link>
    </p>
  </div>
</div>

  );
}


