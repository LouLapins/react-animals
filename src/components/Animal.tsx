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

    let animalsLS = localStorage.getItem('animalsLS');    
    // const parsedParamsID: number = parseInt(id); // FRÅGA
    const [animal, setAnimal] = useState(defaultValue);
    const [animals, setAnimals] = useState(animalsLS); // FRÅGA


    useEffect(() => {

        if (!animalsLS) {
            axios.get<AnimalDetails>('https://animals.azurewebsites.net/api/animals/' + id)
        .then((response) => {
            setAnimal(response.data);
        })
        } else {
            let cachedAnimals = JSON.parse(animalsLS);
            setAnimals(cachedAnimals);
            for (let i = 0; i < cachedAnimals.length; i++) {
                const parsedParamsID: number = parseInt(id);
                if (cachedAnimals[i].id === parsedParamsID) {
                    setAnimal(cachedAnimals[i]);
                }
                
            }
        }
        
    }, [id, animalsLS]);
    

    const feedAnimal = () => {
        const parsedParamsID: number = parseInt(id);
        if (animalsLS) {
            let cachedAnimals = JSON.parse(animalsLS);
            for (let i = 0; i < cachedAnimals.length; i++) {
                if (cachedAnimals[i].id === parsedParamsID) {
                    cachedAnimals[i].isFed = true;
                    cachedAnimals[i].lastFed = new Date();
                    localStorage.setItem('animalsLS', JSON.stringify(cachedAnimals));
                    setAnimal(cachedAnimals[i]);
                }
            }
        }
    }


    return <div>
        <img src={animal.imageUrl} alt={animal.name} />
        <h2>{animal.name}</h2>
        <h4>{animal.latinName}</h4>
        <p>{animal.longDescription}</p>
        <p>Född år {animal.yearOfBirth}</p>
        <p>Mediciner: {animal.medicine}</p>
        <p>Hungrig? {animal.isFed ? 'Nej' : 'Ja'}</p>
        <p>Matad senast: {animal.lastFed.toLocaleString()}</p>
        <button onClick={feedAnimal} disabled={animal.isFed}>Mata djuret</button>
    </div>
}