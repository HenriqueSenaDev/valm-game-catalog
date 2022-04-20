import "./styles.css";
import { useEffect, useState } from "react";
import { api } from "services/FtpGames";
import HighlightedGame from "./HilghlightedGame";

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
            return <HighlightedGame element={element} key={element.title} />;
          })}
        </div>
      </div>
    </>
  );
};

export default HighlightedShowcase;
