import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
