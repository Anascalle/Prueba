import React from 'react';
import './Footer.css'; 
import ButtonLogic from '../NavButtons/NavButtons';

const Footer: React.FC = () => {
    return (
        <footer className="footer_container">
            
            <h1 className="footer_titles">
                <span className="footer_words" style={{ color: '#F24B4B' }}>Join</span> 
                <span className="footer_words" style={{ color: '#0E0D35' }}>us</span>
                <span className="footer_words" style={{ color: '#FFAA00' }}>now</span> 
                <span className="footer_words" style={{ color: '#00B78C' }}>!</span>
            </h1>
            <ButtonLogic showPrimary={false} showSecondary={true} />
            <div>
            <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2Fimg%20seccion%205.webp?alt=media&token=7be62c6b-eea9-4be1-9a1b-f9718106fc99" alt="Footer" className="footer_image" />
            <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2Fimg%20seccion5-mobile.webp?alt=media&token=8ddaa2f4-c38a-42a2-a6a3-ffdff08d842e"alt="Footer" className="footer_image_responsive" />
            <div className="footer_green-box"></div>
            </div>
            
        </footer>
    );
};

export default Footer;
