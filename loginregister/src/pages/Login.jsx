import React from "react";
import { InputField } from "../components/InputField";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

export function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => {
    console.log(data);
    alert("Sign in successfully");
    reset();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-2xl shadow-md w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <InputField
          label="Email"
          id="email"
          autoComplete="email"
          name="email"
          register={register}
          error={errors.email}
        />
        <InputField
          label="Password"
          id="password"
          autoComplete="current-password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition "
        >
          sign in
        </button>
        <p className="mt-4 text-center text-sm">
          Não possui conta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Registre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
