
import "./BenefitSection.css"

const benefits = [
    { text: "Our benefits", backgroundColor: "#F24B4B" },
    { text: "Our benefits", backgroundColor: "#FFAA00" },
    { text: "Our benefits", backgroundColor: "#00B78C" },
  ];
  
  const BenefitsSection = () => {
    return (
        <div className="benefits_container">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="benefit_item"
            style={{ backgroundColor: benefit.backgroundColor }}
          >
            <h1>{benefit.text}</h1>
          </div>
        ))}
      </div>
    );
  };
  export default BenefitsSection;
  