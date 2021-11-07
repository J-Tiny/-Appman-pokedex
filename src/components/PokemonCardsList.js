import styled from "styled-components";
import searchIcon from "../search.png";
import LevelTube from "./LevelTube";
import cute from "../cute.png";
import { useState, useEffect, useRef } from "react";
const ModalOutside = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left:0;
  background-color: #000000a3;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;
const ModalContent = styled.div`
  width: 90%;
  height: 90%;
  background-color: white;
  box-shadow: #474444;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
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
  z-index: 100;
`;
const SearchBox = styled.div`
  width: 100%;
  border: 2px solid #e6e6e6;
  display: flex;
  border-radius: 5px;
  position: relative;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  font-family: "Gaegu";
  font-weight: bold;
  font-size: x-large;
  border: none;
  &:focus {
    outline: none;
  }
`;
const SearchIcon = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  right: 0;
`;
const CardBox = styled.div`
  position: relative;
  background-color: #f3f4f7;
  width: 98%;
  height: fit-content;
  box-shadow: 0px 3px 3px 1px #d5d6dc;
  &:hover {
    box-shadow: 0px 3px 3px 1px #aeaeae;
  }
  margin-top: 30px;
`;
const CardImg = styled.img`
  width: 180px;
  height: 250px;
`;
const CardContainer = styled.div`
  padding: 10px;
  display: flex;
`;
const CardInfo = styled.div`
  width: 100%;
  font-family: "Atma", cursive;
  font-size: 25px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
`;
const CardText = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardTube = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;
const CardContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;
const CuteImg = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 8px;
  margin-right: 5px;
`;
const ContainerCuteImg = styled.div`
  display: flex;
  flex-direction: row;
`;
const AddButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 10px;
  padding-right: 15px;
  color: #de7777;
  font-size: 25px;
  cursor: pointer;
`;
const PokemonCardsList = (props) => {
  const [pokemonCardsList, setPokemonCardsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredPokemonCardsList, setFilteredPokemonCardsList] = useState([]);
  const [id, setId] = useState("");
  const PokemonCardsListURL = `http://localhost:3030/api/cards?limit=100`;
  const fetchPokemonCardsList = async () => {
    try {
      const response = await fetch(PokemonCardsListURL);
      const data = await response.json();
      if(pokemonCardsList.length===0){
        setPokemonCardsList(data.cards);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  function handleRemove(id) {
    const newPokemonCardsList = pokemonCardsList.filter((item) => item.id !== id);
    setPokemonCardsList(newPokemonCardsList)
  }
  const ref = useRef();
  const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  };
  useOnClickOutside(ref, () => props.setOpenCardsList(false));
  useEffect(() => {
    fetchPokemonCardsList();
  }, []);
  useEffect(() => {
    if (searchInput !== "") {
      const filteredPokemonCardsList = pokemonCardsList.filter(
        (pokemonCard) => {
          return (
            pokemonCard.name
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            pokemonCard.type.toLowerCase().includes(searchInput.toLowerCase())
          );
        }
      );
      setFilteredPokemonCardsList(filteredPokemonCardsList);
    } else {
      setPokemonCardsList(pokemonCardsList);
    }
  }, [searchInput]);
  return (
    <>
      {props.openCardsList ? (
        <ModalOutside>
          <ModalContent ref={ref}>
            <SearchBox>
              <SearchInput
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                placeholder="Find pokemon"
              />
              <SearchIcon src={searchIcon} alt="searchIcon" />
            </SearchBox>
            {
              searchInput.length === 0
                ? pokemonCardsList.map((pokemonCard,index) => {
                    let damage = 0;
                    pokemonCard.attacks?.map((attack) => {
                      damage += parseInt(attack.damage)
                        ? parseInt(attack.damage)
                        : 0;
                    });
                    let happiness = [];
                    let happinessLength = Math.round(
                      ((pokemonCard.hp === "None" ? 0 : pokemonCard.hp / 10) +
                        damage / 10 +
                        10 -
                        (pokemonCard.supertype === "Pokémon"
                          ? pokemonCard.weaknesses?.length
                          : 0)) /
                        5
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

                        {id === pokemonCard.id ? (<AddButton
                            onClick={() => {
                              props.pokedex.push(pokemonCard);
                              pokemonCardsList.splice(pokemonCard.id,1)
                              setPokemonCardsList([...pokemonCardsList])
                            }}
                            key={pokemonCard.id}
                          >
                            Add
                          </AddButton>):null}
                        <CardContainer>
                          <CardImg
                            src={pokemonCard.imageUrl}
                            alt={pokemonCard.name}
                          />
                          <CardContainerInfo>
                            <span
                              style={{ fontSize: "40px", fontFamily: "Gaegu" }}
                            >
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
                                />
                                <LevelTube
                                  value={
                                    pokemonCard.supertype === "Pokémon"
                                      ? pokemonCard.attacks?.length * 50
                                      : 0
                                  }
                                />
                                <LevelTube
                                  value={
                                    pokemonCard.supertype === "Pokémon"
                                      ? pokemonCard.weaknesses?.length * 100
                                      : 0
                                  }
                                />
                              </CardTube>
                            </CardInfo>
                            <ContainerCuteImg>{happiness}</ContainerCuteImg>
                          </CardContainerInfo>
                        </CardContainer>
                      </CardBox>
                    );
                  })
                :
              filteredPokemonCardsList.map((pokemonCard, index) => {
  
                let damage = 0;
                pokemonCard.attacks?.forEach((attack) => {
                  damage += parseInt(attack.damage)
                    ? parseInt(attack.damage)
                    : 0;
                });
                let happiness = [];
                let happinessLength = Math.round(
                  ((pokemonCard.hp === "None" ? 0 : pokemonCard.hp / 10) +
                    damage / 10 +
                    10 -
                    (pokemonCard.supertype === "Pokémon"
                      ? pokemonCard.weaknesses?.length
                      : 0)) /
                    5
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
                      <AddButton
                        onClick={() => {
                          props.setPokedex([...props.pokedex, pokemonCard]);
                          handleRemove(pokemonCard.id)
                          filteredPokemonCardsList.splice(index, 1);
                          setFilteredPokemonCardsList([...filteredPokemonCardsList]);
                        }}
                        key={pokemonCard.id}
                      >
                        Add
                      </AddButton>
                    ) : null}
                    <CardContainer>
                      <CardImg
                        src={pokemonCard.imageUrl}
                        alt={pokemonCard.name}
                      />
                      <CardContainerInfo>
                        <span style={{ fontSize: "40px", fontFamily: "Gaegu" }}>
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
                            />
                            <LevelTube
                              value={
                                pokemonCard.supertype === "Pokémon"
                                  ? pokemonCard.attacks?.length * 50
                                  : 0
                              }
                            />
                            <LevelTube
                              value={
                                pokemonCard.supertype === "Pokémon"
                                  ? pokemonCard.weaknesses?.length * 100
                                  : 0
                              }
                            />
                          </CardTube>
                        </CardInfo>
                        <ContainerCuteImg>{happiness}</ContainerCuteImg>
                      </CardContainerInfo>
                    </CardContainer>
                  </CardBox>
                );
              })
            }
          </ModalContent>
        </ModalOutside>
      ) : null}
    </>
  );
};
export default PokemonCardsList;
