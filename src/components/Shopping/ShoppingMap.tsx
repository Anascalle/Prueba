import React from 'react';
import { useParams } from 'react-router-dom';
import "./shoppingMap.css";
import Consumption from "./Consumption/Consumption.view";
import useShoppingItems from '../../hooks/useShoppingItem';
import { useConsumption } from "../../hooks/useConsumption";
import Filters from "./Filters/Filter.view";
import ShoppingCard from './ShoppingCard/ShoppingCard.view';
import Nav3 from '../DetailEvent/Nav/Nav.view';
import BackBtnEvents from './BackBtnEvents/CackBtn.view';

const ShoopingMap: React.FC = () => {
    const { id: eventId } = useParams<{ id: string }>(); // Captura el eventId de la URL
    const { filteredItems, filterType, setFilterType } = useShoppingItems();
    const { consumption, addToConsumption, removeFromConsumption, getTotal, processPurchase } = useConsumption();

    return (
        <div>
            <div>
                <Nav3></Nav3>
                <BackBtnEvents></BackBtnEvents>
            </div>
            <div className="receipt-section">
                <div className='cards-secction'>
                    <Filters filterType={filterType} onFilterSelect={setFilterType} />
                    <div className="grid-card">
                        {filteredItems.map((item) => (
                            <ShoppingCard
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                disponibility={item.disponibility}
                                addToConsumption={addToConsumption}
                            />
                        ))}
                    </div>
                </div>
                <div className='consumption-section'>
                <Consumption
                    items={consumption}
                    total={getTotal()}
                    onRemoveItem={removeFromConsumption}
                    onBuyAll={() => processPurchase(eventId?? "")} 
                />
                </div>
            </div>
        </div>
    );
};

export default ShoopingMap;
