import { useState } from "react";
import api from "../utils/api";

export function useProducts() {
    const [products, setProducts] = useState([]);
   

    async function getProducts(filter) {
        
        //Access the filter route
        console.log(filter);
        await api.post("/products/", filter).then((response) => {
            setProducts(response.data.products);
        });


    }


    return { products, setProducts, getProducts };
}