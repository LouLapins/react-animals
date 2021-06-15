import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { AnimalDetails } from "../models/AnimalDetails";

interface IParams {
    id: string; 
}

export const Animal = () => {

    let { id } = useParams<IParams>();

    let defaultValue: AnimalDetails = {
     id: 0,
     name: "",
     latinName: "",
     yearOfBirth: 0,
     shortDescription: "",
     longDescription: "",
     imageUrl: "",
     medicine: "",
     isFed: false,
     lastFed: new Date()
    }

    const [animal, setAnimal] = useState(defaultValue);

    useEffect(() => {
        axios.get<AnimalDetails>('https://animals.azurewebsites.net/api/animals/' + id)
        .then((response) => {
            setAnimal(response.data);
            localStorage.setItem('animal', JSON.stringify(response.data));
        });
    }, [id]);


    return <div>
        <img src={animal.imageUrl} alt={animal.name} />
        <h2>{animal.name}</h2>
        <h4>{animal.latinName}</h4>
        <p>{animal.longDescription}</p>
        <p>Born: {animal.yearOfBirth}</p>
        <p>Medicine: {animal.medicine}</p>
        <p>Fed: {animal.isFed.toString()}</p>
        <p>Last fed: {animal.lastFed.toLocaleString()}</p>
    </div>
}