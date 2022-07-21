import React from "react";
import { Link } from "react-router-dom";
import "./PokemonsDeHome.css";
import pokemonSinImagen from "../imagenes/pokemonSinImagen.jpg"

const PokemonsDeHome = ({ pokemons }) => {
  return (
    <>
      <div className="container">
        {pokemons.length ? (
          pokemons.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.id}`} key={pokemon.name}>
              <figure className={pokemon.types[0].name}>
                <div className="cardImageContainer">
                  <img src={pokemon.image ? (pokemon.image) : (pokemonSinImagen)} alt="" className="CardImage" />
                </div>
                <figcaption className="cardCaption">
                  <h1 className="cardName">#{pokemon.id}-{pokemon.name}</h1>
                  <div className="types">
                    {pokemon.types.map(type => 
                      <h3 className="cardType" key={type.name}>{type.name}</h3>)}
                    </div>
                </figcaption>
              </figure>
            </Link>
          ))
        ) : ( <h1>Ups, no hay pokemons...</h1>
        )}
      </div>
    </>
  );
};

export default PokemonsDeHome;