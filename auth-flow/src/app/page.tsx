import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to My App</h1>
        <p className="text-lg mb-6">A place where you can connect, learn, and grow!</p>

        <div className="flex justify-center gap-6">
          <Link href="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
