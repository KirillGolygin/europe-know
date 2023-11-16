import React from "react";
import "./Popup.scss";

interface PopUpProps {
  children: React.ReactNode;
}

const Popup = ({ children }: PopUpProps) => {
  return <div className="popup">{children}</div>;
};

export default Popup;
