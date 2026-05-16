import React, { useEffect, useState } from "react";
import { InputField } from "../components/InputField";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Minimum 6 digits."),
});

export function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });

  const [message, setMessage] = useState("");

  const navegation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const onSubmit = (data) => {
    // Recuperar usuários salvols de localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar se o email já foi registrado
    const exists = users.find(
      (user) => user.email === data.email && user.password === data.password,
    );

    if (exists) {
      // Se já existe, então exibe mensagem de erro.
      setMessage("");
      alert("Sign in successfully");
      navegation("/");
      return;
    } else {
      navegation("/register", { state: { message: "Create an account." } });
    }
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
