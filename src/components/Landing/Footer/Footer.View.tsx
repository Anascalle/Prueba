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
            <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img5.webp?alt=media&token=f03b06bb-ce17-40e1-a8e2-c015293b6d0c" alt="Footer" className="footer_image" />
            <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img5-mobile.webp?alt=media&token=2bcd393a-69c3-4f56-b41f-2ed5cff88aa3"alt="Footer" className="footer_image_responsive" />
            <div className="footer_green-box"></div>
            </div>
            
        </footer>
    );
};

export default Footer;
