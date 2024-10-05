import React from 'react';
import Nav1 from '../../components/Landing/NavBarLanding/NavBarLanding.View';
import SectionGroup from '../../components/Landing/SectionGroup/SectionGroup.View';
import Footer from '../../components/Landing/Footer/Footer.View';
import CarouselBanner from '../../components/Landing/Carrusel/Carusel';
const LandingScreen: React.FC = () => {
  return (
    <div className="landing-screen">
        <Nav1></Nav1>
        <CarouselBanner></CarouselBanner>
         <SectionGroup></SectionGroup>
         <Footer></Footer>
        
      
      </div>
   
  );
};

export default LandingScreen;
