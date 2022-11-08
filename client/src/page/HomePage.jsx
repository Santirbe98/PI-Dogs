import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDogs,
  fetchTemperaments,
  filterByTemperaments,
  filterByName,
  filterByWeight,
  filterCreated,
} from "../redux/action/dogsActions";
import { DogsCards } from "./DogsCards";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Paginado } from "./Paginado";
import s from "./styles/HomePage.module.css";
import loading from "../img/loading.gif";
import logo from "../img/logo.png";

function HomePage() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const dogsCardsPerPage = 8; // Cuantos dogs va a renderizar por pagina
  const numberOfLastDog = currentPage * dogsCardsPerPage;
  const numberOfFirstDog = numberOfLastDog - dogsCardsPerPage;
  const currentDogs = allDogs.slice(numberOfFirstDog, numberOfLastDog);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Paginado

  useEffect(() => {
    dispatch(fetchDogs());
    dispatch(fetchTemperaments());
    dispatch(filterByTemperaments());
  }, [dispatch]);

  const temperaments = useSelector((state) => state.temperaments);
  const [temperament, setTemperamets] = useState("All");

  const handleSelectTemperament = (e) => {
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value));
    setTemperamets(e.target.value);
    setCurrentPage(1);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchDogs());
    setTemperamets("All");
    setCurrentPage(1);
  };

  const [filterWeight, setFilterWeight] = useState("");
  const handleSortWeight = (e) => {
    e.preventDefault();
    if (e.target.value === "normal") {
      dispatch(fetchDogs());
    }
    dispatch(filterByWeight(e.target.value));
    setFilterWeight(e.target.value);
    setCurrentPage(1);
    setFilterName("");
  };

  const [filterName, setFilterName] = useState("");
  const handleSortName = (e) => {
    e.preventDefault();
    dispatch(filterByName(e.target.value));
    setFilterName(e.target.value);
    setCurrentPage(1);
    setFilterWeight("");
  };

  const [filterBreed, setFilterBreed] = useState("");
  const handleSortBreed = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setFilterBreed(e.target.value);
    setCurrentPage(1);
  };

  function paginadoPrev() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function paginadoNext() {
    let lastPage = Math.ceil(allDogs.length / dogsCardsPerPage);
    if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  }

  return (
    <div>
      <div className={s.logoBar}>
        <a href="http://localhost:3000/home" className={s.aBar}>
          <img src={logo} alt="logo" style={{ width: "380px" }} />
        </a>
      </div>
      <div className={s.container}>
        {/* SearchBar */}

        <div className={s.searchBar}>
          <SearchBar setCurrentPage={setCurrentPage} />
        </div>

        <div className={s.cardFilterContainer}>
          {/* Filters and Form */}
          <div className={s.filters}>
            <span> Filter by temperament </span>
            <select
              value={temperament}
              onChange={(e) => handleSelectTemperament(e)}
            >
              <option value="all"> All </option>
              {temperaments.map((temp, index) => (
                <option onClick={(e) => handleClick(e)} key={index}>
                  {temp.name}
                </option>
              ))}
            </select>
            <br />
            <span> Sort by weight </span>
            <select value={filterWeight} onChange={(e) => handleSortWeight(e)}>
              <option value="normal"> ----- </option>
              <option value="asc"> Lightest </option>
              <option value="desc"> Heaviest</option>
            </select>
            <br />
            <span> Sort by breed </span>
            <select value={filterBreed} onChange={(e) => handleSortBreed(e)}>
              <option value="all"> All </option>
              <option value="api"> Api </option>
              <option value="created"> Created </option>
            </select>
            <br />
            <span> Sort by name </span>
            <select value={filterName} onChange={(e) => handleSortName(e)}>
              <option value="az"> A - Z </option>
              <option value="za"> Z - A</option>
            </select>
            <br />
            <div className={s.buttonCreate}>
              <Link
                to="/create-dog"
                style={{ textDecoration: "none", color: "black" }}
              >
                Create a new breed
              </Link>
            </div>
          </div>
          {/* Cards */}
          <div className={s.dogsCards}>
            <br />
            {currentDogs.length === 0 ? (
              <img src={loading} alt="loadingGif" className={s.loading} />
            ) : (
              currentDogs?.map((el, index) => {
                return (
                  <DogsCards
                    key={index}
                    id={el.id}
                    name={el.name}
                    image={el.image}
                    temperament={el.temperament}
                    temperaments={el.temperaments
                      ?.map((t) => t.name)
                      .join(", ")}
                    maxWeight={el.maxWeight}
                    minWeight={el.minWeight}
                  />
                );
              })
            )}
          </div>
        </div>

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
    </div>
  );
}

export default HomePage;
