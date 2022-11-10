import React from "react";
import { Link } from "react-router-dom";
import s from "./styles/Error404.module.css";
import error from "../img/404.jpg";

export const Error404 = () => {
  return (
    <div className={s.container}>
      <div className={s.divCont}>
        <img className={s.imgError} src={error} alt="Error" />
        <div className={s.buttonCreate}>
          <Link style={{ textDecoration: "none", color: "black" }} to="/home">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};
