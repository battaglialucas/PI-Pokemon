import { useSelector } from "react-redux";
import React from "react";
function Tipos(){
    let losTipos = useSelector((store) => store.types);
    console.log(losTipos)
    return (<div>{losTipos.length ? (losTipos.map((tipo)=> <h1>{tipo.name}</h1>)): (<>cargando...</>)}</div>)
} 

export default Tipos;