import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogs, fetchTemperaments } from "../redux/action/dogsActions";
import { DogsCards } from "./DogsCards";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";

function HomePage() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const [temperament, setTemperamets] = useState("All");

  useEffect(() => {
    dispatch(fetchDogs());
    dispatch(fetchTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(fetchDogs());
    setTemperamets("All");
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
      <div>
        <select>
          {temperaments.map((el, i) => (
            <option value={el.id} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      </div>

      <br />

      <div>
        {allDogs.length === 0
          ? "aguarde un momento "
          : allDogs?.map((el, index) => {
              return (
                <DogsCards
                  key={index}
                  id={el.id}
                  name={el.name}
                  image={el.image}
                  temperament={el.temperament}
                  temperaments={el.temperaments?.map((t) => t.name).join(", ")}
                />
              );
            })}
      </div>
    </div>
  );
}

export default HomePage;
