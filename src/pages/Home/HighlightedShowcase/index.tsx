import "./styles.css";
import React, { useEffect, useState } from "react";
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
  const [gameListX, setGameListX] = useState<number>(
    document.documentElement.clientWidth >= 992 ? 0 : 20
  );

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


  let touchStart: number;
  const handleToucheStart = (event: any) => {
    touchStart = event.changedTouches[0].clientX;
  }
  const handleToucheEnd = (event: any) => {
    const touchEnd = event.changedTouches[0].clientX;

    if (touchStart - touchEnd <= -100) {
      let x = gameListX + (document.documentElement.clientWidth * 0.6);
      if (x > 20) {
        x = 20;
      }
      setGameListX(x);
    }

    if (touchStart - touchEnd >= 100) {
      let x = gameListX - (document.documentElement.clientWidth * 0.6);
      const lisW = document.documentElement.clientWidth < 576 ? 645 : 1320;
      if ((document.documentElement.clientWidth - lisW) > x) {
        x = (document.documentElement.clientWidth - lisW) - 10;
      }
      setGameListX(x);
    }
  }

  return (
    <>
      <div className="highlighted--showcase">
        <div className="highlightedGames--container">
          <div className="highlightedGames--list"
            style={{
              marginLeft: gameListX
            }}
            onTouchStart={handleToucheStart}
            onTouchEnd={handleToucheEnd}
          >
            {highlightedGames[0] &&
              <>
                <HighlightedGame element={highlightedGames[0]} key={highlightedGames[0].title} />
                <div className="gameWrapper">
                  {highlightedGames.map((element, index) => {
                    return index > 0 ?
                      <HighlightedGame element={element} key={element.title} /> : null
                  })}
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default HighlightedShowcase;
