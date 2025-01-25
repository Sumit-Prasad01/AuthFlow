"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("/api/users/forgotpassword", { email });
      setMessage(response.data.message);
      setEmail("");
      toast.success("Password reset link sent to your email");
    } catch (err: unknown) {
      // setError(err.response?.data?.error || "Something went wrong");
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 py-8 px-4">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">
        Forgot Password
      </h1>
      <form
        className="flex flex-col space-y-6 w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
        onSubmit={handleForgotPassword}
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
        >
          Submit
        </button>
      </form>
      {message && <p className="text-green-500 mt-4 text-lg">{message}</p>}
      {error && <p className="text-red-500 mt-4 text-lg">{error}</p>}
    </div>
  );
}
