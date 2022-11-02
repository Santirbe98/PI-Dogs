import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogByName } from "../redux/action/dogsActions";

export const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  function handleOnChange(e) {
    e.preventDefault();
    setName(e.target.value);
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
    <div>
      <input
        type="text"
        placeholder="Search dog breed"
        value={name}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
        onChange={(e) => handleOnChange(e)}
      />
      <button onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
  );
};
