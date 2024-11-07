import "./Filter.css";
import React, { useState } from "react";

interface FilterProp {
    filterType: string;
    onFilterSelect: (type: string) => void; 
}

const Filters: React.FC<FilterProp> = ({  onFilterSelect }) => {
    const categories = ["Halloween", "Birthday", "Wedding", "Baby Shower", "Christmas", "Other"];
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

    const handleFilterSelect = (category: string) => {
        setActiveCategory(category); 
        onFilterSelect(category); 
        setIsDropdownVisible(false); 
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className="filters">
            <div onClick={toggleDropdown} className="filters-toggle">
                <p>Filters by ∨</p>
            </div>
            <div className={`CardsFilters ${isDropdownVisible ? 'visible' : ''}`}>
                {categories.map((category) => (
                    <button 
                        className={`filterbtn ${activeCategory === category ? 'active' : ''}`} 
                        key={category} 
                        onClick={() => handleFilterSelect(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filters;