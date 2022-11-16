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
import linkedin from "../img/linkedinLogo.png";
import github from "../img/githubLogo.png";

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

  // Temperament filter
  const temperaments = useSelector((state) => state.temperaments);
  const [temperament, setTemperamets] = useState("all");

  const handleSelectTemperament = (e) => {
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value));
    setTemperamets(e.target.value);
    setCurrentPage(1);
  };
  // Temperament filter

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchDogs());
    setFilterName("az");
    setFilterWeight("normal");
    setFilterBreed("all");
    setTemperamets("all");
    setCurrentPage(1);
  };

  // Weight filter
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
  // Weight filter

  // Name filter
  const [filterName, setFilterName] = useState("");
  const handleSortName = (e) => {
    e.preventDefault();
    dispatch(filterByName(e.target.value));
    setFilterName(e.target.value);
    setCurrentPage(1);
    setFilterWeight("");
  };
  // Name filter

  // Created or Api filter
  const [filterBreed, setFilterBreed] = useState("");
  const handleSortBreed = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setFilterBreed(e.target.value);
    setCurrentPage(1);
  };
  // Created or Api filter

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
        <a href="https://dogs-app-pi-one.vercel.app/home" className={s.aBar}>
          <img src={logo} alt="logo" style={{ width: "380px" }} />
        </a>
        <div className={s.credits}>
          <div className={s.footerDiv}>
            <p style={{ color: "white", paddingRight: "10px" }}>
              Santiago Bonetto, 2022
            </p>
            <p
              style={{
                color: "white",
                fontSize: "1em",
                paddingRight: "10px",
              }}
            >
              •
            </p>

            <a
              target="_blank"
              href="https://www.linkedin.com/in/santiago-bonetto/"
            >
              <img
                src={linkedin}
                alt="logoLinkedin"
                style={{ width: "30px", height: "30px", paddingRight: "10px" }}
              />
            </a>
            <p
              style={{
                color: "white",
                fontSize: "1em",
                paddingRight: "10px",
              }}
            >
              •
            </p>

            <a target="_blank" href="https://github.com/Santirbe98/PI-Dogs">
              <img
                src={github}
                alt="logogithub"
                style={{ width: "30px", height: "30px" }}
              />
            </a>
          </div>
        </div>
      </div>
      <div className={s.container}>
        {/* SearchBar */}
        <div className={s.searchBar}>
          <SearchBar setCurrentPage={setCurrentPage} />
        </div>

        {/* Filters and Form */}
        <div className={s.cardFilterContainer}>
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

        {/* Paginado */}
        <div>
          <Paginado
            dogsCardsPerPage={dogsCardsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
            paginadoPrev={paginadoPrev}
            paginadoNext={paginadoNext}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
