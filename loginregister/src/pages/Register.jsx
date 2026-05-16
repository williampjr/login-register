import React, { useEffect, useState } from "react";
import { InputField } from "../components/InputField";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Name is required."),
  email: yup.string().email().required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Minimum 6 digits."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password is diferent.")
    .required("Confirmation password is required."),
});

export function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
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
    const exists = users.find((user) => user.email === data.email);

    if (exists) {
      // Se já existe, então exibe mensagem de erro.
      setMessage("Email already exists.");
      return;
    }
    // Adicionar novo usuário
    users.push({ name: data.name, email: data.email, password: data.password });

    // Salvar lista atualizada em localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Redirecionar para login
    navegation("/login");
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-2xl shadow-md w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>

        {message && <p className="text-red-500">{message}</p>}

        <InputField
          label="Name"
          id="name"
          autoComplete="name"
          type="text"
          name="name"
          register={register}
          error={errors.name}
        />
        <InputField
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          name="email"
          register={register}
          error={errors.email}
        />
        <InputField
          label="Password"
          id="password"
          autoComplete="new-password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
        />
        <InputField
          label="Confirm password"
          id="confirmPassword"
          autoComplete="new-password"
          name="confirmPassword"
          type="password"
          register={register}
          error={errors.confirmPassword}
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
