import axios from "axios";

const API_URI = "https://free-to-play-games-database.p.rapidapi.com/api/";

const getGameList = async () => {
  const options = {
    method: "GET",
    url: `${API_URI}games`,
    //Here are some API Keys from the RapidAPIPlatform. It's preferred that you use your own. However, if you are just taking an overview of the project and looking how it looks like you don't need be concerned about of.
    headers: {
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      "X-RapidAPI-Key": "cf99e9cb82mshac2a630fb9615f1p151641jsn19d732db38e7",
    },
  };

  const { data } = await axios.request(options as any);
  // console.log(data);
  return data;
};

const FtpGames = {
  getHighlightedGames: async () => {
    const allGames = await getGameList();
    let chosenIndexs = new Set<number>();
    for (let i = 0; i < 3; i++) {
      const randomNumber = Math.floor(Math.random() * (allGames.length - 1));
      chosenIndexs.add(randomNumber);
    }

    const chosenGames: object[] = [];
    chosenIndexs.forEach((item) => {
      chosenGames.push(allGames[item]);
    });

    console.log(chosenGames);
    return chosenGames;
  },
};

export default FtpGames;
