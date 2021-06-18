import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Animal } from "../models/Animal"


export const AllAnimals = () => {

    let defaultValue: Animal[] = [];
    const [animals, setAnimals] = useState(defaultValue);
   
    useEffect(() => {
         
        if (!localStorage.getItem('animalsLS')) {
            axios.get<Animal[]>('https://animals.azurewebsites.net/api/animals')
            .then(response => {
                setAnimals(response.data);
                localStorage.setItem('animalsLS', JSON.stringify(response.data));
        })
        } else {
            let cachedAnimals = JSON.parse(localStorage.getItem('animalsLS') || '[]');
            setAnimals(cachedAnimals);
        }      
    }, []) 

    let liTags = animals.map((a) => {
        return (
            <li key={a.id}>
                <img src={a.imageUrl} alt={a.name} />
                <h3>{a.name}</h3>
                <p>{a.shortDescription}</p>
                <Link className="show-more-btn" to={"/animal/" + a.id}>Visa mer</Link>
            </li>
        );
    });

    return <section id="all-animals">
        <h1>Sebastians Zoo</h1>
        <ul>{liTags}</ul>
        </section>
}