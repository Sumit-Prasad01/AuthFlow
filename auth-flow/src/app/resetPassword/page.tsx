"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      setMessage(response.data.message);
      router.push("/login");
      toast.success("Password reset successful");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
          setError(err.response?.data?.error || "Something went wrong");
        } else {
          setError("Something went wrong");
        }

    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-100 to-teal-300 py-8 px-4">
    <h1 className="text-4xl font-semibold text-gray-800 mb-6">Reset Password</h1>
    <form
      className="flex flex-col space-y-6 w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
      onSubmit={handleResetPassword}
    >
      <input
        type="password"
        placeholder="Enter new password"
        className="p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm new password"
        className="p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="p-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-200 transform hover:scale-105"
      >
        Submit
      </button>
    </form>
    {message && <p className="text-green-500 mt-4 text-lg">{message}</p>}
    {error && <p className="text-red-500 mt-4 text-lg">{error}</p>}
  </div>
  
  );
}