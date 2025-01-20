"use client";

import React, {useState} from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState('nothing');  

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("User logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="m-4 p-2 rounded bg-white text-slate-900 ">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-4 rounded-lg"
      >
        Get user details
      </button>
      
    </div>
  );
}
