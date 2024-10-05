
import React, { useState, useEffect } from "react";
import Section from "../Section/Section.View";
import BenefitsSection from "../BenefitSection/BenefitSection.View";
import FinalSection from "../FinalSection/FinalSection.View";

const SectionGroup: React.FC =() =>{
  const [imageUrls, setImageUrls] = useState({
    section1: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/Img1.webp?alt=media&token=cb253353-56ac-409b-ad73-3a69b97feb7c",
    section3: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img3.webp?alt=media&token=19bdfe9c-a9e5-41ba-a61c-fa29cf27dfd8",
  });

  const updateImageUrls = () => {
    const isMobile = window.innerWidth <= 375;
    if (isMobile) {
      setImageUrls({
        section1: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img1-mobile.webp?alt=media&token=5398f96c-8d62-4351-86ec-8f86db52f156",
        section3: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img3-mobile.webp?alt=media&token=76678f82-ada1-46a6-a656-159b6dd33d76",
      });
    } else {
      setImageUrls({
        section1: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/Img1.webp?alt=media&token=cb253353-56ac-409b-ad73-3a69b97feb7c",
        section3: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img3.webp?alt=media&token=19bdfe9c-a9e5-41ba-a61c-fa29cf27dfd8",
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
          imageUrl="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img2.webp?alt=media&token=ea72f734-42ec-4624-b6be-1ef2eb49f2b1"
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