import React, { useState } from "react";
import style from "./home.module.css";
import { useSelector } from "react-redux";
import PokemonsDeHome from "./PokemonsDeHome.jsx";
import Buscador from "./Buscador.jsx";

const Home = () => {
  const pokemons = useSelector((store) => store.pokemons);
  useSelector((store) => store.orden);
  useSelector((store) => store.pokemonsParaFiltrar);

  const [page, setPage] = useState(0);
  const paginacion = () => {
    return pokemons.length ? pokemons.slice(page, page + 12) :
    []
  };
  const pokesPorPagina = paginacion();
  const paginaSiguiente = () => {
    if (pokemons.length > page + 12) {
      setPage(page + 12);
    }
  };

  const paginaAnterior = () => {
    if (page > 0) {
      setPage(page - 12);
    }
  };
console.log(pokesPorPagina)
  return (
    <div className={style.container}>
      <Buscador />
      <div className="botones">
        <button onClick={paginaAnterior} className="pages">
          &laquo; Previo
        </button>
        <button onClick={paginaSiguiente} className="pages">
          siguiente &raquo;
        </button>
      </div>
      <PokemonsDeHome pokemons={pokesPorPagina} />
    </div>
  );
};

export default Home;
