import { useState } from "react";
import styled from "styled-components";
import PokemonCardsList from "./PokemonCardsList";
import cute from "../cute.png";
import LevelTube from "./LevelTube";
import React from 'react';
const Header = styled.div`
  width: 100%;
  text-align: center;
  background-color: white;
  padding: 20px 0 20px;
  font-size: 40px;
  position: absolute;
  z-index: 20;
`;
const MyPokedexBody = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;
const ButtomBar = styled.div`
  width: 100%;
  background-color: #ec5656;
  padding: 40px 0 40px;
  position: absolute;
  z-index: 20;
  bottom: 0;
  display: flex;
  justify-content: center;
  box-shadow: #d9333387;
`;
const ContainerCuteImg = styled.div`
  display: flex;
  flex-direction: row;
`;
const CardTube = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const AddButton = styled.div`
  background-color: #ec5656;
  width: 120px;
  height: 120px;
  color: white;
  position: absolute;
  border-radius: 100%;
  font-size: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 45%;
  cursor: pointer;
  z-index: 20;
`;
const CardBox = styled.div`
  position: relative;
  background-color: #f3f4f7;
  width: fit-content;
  height: fit-content;
  box-shadow: 0px 3px 3px 1px #d5d6dc;
  &:hover {
    box-shadow: 0px 3px 3px 1px #aeaeae;
  }
  margin-top: 30px;
  z-index: 10;
`;
const CuteImg = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 8px;
  margin-right: 5px;
`;
const CardContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;
const CardContainer = styled.div`
  padding: 10px;
  display: flex;
`;
const CardInfo = styled.div`
  width: 100%;
  font-family: "Atma", cursive;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
`;
const CardText = styled.div`
  display: flex;
  flex-direction: column;
`;
const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 80%;
  overflow-y: scroll;
  overflow-x: hidden;
  justify-items: center;
  margin-top: 80px;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const CardImg = styled.img`
  width: 130px;
  height: 200px;
`;
const RemoveButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 10px;
  padding-right: 15px;
  color: #de7777;
  font-size: 25px;
  cursor: pointer;
`;
const MyPokedex = (props) => {
  const [openCardsList, setOpenCardsList] = useState(false);
  const [pokedex, setPokedex] = useState([]);
  const [id, setId] = useState("");
  return (
    <MyPokedexBody>
      <Header>My Pokedex</Header>
      <ButtomBar />
      <AddButton
        onClick={() => {
          setOpenCardsList(true);
        }}
      >
        +
      </AddButton>
      <Cards>
      {openCardsList ? (
        <PokemonCardsList
          openCardsList={openCardsList}
          setOpenCardsList={setOpenCardsList}
          pokedex={pokedex}
          setPokedex={setPokedex}
        />
      ) : null}

      {pokedex.map((pokemonCard, index) => {
        let damage = 0;
        for (let i = 0; i < pokemonCard.attacks; i++) {
          damage += parseInt(pokemonCard.attacks[i].damage)? parseInt(pokemonCard.attacks[i].damage): 0;
        }
        let happiness = [];
        let happinessLength = Math.round(
          ((pokemonCard.hp === "None" ? 0 : pokemonCard.hp / 10) +(damage / 10) + 10 - (pokemonCard.supertype === "Pokémon" ? pokemonCard.weaknesses?.length : 0)) / 5
        );
        for (let i = 0; i < happinessLength; i++) {
          happiness.push(<CuteImg src={cute} alt="cute" key={i} />);
        }
        return (
          <CardBox
            key={pokemonCard.id}
            onMouseOver={() => setId(pokemonCard.id)}
            onMouseLeave={() => setId("")}
          >
            {id === pokemonCard.id ? (
              <RemoveButton
                key={pokemonCard.id}
                onClick={()=>{
                  pokedex.splice(index, 1);
                  setPokedex([
                    ...pokedex
                  ]);
                }}
              >
                X
              </RemoveButton>
            ) : null}
            <CardContainer>
              <CardImg src={pokemonCard.imageUrl} alt={pokemonCard.name} />
              <CardContainerInfo>
                <span style={{ fontSize: "30px", fontFamily: "Gaegu" }}>
                  {pokemonCard.name}
                </span>
                <CardInfo>
                  <CardText>
                    <span>HP</span>
                    <span>STR</span>
                    <span>WEAK</span>
                  </CardText>
                  <CardTube>
                    <LevelTube
                      value={
                        pokemonCard.hp === "None" || !pokemonCard.hp
                          ? 0
                          : parseInt(pokemonCard.hp)
                      }
                      width={
                        "230px"
                      }
                      height={
                        "25px"
                      }
                    />
                    <LevelTube
                      value={
                        pokemonCard.supertype === "Pokémon"
                          ? pokemonCard.attacks?.length * 50
                          : 0
                      }
                      width={
                        "230px"
                      }
                      height={
                        "25px"
                      }
                    />
                    <LevelTube
                      value={
                        pokemonCard.supertype === "Pokémon"
                          ? pokemonCard.weaknesses?.length * 100
                          : 0
                      }
                      width={
                        "230px"
                      }
                      height={
                        "25px"
                      }
                    />
                  </CardTube>
                </CardInfo>
                <ContainerCuteImg>{happiness}</ContainerCuteImg>
              </CardContainerInfo>
            </CardContainer>
          </CardBox>
        );
      })}
      </Cards>
    </MyPokedexBody>
  );
};
export default MyPokedex;