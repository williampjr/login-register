import React from "react";
import { InputField } from "../components/InputField";
import { Link } from "react-router";

export function Register() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>
        <InputField
          label="Name"
          id="name"
          autoComplete="name"
          type="text"
          name="username"
          register={() => {}}
        />
        <InputField
          label="Email"
          id="email"
          autoComplete="email"
          name="email"
          register={() => {}}
        />
        <InputField
          label="Password"
          id="password"
          autoComplete="new-password"
          name="password"
          type="password"
          register={() => {}}
        />
        <InputField
          label="Confirm password"
          id="confirmPassword"
          autoComplete="new-password"
          name="confirmPassword"
          type="password"
          register={() => {}}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition "
        >
          sign in
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
