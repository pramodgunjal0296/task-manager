import React from "react";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  name,
  placeholder,
  style = {},
  options = [],
  ...rest
}) => {
  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    ...style
  };

  return (
    <div style={{ marginBottom: "8px" }}>
      {label &&
        <label style={{ display: "block", marginBottom: "4px" }}>
          {label}
        </label>}
      {type === "select"
        ? <select
            name={name}
            value={value}
            onChange={onChange}
            style={inputStyle}
            {...rest}
          >
            {options.map(opt =>
              <option key={opt.value || opt} value={opt.value || opt}>
                {opt.label || opt}
              </option>
            )}
          </select>
        : <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={inputStyle}
            {...rest}
          />}
    </div>
  );
};

export default InputField;
