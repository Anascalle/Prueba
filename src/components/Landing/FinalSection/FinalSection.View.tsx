import React from 'react';
import './FinalSection.css'; 

const FinalSection: React.FC = () => {
    return (
        <div className='final_section'>
            <h1 className="section_title">
                <span className="final_word" style={{ color: '#FFAA00' }}>Share </span>
                <span className="final_word" style={{ color: '#0E0D35'}}>a </span>
                <span className="final_word" style={{ color: '#00B78C' }}>group fund</span>
                <br className='normal'/>
                <span className="final_word" style={{ color: '#0E0D35', fontWeight:"normal"  }}> with other</span>
                <span className="final_word" style={{ color: '#F24B4B' }}> guests</span>
            </h1>
        </div>
    );
};

export default FinalSection;
