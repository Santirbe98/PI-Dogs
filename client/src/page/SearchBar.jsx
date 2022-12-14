import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogByName } from "../redux/action/dogsActions";
import s from "./styles/SearchBar.module.css";
import lupa from "../img/lupa.png";

export const SearchBar = ({ setCurrentPage }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  function handleOnChange(e) {
    e.preventDefault();
    setName(e.target.value);
    setCurrentPage(1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.length === 0) {
      return alert("Please write a name");
    } else {
      dispatch(fetchDogByName(name));
      setName("");
    }
  }

  return (
    <div className={s.container}>
      <input
        className={s.input}
        type="text"
        placeholder="Search dog breed"
        value={name}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
        onChange={(e) => handleOnChange(e)}
      />

      <button className={s.btn} type="submit" onClick={(e) => handleSubmit(e)}>
        <img src={lupa} alt="lupa" style={{ maxWidth: "23px" }} />
      </button>

      {/* <svg className={s.icon} aria-hidden="true" viewBox="0 0 24 24">
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg> */}
    </div>
  );
};
