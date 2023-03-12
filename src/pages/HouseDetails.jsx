import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";

export default function HouseDetails() {
  const { houseId } = useParams();

  const [house, setHouse] = useState({});
  const [error, setError] = useState(null);

  const getHouseDetail = () => {
    axios
      .get(`https://wizard-world-api.herokuapp.com/Houses/{${houseId}}`)
      .then((response) => {
        setHouse(response.data);
        if (!response) {
          setError(true);
        }
    })
  }

  useEffect(() => {
    getHouseDetail();
  }, [] );

  return (
    <div>
      <h1>{house.name}</h1>
      <p>Founded by: {house.founder}</p>
      <p>Colors: {house.houseColours}</p>
      <p>Element: {house.element} | Animal: {house.animal}</p>
      <p>Traits of students:</p>
      <ul>
        {house.traits && house.traits.map((elem) => {
            return (
              <div key={elem.id}>
                <li>{elem.name}</li>
              </div>
            )
        })}
      </ul>
    </div>
  )
}
