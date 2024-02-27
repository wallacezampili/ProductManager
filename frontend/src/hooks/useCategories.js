import { useState } from "react";
import api from "../utils/api";

export function useCategories() {
    const [categories, setCategories] = useState([]);

    async function getCategories() {
        
        //Access the get categories route
        await api.get("/categories").then((response) => {
            setCategories(response.data.categories);
        });

    }


    return { categories, getCategories };
}