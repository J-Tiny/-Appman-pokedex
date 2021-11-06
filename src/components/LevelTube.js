import PropTypes from "prop-types";
import styled from "styled-components";
const Container = styled.div`
  progress[value] {
    width: ${(props) => props.width};
    appearance: none;
  }
  progress[value]::-webkit-progress-bar{
    height: 35px;
    border-radius: 20px;
    background-color: #e4e4e4;
    box-shadow: 0px 2px 2px #d4d4d4;
  }
  progress[value]::-webkit-progress-value{
    height: 35px;
    border-radius: 20px;
    background-color: ${(props) => props.color};
  }
`;
const LevelTube = (props) => {
  const { value, max, color, width } = props;
  return (
    <Container color={color} width={width}>
    <progress value={value} max={max} />
    </Container>
  );
};

LevelTube.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.string,
};
LevelTube.defaultProps = {
  max: 100,
  color: "#f3701a",
  width: "400px",
};
export default LevelTube;
