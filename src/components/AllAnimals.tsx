import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AnimalDetails } from "../models/AnimalDetails"


export const AllAnimals = () => {

    let defaultValue: AnimalDetails[] = [];
    const [animals, setAnimals] = useState(defaultValue);
   
    useEffect(() => {
         
        if (!localStorage.getItem('animalsLS')) {
            axios.get<AnimalDetails[]>('https://animals.azurewebsites.net/api/animals')
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

        let millisecsSinceFed = new Date().getTime() - new Date(a.lastFed).getTime();
        let hoursSinceFed = Math.floor(millisecsSinceFed / (1000*60*60));
        let hungry = hoursSinceFed >= 4;

        return (
            <li key={a.id}>
                <img src={a.imageUrl} alt={a.name} />
                <h3>{a.name}</h3>
                <p>{a.shortDescription}</p>
                {hungry ? <span className="danger">Behöver matas!</span> : <span className="calm">Är mätt just nu.</span>}
                <Link className="show-more-btn" to={"/animal/" + a.id}>Visa mer</Link>
            </li>
        );
    });

    return <section id="all-animals">
        <h1>Sebastians Zoo</h1>
        <ul>{liTags}</ul>
        </section>
}