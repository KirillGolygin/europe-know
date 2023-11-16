import React from "react";
import "./FormWrap.scss";

interface FormProps {
  children: React.ReactNode;
}

const FormWrap = ({ children }: FormProps) => {
  return <div className="form-container">{children}</div>;
};

export default FormWrap;
