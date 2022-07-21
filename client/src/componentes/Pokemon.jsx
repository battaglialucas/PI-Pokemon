import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./pokemon.module.css";
import Stats from "../Stats/index.jsx";
import axios from "axios";
import pokemonSinImagen from "../imagenes/pokemonSinImagen.jpg"

const Pokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const detalles = async () => {
      const pokemon = (await axios(`http://localhost:3001/pokemon/${id}`)).data
      setPokemon(pokemon);
    };
    detalles();
  }, [id]);



  return (
    <>
      <div className={style.container}>
        <h1>{pokemon.name}</h1>
        <h2>#{pokemon.id}</h2>

        <div className={style.ima}>
          <img src={pokemon.image ? (pokemon.image) : (pokemonSinImagen)} alt="" />
          <div className={style.parrafo}>
            <p>peso: {pokemon.weight}kg</p>
            <p>altura: {pokemon.height}ft</p>
          </div>
        </div>

        <div className={style.tipo}>
          {pokemon.types
            ? pokemon?.types.map((type) => <h3 key={type.id} className={style[`${type.name}`]}>{type.name}</h3>)
            : null}
        </div>
        <div className={style.meter}>
          <div className={style.tipo}>
            <Stats valor={pokemon.life} nombre={"HP"} />
            <Stats valor={pokemon.strength} nombre={"Fuerza"} />
          </div>
          <div className={style.tipo}>
            <Stats valor={pokemon.defense} nombre={"Defensa"} />
            <Stats valor={pokemon.speed} nombre={"Velocidad"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pokemon;