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
        let animalsLS = localStorage.getItem('animalsLS'); 
        let animals = JSON.parse(animalsLS || '[]'); 
        if (!animalsLS) {
            axios.get<AnimalDetails>('https://animals.azurewebsites.net/api/animals/' + id)
        .then((response) => {
            setAnimal(response.data);
        })
        } else {
            for (let i = 0; i < animals.length; i++) {
                if (animals[i].id === +id) {
                    
                    let millisecsSinceFed = new Date().getTime() - new Date(animals[i].lastFed).getTime();
                    let hoursSinceFed = Math.floor(millisecsSinceFed / (1000*60*60));
                    let hungry = hoursSinceFed >= 3;

                    if (hungry) {
                        animals[i].isFed = false;
                        localStorage.setItem('animalsLS', JSON.stringify(animals));
                    }
                    setAnimal(animals[i]);
                }
            }
        }       
    }, [id]);
    

    const feedAnimal = () => {
        let animalsLS = localStorage.getItem('animalsLS'); 
        let animals = JSON.parse(animalsLS || '[]'); 
        if (animalsLS) {
            for (let i = 0; i < animals.length; i++) {
                if (animals[i].id === +id) {
                    animals[i].isFed = true;
                    animals[i].lastFed = new Date();
                    localStorage.setItem('animalsLS', JSON.stringify(animals));
                    setAnimal(animals[i]);
                }
            }
        }
    }

    return <section id="animal">
        <img src={animal.imageUrl} alt={animal.name} />
        <h2>{animal.name}</h2>
        <h4>{animal.latinName}</h4>
        <p className="long-description">{animal.longDescription}</p>
        <div className="info-box">
        <span>Född år {animal.yearOfBirth}</span>
        <span>Mediciner: {animal.medicine}</span>
        <span>Hungrig? {animal.isFed ? 'Nej' : 'Ja'}</span>
        <span>Matad senast: {animal.lastFed.toLocaleString()}</span>
        <button onClick={feedAnimal} disabled={animal.isFed}>Mata djuret</button>
        </div>
    </section>
}