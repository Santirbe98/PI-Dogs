import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDogs, fetchTemperaments } from "../redux/action/dogsActions";
import { DogsCards } from "./DogsCards";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";

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

  function handleClick(e) {
    e.preventDefault();
    setAllDogs([]);
    setTemperamets([]);
    dispatch(fetchDogs()).then((res) => {
      setAllDogs(res.payload);
    });
    dispatch(fetchTemperaments()).then((res) => {
      setTemperamets(res.payload);
    });
  }

  return (
    <div>
      <h1> Dogs page api | Dogs </h1>
      <div>
        <Link to="/create-dog">Create Dog</Link>
      </div>

      <div>
        <button onClick={(e) => handleClick(e)}> Reload dogs </button>
        <SearchBar />
      </div>

      <br />

      {/* <select>
        {temperaments.map((el, i) => (
          <option value={el.id} key={el.id}>
            {el.name}
          </option>
        ))}
      </select> */}

      {/* {dogs.length
        ? dogs.map((dog) => (
            <DogsCards
              id={dog.id}
              name={dog.name}
              temperament={dog.temperament}
              image={dog.image}
              key={dog.id}
            />
          ))
        : "Aguarde un momento"} */}

      <div>
        {dogs.length === 0
          ? "aguarde un momento "
          : dogs?.map((el, index) => {
              return (
                <DogsCards
                  key={index}
                  id={el.id}
                  name={el.name}
                  image={el.image}
                  temperament={el.temperament}
                />
              );
            })}
      </div>
    </div>
  );
}

export default HomePage;
