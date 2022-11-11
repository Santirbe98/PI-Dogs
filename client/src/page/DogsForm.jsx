import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { fetchTemperaments, createDog } from "../redux/action/dogsActions";
import s from "./styles/DogsForm.module.css";
import iconArrow from "../img/iconArrowLeft.png";
import linkedin from "../img/linkedinLogo.png";
import github from "../img/githubLogo.png";

const validate = (input) => {
  let errors = {};
  let expression = /^[a-zA-Z ]+$/gm;

  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!input.maxHeight || !input.minHeight) {
    errors.height = "Height is required";
  }
  if (!input.maxWeight || !input.minWeight) {
    errors.weight = "Weight is required";
  }
  if (!input.image) {
    errors.image = "Image is required";
  }

  if (parseInt(input.name)) {
    errors.name = "Name is invalid, write a text";
  } else if (!expression.test(input.name)) {
    errors.name = "Special caracters aren't supported";
  }

  if (!input.life_span) {
    errors.life_span = "Life span is required";
  } else if (input.life_span > 20 || input.life_span < 1) {
    errors.life_span = " life span must be in a number from 1 - 20";
  }

  if (Number(input.minWeight) <= 0 || Number(input.minWeight >= 100)) {
    errors.minWeight = "Minimum heigh must be in a number from 0 - 100";
  }
  if (Number(input.maxWeight) <= 0 || Number(input.maxWeight > 100)) {
    errors.maxWeight = "Maximun weight must be in a number from 0 - 150";
  }
  if (Number(input.minHeight) <= 0 || Number(input.minHeight) >= 100) {
    errors.minHeight = "Minimun height must be in a number from 0 - 100";
  }
  if (Number(input.maxHeight) <= 0 || Number(input.maxHeight) > 100) {
    errors.maxHeight = "Maximun height must be in a number from 0 - 100";
  }
  if (!input.temperament.length) {
    errors.temperament = "Select at least 1 temperament";
  }
  return errors;
};

