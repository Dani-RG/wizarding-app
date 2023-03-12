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
          console.error(error);
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

{/* La razón de utilizar el house.traits && house.tra... es que en el renderizado inicial, house esta vacio, porque aún no ha recibido los datos para cuando renderizó, pero luego los recibe y renderiza una vez, solo al inicio con el useEffect y ahí ya tiene los datos. Por esta razón está el primer house.traits && porque es una condicionante que frena el metodo map diciendole "cuando house.traits sea cierto, has un map de esto" es decir, cuando sea true porque ya tiene información definida */}