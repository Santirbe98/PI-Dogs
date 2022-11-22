import { Link } from "react-router-dom";
import s from "./styles/DogsCards.module.css";

export const DogsCards = (props) => {
  const { name, temperament, image, id, temperaments, minWeight, maxWeight } =
    props;
  return (
    <div className={s.container}>
      <Link to={`/dogs/${id}`} style={{ textDecoration: "none" }}>
        <div className={s.wrapperImg}>
          <img className={s.imgDog} src={image} alt={name} />
        </div>
        <div className={s.cardText}>
          <h2 className={s.cardTitle}>{name}</h2>

          <h4 className={s.cardSub}>
            Weight: {minWeight} - {maxWeight} Kg
          </h4>
          <div>
            <p className={s.tempWrapper}>
              {temperaments ? temperaments : temperament}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
