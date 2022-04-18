import "./styles.css";

interface gameHeaderProps {
  gameName: string;
}

const GameHeader = ({ gameName }: gameHeaderProps) => {
  return <h1>{gameName}</h1>;
};

export default GameHeader;
