import Head from "next/head";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Course Files - Forgot Password",
};

const ForgotPassword = () => {
  return (
    <>
      <Head>
        <title>Course Files - Forgot Password</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Forgot Password? 🔒</h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter your email and we’ll send you instructions to reset your password.
            </p>
          </div>

          <form className="space-y-4">
            <div className="text-left">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                autoFocus
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Send Reset Link
            </button>
          </form>

          <div className="text-center mt-4">
            <Link href="/login" className="text-blue-600 hover:underline text-sm">
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
