import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDogs, fetchTemperaments } from "../action/dogsActions";
import { DogsCards } from "./DogsCards";
import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const [dogs, setAllDogs] = useState([]);
  const [temperaments, setTemperamets] = useState([]);

  useEffect(() => {
    dispatch(fetchDogs()).then((res) => {
      setAllDogs(res.payload);
    });
    dispatch(fetchTemperaments()).then((res) => {
      setTemperamets(res.payload);
    });
  }, [dispatch]);

  return (
    <>
      <h1> Dogs page api | Dogs </h1>
      <div>
        <Link to="/create-dog">Create Dog</Link>
      </div>

      <select>
        {temperaments.map((el, i) => (
          <option value={el.id} key={el.id}>
            {el.name}
          </option>
        ))}
      </select>

      {dogs.length
        ? dogs.map((dog) => (
            <DogsCards
              id={dog.id}
              name={dog.name}
              temperament={dog.temperament}
              image={dog.image}
              key={dog.id}
            />
          ))
        : "Aguarde un momento"}
    </>
  );
}

export default HomePage;
