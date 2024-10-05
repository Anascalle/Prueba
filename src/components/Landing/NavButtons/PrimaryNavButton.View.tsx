import React from 'react';
import "./NavButtons.css"

interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onClick }) => {
  return (
    <button className="btn_primary" onClick={onClick}>
      {label}
    </button>
  );
};

export default PrimaryButton;
