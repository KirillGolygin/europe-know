import React from "react";

import "./Popup.scss";

interface PopUpProps {
  children: React.ReactNode;
  closePopup: () => void;
}

const Popup = ({ children, closePopup }: PopUpProps) => {
  return (
    <div onClick={closePopup} className="popup" data-testid="popup">
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
        data-testid="popup-content"
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
