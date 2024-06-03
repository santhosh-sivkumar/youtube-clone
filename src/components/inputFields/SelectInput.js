import React from "react";

const SelectInput = ({ name, value, onChange, error, label, options }) => {
  return (
    <div className="form-group">
      <label className="block my-2 text-yt-blue">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`border rounded-md bg-[#282828] text-sm font-normal text-yt-white p-2 w-full ${
          error ? "border-yt-red" : ""
        }`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
