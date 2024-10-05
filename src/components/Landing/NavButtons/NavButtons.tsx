import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './PrimaryNavButton.View';
import SecondaryButton from './SecundaryNavButton.View';


interface ButtonLogicProps {
    showPrimary?: boolean; 
    showSecondary?: boolean; 
  }
  
  const ButtonLogic: React.FC<ButtonLogicProps> = ({ showPrimary = true, showSecondary = true }) => {
    const navigate = useNavigate();
  
    const handlePrimaryClick = () => {
      navigate('/login');
    };
  
    const handleSecondaryClick = () => {
      navigate('/signup');
    };
  
    return (
      <div>
        {showPrimary && (
          <PrimaryButton label="LOGIN" onClick={handlePrimaryClick} />
        )}
        {showSecondary && (
          <SecondaryButton label="SIGN UP" onClick={handleSecondaryClick} />
        )}
      </div>
    );
  };
  
  export default ButtonLogic;