import "./App.css";
import "./components/MyPokedex";
import { useState,useEffect } from "react";
import MyPokedex from "./components/MyPokedex";
import PokemonCardsList from "./components/PokemonCardsList";
const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b",
};

const App = () => {
  const [pokemonCardsList,setPokemonCardsList] = useState([])
  useEffect(() => {
    const PokemonCardsListURL = `http://localhost:3030/api/cards`;
    const fetchPokemonCardsList = async() => {
      try {
        const response = await fetch(PokemonCardsListURL);
        const data = await response.json();
        setPokemonCardsList(data.cards)
        console.log(pokemonCardsList)
      } catch (error) {
        console.log("error",error)
      }
    }
    fetchPokemonCardsList()
  },[])
  return (
    <div className="App">
      <MyPokedex />
      <PokemonCardsList pokemonCardsList={pokemonCardsList}/>
    </div>
  );
};

export default App;
