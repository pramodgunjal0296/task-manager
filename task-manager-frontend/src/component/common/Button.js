import React from "react";

const Button = ({
  label,
  onClick,
  color,
  type = "button",
  style = {},
  ...rest
}) => {
  const defaultStyle = {
    padding: "8px 16px",
    backgroundColor: `${color}`,
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    margin: "4px",
    ...style
  };

  return (
    <button type={type} onClick={onClick} style={defaultStyle} {...rest}>
      {label}
    </button>
  );
};

export default Button;
