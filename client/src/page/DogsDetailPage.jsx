import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchDogById } from "../redux/action/dogsActions";
import s from "./styles/DogsDetails.module.css";
import gif from "../img/dogDetailLoading.gif";
import iconArrow from "../img/iconArrowLeft.png";
import linkedin from "../img/linkedinLogo.png";
import github from "../img/githubLogo.png";

function DogsDetailPage() {
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
        <div className={s.background}>
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
          <div className={s.gifLoading}>
            <img
              style={{ width: "200px", height: "200px" }}
              src={gif}
              alt="LoadingGif"
            />
            <p>Wait a second</p>
          </div>
        </div>
      ) : (
        <div className={s.background}>
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
          <div className={s.container}>
            <div className={s.imgContainer}>
              <img className={s.imgDog} src={dog.image} alt={dog.name} />
            </div>
            <div className={s.textWrapper}>
              <h2 className={s.h2Decoration}>{dog.name}</h2>
              <div className={s.textItems}>
                <h3>Weight: </h3>
                <p>
                  {dog.minWeight} - {dog.maxWeight} Kg
                </p>
              </div>

              <div className={s.textItems}>
                <h3>Height: </h3>
                <p>
                  {dog.minHeight} - {dog.maxHeight} Cm
                </p>
              </div>

              <div className={s.textItems}>
                <h3>Life Span: </h3>
                <p>{dog.life_span}</p>
              </div>
              <p>
                {Array.isArray(dog.temperaments)
                  ? dog.temperaments.map((e) => e.name).join(", ")
                  : dog.temperament}
              </p>
            </div>
          </div>
        </div>
      )}
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
}

export default DogsDetailPage;
