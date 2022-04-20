import GameHeader from "components/GameHeader";
import StartingAt from "components/StartingAt";
import CSS from "csstype";
import "./styles.css";

interface IGame {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  minimum_system_requirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  screenshots: [
    {
      id: number;
      image: string;
    }
  ];
}

interface gameProps {
  element: IGame;
}

const HighlightedGame = ({ element }: gameProps) => {
  const [{ image }] = element.screenshots;
  const gameStyles: CSS.Properties = {
    background: `url(${image}) center center/cover`,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backgroundBlendMode: "color",
  };

  return (
    <div style={gameStyles} key={element.id} className="gameCard">
      <GameHeader
        gameName={
          window.screen.width >= 992
            ? element.title.length < 30
              ? element.title
              : element.title.substring(0, 25) + "..."
            : element.title.length < 17
            ? element.title
            : element.title.substring(0, 13) + "..."
        }
      />
      <span>
        {window.screen.width >= 992
          ? element.short_description
          : element.short_description.length > 50
          ? element.short_description.substring(0, 45) + "..."
          : null}
      </span>
      <StartingAt />
    </div>
  );
};

export default HighlightedGame;
