import "./styles.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "services/FtpGames";

interface IGame {
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

const HighlightedShowcase = () => {
  const [highlightedGames, setHighlightedGames] = useState<object[]>([]);

  const getHighlightedGames = (data: object[]) => {
    const randomNumbers = new Set<number>();
    for (let i = 0; i < 3; i++) {
      const randomNumber: number = Math.floor(
        Math.random() * (data.length - 1)
      );
      randomNumbers.add(randomNumber);
    }

    let chosenGames: object[] = [];
    randomNumbers.forEach((item) => {
      chosenGames.push(data[item]);
    });

    return chosenGames;
  };

  useEffect(() => {
    axiosInstance.get("games").then(({ data }: { data: object[] }) => {
      const chosenGames = getHighlightedGames(data);
      setHighlightedGames(chosenGames);
    });
  }, []);

  return (
    <>
      <div className="highlighted--showcase"></div>
    </>
  );
};

export default HighlightedShowcase;
