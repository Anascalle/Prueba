import React from "react";
import "./Section.css";

interface SectionProps {
    texts: string[];
    colors?: string[];
    fontWeights?: ("thin" | "normal" | "semi-bold" | "bold")[];
    imageUrl?: string;
    imageAlt?: string;
    customClass?: string; 
}

const Section: React.FC<SectionProps> = ({
    texts,
    colors = [],
    fontWeights = [],
    imageUrl,
    imageAlt = texts.join(" "),
    customClass = "" 
}) => {
    return (
        <div className={`section_containers ${customClass}`} >
            <div className="text_containers">
                <h1 className="titless">
                    {texts.map((text, index) => (
                        <span
                            key={index}
                            className="text_items"
                            style={{
                                color: colors[index] || "#0E0D35",
                                fontWeight: fontWeights[index] || "normal",
                            }}
                        >
                            {text}
                            
                       {text === "you" && <br />}
                      
                        </span>
                    ))}
                </h1>
            </div>
            <div className="image_containers">
                <img src={imageUrl} alt={imageAlt} />
            </div>
        </div>
    );
};

export default Section;



























// interface SectionProps {
//     text1: string; 
//     text2: string; 
//     text3: string; 
//     text4?: string;
//     text5?: string; 
//     text6?: string;
//     color1?: string; 
//     color2?: string; 
//     color3?: string; 
//     color4?: string; 
//     color5?: string; 
//     imageUrl: string; 
//     imageAlt?: string; 
//     alignment?: "left" | "center" | "right";
//   }
  
//   const Section: React.FC<SectionProps> = ({
//     text1,
//     text2,
//     text3,
//     text4,
//     text5,
//     text6,
//     color1 = "#00B78C",
//     color2 = "#FFAA00",
//     color3 = "#F24B4B",
//     color4 = "#FFFFFF",
//     color5 = "#0E0D35",
//     imageUrl,
//     imageAlt = `${text1} ${text2} ${text3}`,
//     alignment = "left", 
//   }) => {
//     return (
//       <div style={{ textAlign: alignment }}>
//         <h1>
//           <span style={{ color: color1, fontSize: "2rem" }}>{text1}</span>{" "}
//           <span style={{ fontWeight: "300", fontSize: "2rem" }}>{text2}</span>{" "}
//           <span style={{ color: color2, fontSize: "2rem" }}>{text3}</span>{" "} 
//           <span style={{ color: color5, fontSize: "2rem" }}>{text4}</span> {}

//         </h1>
//         <img src={imageUrl} alt={imageAlt} />
//       </div>
//     );
//   };
  
//   export default Section;
