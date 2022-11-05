import React from "react";
import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <div>
      <h1>ERROR 404</h1>
      <h4>Page not found</h4>
      <Link to="/home">Go back home</Link>
    </div>
  );
};
