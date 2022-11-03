import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogs, fetchTemperaments } from "../redux/action/dogsActions";
import { DogsCards } from "./DogsCards";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Paginado } from "./Paginado";
import s from "./styles/HomePage.module.css";

function HomePage() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const [temperament, setTemperamets] = useState("All");

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const dogsCardsPerPage = 8; // Cuantos dogs va a renderizar por pagina
  const numberOfLastDog = currentPage * dogsCardsPerPage;
  const numberOfFirstDog = numberOfLastDog - dogsCardsPerPage;
  const currentDogs = allDogs.slice(numberOfFirstDog, numberOfLastDog);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function paginadoPrev() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function paginadoNext() {
    let lastPage = Math.ceil(allDogs.length / dogsCardsPerPage);
    if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  }

  useEffect(() => {
    dispatch(fetchDogs());
    dispatch(fetchTemperaments());
  }, [dispatch]);

  return (
    <div>
      <h1> Dogs page api | Dogs </h1>
      <div>
        <Link to="/create-dog">Create Dog</Link>
      </div>

      <div>
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
        <Paginado
          dogsCardsPerPage={dogsCardsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
          paginadoPrev={paginadoPrev}
          paginadoNext={paginadoNext}
        />
      </div>
      <br />

      <div className={s.dogsCards}>
        {currentDogs.length === 0
          ? "aguarde un momento "
          : currentDogs?.map((el, index) => {
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
      <br />
      <div>
        <Paginado
          dogsCardsPerPage={dogsCardsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
          paginadoPrev={paginadoPrev}
          paginadoNext={paginadoNext}
        />
      </div>
    </div>
  );
}

export default HomePage;
