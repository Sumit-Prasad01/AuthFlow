"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen py-2">
    //   <h1 className="text-4xl font-extrabold m-4">Verify Email</h1>
    //   <h2 className="bg-green-700 text-white font-bold m-2 p-2 rounded-md">
    //     {token ? `${token}` : "No Token"}
    //   </h2>

    //   {verified && (
    //     <div>
    //       <h2 className="text-2xl text-green-500 font-bold">Email Verified</h2>
    //       <Link href="/login">Login</Link>
    //     </div>
    //   )}
    //   {error && (
    //     <div>
    //       <h2 className="text-2xl bg-red-500 text-black">Error</h2>
    //     </div>
    //   )}
    // </div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-8">
      <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        Verify Email
      </h1>
      <h2 className="bg-indigo-800 text-white text-xl font-semibold py-3 px-6 rounded-full shadow-lg mb-4">
        {token ? `${token}` : "No Token"}
      </h2>

      {verified && (
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center text-green-100 mb-4">
            Email Verified
          </h2>
          <Link href="/login">
            <a className="block text-center text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-8 rounded-lg transition duration-300">
              Go to Login
            </a>
          </Link>
        </div>
      )}

      {error && (
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-xl mt-6">
          <h2 className="text-3xl font-bold text-center">Error</h2>
          <p className="mt-2 text-center text-lg">
            Something went wrong. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}
