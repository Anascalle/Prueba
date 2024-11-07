import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getItems} from "../utils/firebaseConfig";

 export interface Item {
    image: string;
    id:number;
    name: string;
    price: number;
    disponibility: number;
    eventType: string;
   
}
const useShoppingItems = () => {
    const { state } = useLocation();
    const initialEventType = state?.eventType || "";
    const [items, setItems] = useState<Item[]>([]);
    const [filterType, setFilterType] = useState<string>(initialEventType);
    useEffect(() => {
        const fetchItems = async () => {
            const itemsList = await getItems();
            setItems(itemsList);
        };
        fetchItems();
    }, []);
    const filteredItems = filterType === "Other"
        ? items 
        : items.filter((item) => item.eventType === filterType);
    return { filteredItems, filterType, setFilterType };
};
export default useShoppingItems;