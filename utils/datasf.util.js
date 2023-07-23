import axios from "axios";
import { SFMOVIES_DATA_URI } from "../constants/dataEndpoints.constant.js";

export default async function getSFMoviesData() {
  const sfMoviesResponse = await axios.get(SFMOVIES_DATA_URI);
  const sfMoviesData = sfMoviesResponse.data;
  if (!sfMoviesData) {
    Promise.resolve({
      isError: true,
      message: "Unable to fetch SF movies data from https://data.sfgov.org/",
    });
  }
  return sfMoviesData;
}
