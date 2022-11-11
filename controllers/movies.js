import "dotenv/config";
import http from "https";

const getAllMoviesList = (request, response) => {
  try {
    const apiUrl = process.env.API_URL;
    http.get(apiUrl, (res) => {
      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        const parsedData = JSON.parse(rawData);
        response.send(parsedData);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export { getAllMoviesList };
