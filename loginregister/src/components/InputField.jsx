import React from "react";

export function InputField({ label, type, autoComplete, name }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font_medium">
        {label}
      </label>
      <input
        type={type}
        id={name}
        autoComplete={autoComplete}
        {...Register(name)}
        className={`w-full px-3 py-2 border roudend-lg focus:outline-none focus:ring-2`}
      />
    </div>
  );
}
