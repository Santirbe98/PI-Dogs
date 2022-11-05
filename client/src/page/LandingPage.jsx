import landingVideo from "../img/landingPageVideo.mp4";
import s from "./styles/LandingPage.module.css";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className={s.main}>
      <div className={s.overlay}></div>
      <video src={landingVideo} autoPlay loop muted />
      <div className={s.content}>
        <h2>Welcome to DogsApp</h2>
        <p>
          Do you like dogs? come to see all breed and create a new one if you
          want
        </p>
        <Link to="/home">Let's go!</Link>
      </div>
    </div>
  );
};
