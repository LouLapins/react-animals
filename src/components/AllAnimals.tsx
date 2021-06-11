import axios from "axios"
import { useEffect, useState } from "react"
import { Animal } from "../models/Animal"
import { AnimalDetails } from "../models/AnimalDetails"


export const AllAnimals = () => {

    let defaultValue: Animal[] = [];
    const [animals, setAnimals] = useState(defaultValue);

    useEffect(() => {
        
        axios.get<AnimalDetails[]>('https://animals.azurewebsites.net/api/animals')
        .then(response => {
            setAnimals(response.data);
        })
    }, [])

    let liTags = animals.map((a) => {
        return (
            <li key={a.id}>
                <h3>{a.name}</h3>
                <img src={a.imageUrl} alt={a.name} />
            </li>
        );
    });

    return <div>
        <ul>{liTags}</ul>
        </div>
}