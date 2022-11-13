import "dotenv/config";
import https from "https";
import Movie from "../model/movie.js";

const getAllMoviesList = (request, response) => {
  try {
    const apiUrl = process.env.API_URL;
    https.get(apiUrl, (res) => {
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

// const validateCoordinates = (movie) => {
//   //check lat & long coordinates present ot not
//   if (!movie[i].latitude || !movie[i].longitude) return false;
//   return true;
// };

// const getCoordinatesfromPositionStack = (location) => {
//   try {
//     let coordinates = {};
//     const positionStackApiUrl = `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITION_STACK_TOKEN}&query=${location}`;

//     https.get(positionStackApiUrl, (res) => {
//       let rawData = "";
//       res.on("data", (chunk) => {
//         rawData += chunk;
//       });
//       res.on("end", () => {
//         const response = JSON.parse(rawData);
//         coordinates.latitude = response.data[0].latitude;
//         coordinates.longitude = response.data[0].longitude;
//       });
//     });
//     return coordinates;
//   } catch (error) {
//     console.log(error);
//   }
// };

const geocodeMoviesList = (request, response, next) => {
  try {
    let length = request.body.moviesList.length;
    for (let i = 0; i < length; i++) {
      if (request.body.moviesList[i].locations) {
        const coordinates = getCoordinatesfromPositionStack(
          request.body.moviesList[i].locations
        );
        request.body.moviesList[i].latitude = coordinates.latitude;
        request.body.moviesList[i].latitude = coordinates.longitude;
      } else {
        //no location then update to san francisco location
        request.body.moviesList[i].latitude = 37.773972;
        request.body.moviesList[i].latitude = -122.431297;
      }
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

//add movie into DB onlyafter geocoding the location
const addMoviesToDb = async (request, response) => {
  try {
    if (request.body.moviesList === undefined) {
      return new Error("Provide 'moviesList' ");
    }
    const moviesList = request.body.moviesList;
    for (let i = 0; i < moviesList.length; i++) {
      await Movie.create(moviesList[i]);
    }
    response.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

export { getAllMoviesList, addMoviesToDb, geocodeMoviesList };
