import landingVideo from "../img/landingPageVideo.mp4";
import s from "./styles/LandingPage.module.css";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className={s.main}>
      <div className={s.overlay}></div>
      <video src={landingVideo} autoPlay loop muted />
      <div className={s.content}>
        <h1>Welcome to DogsApp</h1>
        <div className={s.contentText}>
          <p>
            Do you like dogs? come to see all breed and create a new one if you
            want
          </p>
        </div>
        <div className={s.buttonSubmit}>
          <Link
            style={{
              textDecoration: "none",
              color: "Black",
            }}
            to="/home"
          >
            Let's go!
          </Link>
        </div>
      </div>
    </div>
  );
};
