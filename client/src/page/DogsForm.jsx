import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { fetchTemperaments, createDog } from "../redux/action/dogsActions";

const validate = (input) => {
  let errors = {};
  let expression = /^[a-zA-Z ]+$/gm;

  if (
    !input.name ||
    !input.maxHeight ||
    !input.minHeight ||
    !input.maxWeight ||
    !input.minWeight
  ) {
    errors.dataMissing = "Missing mandatory information";
  }

  if (parseInt(input.name)) {
    errors.name = "Name is invalid, write a text";
  } else if (!expression.test(input.name)) {
    errors.name = "Special caracters aren't supported";
  }

  if (!input.image) {
    errors.image = "Image is required";
  }

  if (!input.life_span) {
    errors.life_span = "Life span is required";
  } else if (input.life_span > 20 || input.life_span < 1) {
    errors.life_span = "Write a number beetwen 1 - 20";
  }

  if (!input.minWeight) {
    errors.minWeight = "Minimum weight is required";
  } else if (Number(input.minWeight) <= 0 || Number(input.minWeight >= 100)) {
    errors.minWeight = "Write a number beetwen 0 - 100";
  }
  if (!input.maxWeight) {
    errors.maxWeight = "Maximum weight is required";
  } else if (
    Number(input.maxWeight) <= 0 ||
    Number(
      input.maxWeight < Number(input.minWeight) || Number(input.maxWeight > 150)
    )
  ) {
    errors.maxWeight = "Write a number beetwen 0- 150";
  }
  if (!input.minHeight) {
    errors.minHeight = "Minimum height is required";
  } else if (Number(input.minHeight) <= 0 || Number(input.minHeight) >= 150) {
    errors.minHeight = "Write a number beetwen 0 - 150";
  }
  if (!input.maxHeight) {
    errors.maxHeight = "Minimum height is required";
  } else if (
    Number(input.maxHeight) <= 0 ||
    Number(input.maxHeight) < Number(input.minHeight) ||
    Number(input.maxHeight) > 100
  ) {
    errors.maxHeight = "Write a number beetwen 0- 100";
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
    if (input.temperament.includes(e.target.value)) {
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
    <div>
      <div>
        <span>CREATE YOUR OWN BREED OF DOG</span>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {/* BreedName */}
        <div>
          <label>Breed: </label>
          <input
            type="text"
            placeholder="Breed name"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <div>
            {(errors.dataMissing && (
              <p className="error">{errors.dataMissing}</p>
            )) ||
              (errors.name && <p className="error">{errors.name}</p>)}
          </div>
        </div>
        <br />
        {/* life_span */}
        <div>
          <label>life_span: </label>
          <input
            type="number"
            placeholder="Life span"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          />
          <div>
            {errors.life_span && <p className="error">{errors.life_span}</p>}
          </div>
        </div>
        <br />
        {/* MaxHeight */}
        <div>
          <label>Max height: </label>
          <input
            type="number"
            min="0"
            placeholder="Maximun height"
            value={input.maxHeight}
            name="maxHeight"
            onChange={(e) => handleChange(e)}
          />
          <div>
            {(errors.dataMissing && (
              <p className="error">{errors.dataMissing}</p>
            )) ||
              (errors.maxHeight && <p className="error">{errors.maxHeight}</p>)}
          </div>
        </div>
        <br />
        {/* MinHeight */}
        <div>
          <label>Min height: </label>
          <input
            type="number"
            min="0"
            placeholder="Minimum height"
            value={input.minHeight}
            name="minHeight"
            onChange={(e) => handleChange(e)}
          />
          <div>
            {(errors.dataMissing && (
              <p className="error">{errors.dataMissing}</p>
            )) ||
              (errors.minHeight && <p className="error">{errors.minHeight}</p>)}
          </div>
        </div>
        <br />
        {/* MaxWeight */}
        <div>
          <label>Max weight: </label>
          <input
            type="number"
            min="0"
            placeholder="Maximun weight"
            value={input.maxWeight}
            name="maxWeight"
            onChange={(e) => handleChange(e)}
          />
          <div>
            {(errors.dataMissing && (
              <p className="error">{errors.dataMissing}</p>
            )) ||
              (errors.maxWeight && <p className="error">{errors.maxWeight}</p>)}
          </div>
        </div>
        <br />
        {/* MinWeight */}
        <div>
          <label>Min weight: </label>
          <input
            type="number"
            min="0"
            placeholder="Minimum weight"
            value={input.minWeight}
            name="minWeight"
            onChange={(e) => handleChange(e)}
          />
          <div>
            {(errors.dataMissing && (
              <p className="error">{errors.dataMissing}</p>
            )) ||
              (errors.minWeight && <p className="error">{errors.minWeight}</p>)}
          </div>
        </div>
        <br />
        {/* Image */}
        <div>
          <label>Image: </label>
          <input
            type="URL"
            placeholder="Url of image"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
          <div>{errors.image && <p className="error">{errors.image}</p>}</div>
        </div>
        <br />
        {/* Temperament */}
        <div>
          <label>Temperaments: </label>
          <select onChange={(e) => handleSelect(e)}>
            {temperaments?.map((el, i) => (
              <option value={`${el.id},${el.name}`} key={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          {errors.temperament && <p className="error">{errors.temperament}</p>}
          <div>
            {input.temperament.map((el, i) => (
              <button key={el.id} type="reset" onClick={() => handleDelete(el)}>
                {el.name} X
              </button>
            ))}
          </div>
        </div>
        {/* Button sumbit */}
        <div>
          <button type="submit">Create breed</button>
        </div>
        <Link to="/">
          <button> Go Back </button>
        </Link>
      </form>
    </div>
  );
};
