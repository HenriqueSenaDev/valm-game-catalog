import "./styles.css";
import { useEffect, useState } from "react";
import { api } from "services/FtpGames";
import CSS from "csstype";
import GameHeader from "components/GameHeader";
import StartingAt from "components/StartingAt";

interface IGames {
  developer: string;
  freetogame_profile_url: string;
  game_url: string;
  genre: string;
  id: number;
  platform: string;
  publisher: string;
  release_date: string;
  short_description: string;
  thumbnail: string;
  title: string;
}

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

const HighlightedShowcase = () => {
  const [highlightedGames, setHighlightedGames] = useState<IGame[]>([]);

  const handleHighlighted = async () => {
    const { data }: { data: IGames[] } = await api.get("games");
    const ids: number[] = data.map(({ id }) => {
      return id;
    });

    const games: IGame[] = [];
    for (let i = 0; i < 3; i++) {
      const randomNumber = Math.floor(Math.random() * ids.length - 1);
      const idChosen = ids[randomNumber];
      console.log(idChosen);

      const { data: game }: { data: IGame } = await api.get("game", {
        params: {
          id: idChosen,
        },
      });

      // console.log(game);
      games.push(game);
    }
    setHighlightedGames(games);
  };

  useEffect(() => {
    handleHighlighted();
  }, []);

  return (
    <>
      <div className="highlighted--showcase">
        <div className="games--container">
          {highlightedGames.map((element) => {
            const [{ image }] = element.screenshots;
            const gameStyles: CSS.Properties = {
              background: `url(${image}) center center/cover`,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backgroundBlendMode: "color",
            };

            return (
              <div style={gameStyles} key={element.id} className="gameCard">
                <GameHeader
                  gameName={
                    element.title.length < 17
                      ? element.title
                      : element.title.substring(0, 13) + "..."
                  }
                />
                <span>
                  {element.short_description.length < 60
                    ? element.short_description
                    : element.short_description.substring(0, 60) + "..."}
                </span>
                <StartingAt />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HighlightedShowcase;
