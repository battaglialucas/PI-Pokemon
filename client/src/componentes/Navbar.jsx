import React from "react";
import { Link } from "react-router-dom";
import style from './navbar.module.css';

const Navbar = () => {
  return (
    <div>
      <header className={ style.header } >
        <ul>
        <li><Link to="/">Inicio</Link></li>
            <li><Link to="/home">Pokemons</Link></li>
            <li><Link to="/crearPokemon">Crear Pokemon</Link></li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;