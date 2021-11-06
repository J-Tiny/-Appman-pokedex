import styled from "styled-components";
const Header = styled.div`
  width: 100%;
  text-align: center;
  background-color: white;
  padding: 20px 0 20px;
  font-size: 40px;
`;
const MyPokedexBody = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
`;
const ButtomBar = styled.div`
  width: 100%;
  background-color: #ec5656;
  padding: 40px 0 40px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  box-shadow: #d9333387;
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
`;
const MyPokedex = () => {
  return (
    <MyPokedexBody>
      <Header>My Pokedex</Header>
      <ButtomBar/>
      <AddButton>+</AddButton>
    </MyPokedexBody>
  );
};
export default MyPokedex;
