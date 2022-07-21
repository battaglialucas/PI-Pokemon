import React from "react";
import { Link } from "react-router-dom";
import style from "./landingpage.module.css";

const LandingPage = () => {
    return (
      <div className={style.container}>
        <div>
          <h1>
            <span>Encuentra</span> todos tus <br />
            <span>Pokemon </span>
             favoritos<br />
            
          </h1>
          <Link to="/home">
            <input type="submit" value="Ver Pokemons" className={style.myButton} />
          </Link>
        </div>
      </div>
    );
  };

  export default LandingPage;