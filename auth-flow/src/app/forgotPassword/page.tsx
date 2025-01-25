"use client";

import React, { useState } from "react";
import axios,{ AxiosError} from "axios";
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Forgot Password</h1>
      <form className="flex flex-col space-y-4 w-80" onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 border border-gray-800 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}