export const DogsForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState("");
  const [input, setInput] = useState({
    name: "",
    life_span: "",
    image: "",
    temperament: [],
    minWeight: "",
    maxWeight: "",
    minHeight: "",
    maxHeight: "",
  });

  useEffect(() => {
    dispatch(fetchTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (input.temperament.find((t) => t.id === e.target.value.split(",")[0])) {
      console.log({ input });
      alert("Already in the list");
    } else {
      setInput({
        ...input,
        temperament: [
          ...input.temperament,
          {
            id: e.target.value.split(",")[0],
            name: e.target.value.split(",")[1],
          },
        ],
      });
    }
  }

  const handleDelete = (e) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((el) => el !== e),
    });
  };

  function handleSubmit(e) {
    if (
      input.name &&
      !parseInt(input.name) &&
      input.life_span &&
      input.minWeight &&
      input.maxWeight &&
      input.minHeight &&
      input.maxHeight &&
      input.image &&
      input.temperament &&
      input.temperament.length > 0
    ) {
      e.preventDefault();
      dispatch(
        createDog({
          name: input.name,
          life_span: input.life_span,
          image: input.image,
          maxHeight: input.maxHeight,
          minHeight: input.minHeight,
          maxWeight: input.maxWeight,
          minWeight: input.minWeight,
          temperaments: input.temperament.map((t) => Number(t.id)),
        })
      );

      alert("Success! Your dog was created");
      setInput({
        name: "",
        life_span: "",
        minWeight: "",
        maxWeight: "",
        minHeight: "",
        maxHeight: "",
        image: "",
        temperament: [],
      });
      history.push("/home");
    } else {
      alert("incomplete or wrong information");
      e.preventDefault();
    }
  }

  return (
    <div className={s.container}>
      <div className={s.back}>
        <Link to="/home">
          <img
            src={iconArrow}
            alt="Back"
            height="50px"
            width="50px"
            style={{ marginLeft: "50px" }}
          />
        </Link>
        <p className={s.return}>Return</p>
      </div>
      <h2 className={s.title}>CREATE YOUR OWN BREED OF DOG</h2>
      <form
        className={s.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {/* Titles */}
        <div className={s.titles}>
          <label>Breed: </label>
          <label>life_span: </label>
          <label>Height (Cm): </label>
          <label>Weight (Kg): </label>
          <label>Image: </label>
          <label>Temperaments: </label>
        </div>

        {/* Inputs */}
        <div className={s.inputs}>
          {/* BreedName */}
          <div style={{ width: "352px" }}>
            <input
              style={{ width: "352px" }}
              type="text"
              placeholder="Breed name"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          {/* life_span */}
          <div style={{ width: "352px" }}>
            <input
              style={{ width: "352px" }}
              type="number"
              placeholder="Life span"
              value={input.life_span}
              name="life_span"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          <div className={s.heightDiv}>
            {/* MaxHeight */}
            <div>
              <input
                type="number"
                min="0"
                placeholder="Maximun height"
                value={input.maxHeight}
                name="maxHeight"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* MinHeight */}
            <div>
              <input
                type="number"
                min="0"
                placeholder="Minimum height"
                value={input.minHeight}
                name="minHeight"
                onChange={(e) => handleChange(e)}
                style={{ marginLeft: "10px" }}
              />
            </div>
          </div>
          <br />
          <div className={s.weightDiv}>
            {/* MaxWeight */}
            <div>
              <input
                type="number"
                min="0"
                placeholder="Maximun weight"
                value={input.maxWeight}
                name="maxWeight"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            {/* MinWeight */}
            <div>
              <input
                type="number"
                min="0"
                placeholder="Minimum weight"
                value={input.minWeight}
                name="minWeight"
                onChange={(e) => handleChange(e)}
                style={{ marginLeft: "10px" }}
              />
            </div>
          </div>
          <br />
          {/* Image */}
          <div style={{ width: "352px" }}>
            <input
              style={{ width: "352px" }}
              type="URL"
              placeholder="Url of image"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          {/* Temperament */}
          <div>
            <select onChange={(e) => handleSelect(e)}>
              {temperaments?.map((el, i) => (
                <option value={`${el.id},${el.name}`} key={i}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

      <div>
        {input.temperament.map((el, i) => (
          <button
            className={s.buttonTemperament}
            key={i}
            type="reset"
            onClick={() => handleDelete(el)}
          >
            {el.name} X
          </button>
        ))}
        {errors.temperament && <p className="error">{errors.temperament}</p>}
      </div>

      <div className={s.submit}>
        <button
          className={s.buttonSubmit}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Create breed
        </button>
      </div>
      {/*Errors */}
      <div className={s.errors}>
        <ul>
          {errors.name && <li className="error">{errors.name}</li>}

          {errors.life_span && <li className="error">{errors.life_span}</li>}

          {(errors.weight && <li className="error">{errors.weight}</li>) ||
            (errors.maxWeight && (
              <li className="error">*{errors.maxWeight}</li>
            )) ||
            (errors.minWeight && <li className="error">{errors.minWeight}</li>)}

          {(errors.height && <li className="error">{errors.height}</li>) ||
            (errors.maxHeight && (
              <li className="error">{errors.maxHeight}</li>
            )) ||
            (errors.minHeight && <li className="error">{errors.minHeight}</li>)}

          {errors.image && <li className="error">{errors.image}</li>}
        </ul>
      </div>
      <div className={s.footerPage}>
        <div className={s.footerDiv}>
          <p style={{ color: "white", paddingRight: "10px" }}>
            Santiago Bonetto, 2022
          </p>
          <p
            style={{ color: "white", fontSize: "1.5em", paddingRight: "10px" }}
          >
            •
          </p>

          <a href="https://www.linkedin.com/in/santiago-bonetto/">
            <img
              src={linkedin}
              alt="logoLinkedin"
              style={{ width: "30px", height: "30px", paddingRight: "10px" }}
            />
          </a>
          <p
            style={{ color: "white", fontSize: "1.5em", paddingRight: "10px" }}
          >
            •
          </p>

          <a href="https://github.com/Santirbe98/PI-Dogs">
            <img
              src={github}
              alt="logogithub"
              style={{ width: "30px", height: "30px" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};
