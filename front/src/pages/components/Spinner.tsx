import React from "react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-16 h-16">
        <div className="animate-spin ease-linear rounded-full border-t-4 border-purple-500 border-solid border-4 border-opacity-50"></div>
      </div>
    </div>
  );
}
