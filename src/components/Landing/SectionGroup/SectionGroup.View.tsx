
import React, { useState, useEffect } from "react";
import Section from "../Section/Section.View";
import BenefitsSection from "../BenefitSection/BenefitSection.View";
import FinalSection from "../FinalSection/FinalSection.View";

const SectionGroup: React.FC =() =>{
  const [imageUrls, setImageUrls] = useState({
    section1: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2FImg1%20section.webp?alt=media&token=33e36a3a-7fce-4dcd-b840-487944f215e1",
    section3: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2Fimg%20seccion3.webp?alt=media&token=52e6830d-1b95-484a-93fa-72f3ad8ee98d",
  });

  const updateImageUrls = () => {
    const isMobile = window.innerWidth <= 375;
    if (isMobile) {
      setImageUrls({
        section1: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2Fimg%20seccion1-mobile.webp?alt=media&token=f9e71a0f-63f6-48d0-8c02-c27a19cdc419",
        section3: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2Fimg%20seccion3-mobile.webp?alt=media&token=a1c635fd-5da7-4b1e-a132-cd8f92f2e13d",
      });
    } else {
      setImageUrls({
        section1: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2FImg1%20section.webp?alt=media&token=33e36a3a-7fce-4dcd-b840-487944f215e1",
        section3: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2Fimg%20seccion3.webp?alt=media&token=52e6830d-1b95-484a-93fa-72f3ad8ee98d",
      });
    }
  };

   useEffect(() => {
    updateImageUrls();
    window.addEventListener("resize", updateImageUrls);

    
    return () => {
      window.removeEventListener("resize", updateImageUrls);
    };
  }, []);


    return(
        <div>
        <Section
        texts={["Send", "and", "receive", "invitations"]} 
        fontWeights={["semi-bold", "normal", "semi-bold", "bold"]} 
        imageUrl={imageUrls.section1}
        colors={["#00B78C", "#0E0D35",  "#FFAA00", "#0E0D35"]}
         customClass="first_sections"
       
      />
     <BenefitsSection/>
      <Section
        texts={["Choose", "the", "best", "day", "and", "location"]} 
        fontWeights={["semi-bold", "normal", "semi-bold", "semi-bold", "normal", "semi-bold"]} 
          imageUrl="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2Fimg%20seccion2.webp?alt=media&token=b2b51c8c-9ef8-4a0a-89bc-9a5b6e04d04f"
        colors={["#FFFF", "#FFFF",  "#0E0D35", "#0E0D35","#FFFF"]}
        customClass="second_sections"
      />
       <Section
        texts={["All", "what", "you", "need", "in", "the", "same", "place"]} 
        fontWeights={["semi-bold", "normal", "semi-bold", "semi-bold", "normal", "normal", "semi-bold", "semi-bold"]} 
        imageUrl={imageUrls.section3}
        colors={["#F24B4B", "#0E0D35", "#FFAA00", "#0E0D35", "#0E0D35", "#0E0D35", "#00B78C", "#00B78C"]} 
        customClass="third_sections"
        />
        
        <FinalSection/>
        </div>
        

    );
};

export default SectionGroup