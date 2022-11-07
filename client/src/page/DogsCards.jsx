import { Link } from "react-router-dom";
import "./styles/DogsCards.css";

export const DogsCards = (props) => {
  const { name, temperament, image, id, temperaments, minWeight, maxWeight } =
    props;
  return (
    <div className="container">
      <Link to={`/dogs/${id}`} style={{ textDecoration: "none" }}>
        <div className="wrapperImg">
          <img className="imgDog" src={image} alt={name} />
        </div>

        <div className="cardText">
          <h2 className="cardTitle">{name}</h2>

          <h4 className="cardSub">
            Weight: {minWeight} - {maxWeight} Kg
          </h4>
          <div>
            <p className="temp-wrapper">
              {temperaments ? temperaments : temperament}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
