import React from "react";

const Button = React.memo((props) => {
  const { type = "button", handler, className = "", children } = props;
  return (
    <button className={`button ${className}`} type={type} onClick={handler}>
      {children}
    </button>
  );
});

export { Button };