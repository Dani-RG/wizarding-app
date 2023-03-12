import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Home() {

  const [houses, setHouses] = useState(null);
  const [error, setError] = useState(null);
 
  const getHouses = () => {
    axios
      .get("https://wizard-world-api.herokuapp.com/Houses")
      .then((response) => {
        setHouses(response.data);
        if (!response) {
          setError(true);
          console.error(error);
        }
    })
  }

  useEffect(() => {
    getHouses();
  }, [] );

  return (
    <div>
     <h1>Hogwarts houses</h1>
     <ul>
        {houses && houses.map(elem => {
          return (
            <li key={elem.name}>
              <p>{elem.name}</p>
              <p>Founder: {elem.founder}</p>
              <Link to={`houses/${elem.id}`}>See more</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

{/* La razón de utilizar el houses && house.map... es que en el renderizado inicial, houses esta vacio, porque aún no ha recibido los datos para cuando renderizó, pero luego los recibe y renderiza una vez, solo al inicio con el useEffect y ahí ya tiene los datos. Por esta razón esté el primer houses && porque es una condicionante que frena el metodo map diciendole "cuando houses sea cierto, has un map de esto" es decir, cuando sea true porque ya tiene información definida */}