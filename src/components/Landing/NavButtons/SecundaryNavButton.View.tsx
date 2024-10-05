import React from 'react';
import "./NavButtons.css"

interface SecondaryButtonProps {
  label: string;
  onClick: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ label, onClick }) => {
  return (
    <button className="btn_secondary" onClick={onClick}>
      {label}
    </button>
  );
};

export default SecondaryButton;
