import React from "react";

const TextInput = ({
  name,
  value,
  onChange,
  error,
  label,
  placeholder,
  disabled,
}) => {
  return (
    <div className="form-group">
      <label className="block my-2 text-yt-blue">
        {label}
        <input
          type="text"
          disabled={disabled}
          name={name}
          value={value}
          onChange={onChange}
          className={`border rounded-md bg-[#282828] font-normal text-sm text-yt-white mt-1 p-2 w-full 
          ${error ? "border-yt-red" : ""}
          ${disabled ? "bg-[#284a78] cursor-not-allowed" : ""}`}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default TextInput;
