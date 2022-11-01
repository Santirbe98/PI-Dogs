import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDogById } from "../action/dogsActions";

function DogsDetailPage(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [dog, setDog] = useState({});

  useEffect(() => {
    dispatch(fetchDogById(id)).then((res) => {
      setDog(res.payload);
    });
  }, [dispatch, id]);

  return (
    <div>
      {Object.entries(dog).length === 0 ? (
        "Cargando perro"
      ) : (
        <div>
          <img src={dog.image} alt={dog.name} width="20%" height="20%" />
          <h2>{dog.name}</h2>
          <h3>Temperaments: </h3>
          <p>{dog.temperament}</p>
          <h3>Weight: </h3>
          <p>{dog.weight} Kg</p>
          <h3>Height: </h3>
          <p>{dog.height} Cm</p>
          <h3>Life Span: </h3>
          <p>{dog.life_span}</p>
          <a href="/">
            <button>Return home</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default DogsDetailPage;
