const axios = require("axios").default;

export const axiosInstance = axios.create({
  baseURL: "https://free-to-play-games-database.p.rapidapi.com/api/",
  headers: {
    //Here are some API Keys from the RapidAPIPlatform. It's preferred that you use your own. However, if you are just taking an overview of the project and looking how it looks like you don't need be concerned about of.
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    "X-RapidAPI-Key": "cf99e9cb82mshac2a630fb9615f1p151641jsn19d732db38e7",
  },
});
