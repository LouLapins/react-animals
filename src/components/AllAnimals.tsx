import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Animal } from "../models/Animal"


export const AllAnimals = () => {

    let defaultValue: Animal[] = [];
    const [animals, setAnimals] = useState(defaultValue);
    let animalsLS = localStorage.getItem('animalsLS');
   
    useEffect(() => {
         
        if (!animalsLS) {
            axios.get<Animal[]>('https://animals.azurewebsites.net/api/animals')
            .then(response => {
                setAnimals(response.data);
                localStorage.setItem('animalsLS', JSON.stringify(response.data));
        })
        } else {
            let cachedAnimals = JSON.parse(animalsLS);
            setAnimals(cachedAnimals);
        }      
    }, []) // FRÅGA

    let liTags = animals.map((a) => {
        return (
            <li key={a.id}>
                <img src={a.imageUrl} alt={a.name} />
                <h3>{a.name}</h3>
                <p>{a.shortDescription}</p>
                <Link to={"/animal/" + a.id}>Visa mer</Link>
            </li>
        );
    });

    return <div>
        <ul>{liTags}</ul>
        </div>
}