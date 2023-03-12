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
