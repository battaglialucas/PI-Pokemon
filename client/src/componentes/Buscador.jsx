import React, { useState } from "react";
import style from "./buscador.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getByName } from "../redux/actions";
import { creado, orden, tipo } from "../redux/actions";
import {ordenarPokes, filtrarPokes,PokesPorOrigen} from "../filtros/index.js"

const Buscador = () => {
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState("");

  const options = useSelector((store) => store.types);
  let pokemonsParaFiltrar = useSelector((store) => store.pokemonsParaFiltrar);
  let pokemons = useSelector((store) => store.pokemons);
  const button = style.button;

  const handleInputChange = (e) => {
    setPokemon(e.target.value);
  };

  const porTipo = (e) => {
    let valor = (e.target.value)
    let pokes = filtrarPokes(pokemonsParaFiltrar, valor)
    dispatch(tipo(pokes))
  }

  const ordenadoPor = (e) => {
    let valores = (e.target.value.split(","))
    let pokes = ordenarPokes(pokemons,valores)
    dispatch(orden([pokes, valores]));
  }

  const creadoPor = (e) => {
    let valor = (e.target.value)
    let pokes = PokesPorOrigen(pokemonsParaFiltrar, valor)
    dispatch(creado(pokes))
  }

  const submit = (e) => {
    e.preventDefault();
    dispatch(getByName(pokemon));
    setPokemon("");
  };

  return (
    <div className={style.container}>
      <form onSubmit={submit}>
        <div className={style.field}>
          <input
            type="text"
            id="searchterm"
            value={pokemon}
            onChange={handleInputChange}
            placeholder="Encontrá tu pokemon..."
          />
          <input className={button} type="submit" value="Encontrar!" />
        </div>
      </form>
      <div className={style.field2}>
      
        <select className={button} onChange={porTipo} name="Tipo" >
          <option value="">Tipo:</option>
          {options?.map((p) => (
            <option value={p.name} key={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        
        <select name="creado" onChange={creadoPor} className={button} >
          <option value="">Creado por:</option>
          <option value="Pokedex">Pokedex</option>
          <option value="you">Vos!</option>
        </select>
        
        <select name="Ordenar" onChange={ordenadoPor} className={button} >
          <option value={["id", "menorAMayor"]}>Ordenar por:</option>
          <option value={["name", "menorAMayor"]}>A-Z</option>
          <option value={["name","mayorAMenor"]}>Z-A</option>
          <option value={["strength","mayorAMenor"]}>+ Fuertes</option>
          <option value={["strength","menorAMayor"]}>- Fuertes</option>
        </select>
      </div>
    </div>
  );
};
export default Buscador