import './App.css';
import { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAll, getTypes } from "./redux/actions";
import LandingPage from "./componentes/LandingPage";
import Navbar from "./componentes/Navbar";
import Home from "./componentes/Home";
import Form from "./componentes/Form";
import Pokemon from "./componentes/Pokemon";
import Tipos from "./componentes/Tipos";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAll());
  });

  return (
    <>
      <Navbar />
      <Route exact path="/pokemon/:id" >
        <Pokemon />
      </Route>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/Tipos">
        <Tipos />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/crearPokemon">
        <Form />
      </Route>
    </>
  );
}

export default App;
