import {
  MAXIMUM_MOVIES_RESPONSE_COUNT,
  MOVIE_DIRECTOR_FILTER,
  MOVIE_LOCATION_FILTER,
  MOVIE_TITLE_FILTER,
} from "../constants/filter.constant.js";
import getSFMoviesData from "../utils/datasf.util.js";
import reverseGeocode from "../utils/positionstack.util.js";

const forwardGeocodeMoviesLocation = async (moviesData) => {
  const promiseList = moviesData.map(async (movie) => {
    const reverseGeocodedData = await reverseGeocode(movie.locations);
    if (reverseGeocodedData.length > 0) {
      movie.latitude = reverseGeocodedData[0]?.latitude;
      movie.longitude = reverseGeocodedData[0]?.longitude;
    } else {
    }
    return movie;
  });
  try {
    moviesData = await Promise.all(promiseList);
  } catch (exception) {
    return Promise.resolve({
      isError: true,
      message: "Unable to forward geocode a location",
      error: exception,
    });
  }
  return moviesData;
};

const filterMoviesData = (moviesData, filter, inputText) => {
  moviesData = moviesData.filter((movie) => {
    return !!movie.locations;
  });
  if (filter == MOVIE_TITLE_FILTER) {
    moviesData = moviesData.filter((movie) => {
      return (
        movie.title &&
        movie.title.toLowerCase().includes(inputText.toLowerCase())
      );
    });
  } else if (filter == MOVIE_LOCATION_FILTER) {
    moviesData = moviesData.filter((movie) => {
      return (
        movie.locations &&
        movie.locations.toLowerCase().includes(inputText.toLowerCase())
      );
    });
  } else if (filter == MOVIE_DIRECTOR_FILTER) {
    moviesData = moviesData.filter((movie) => {
      return (
        movie.director &&
        movie.director.toLowerCase().includes(inputText.toLowerCase())
      );
    });
  }
  moviesData = moviesData.slice(0, MAXIMUM_MOVIES_RESPONSE_COUNT);
  return moviesData;
};

const validateRequestData = (inputText, filter) => {
  if (
    (!inputText || inputText.length == 0) &&
    (!filter || filter.length == 0) &&
    (filter != MOVIE_TITLE_FILTER ||
      filter != MOVIE_LOCATION_FILTER ||
      filter != MOVIE_DIRECTOR_FILTER)
  ) {
    return false;
  } else {
    return true;
  }
};

const autocompleteSearch = async (req, res) => {
  const inputText = req?.body?.inputText;
  const filterType = req?.body?.filterType;

  if (!validateRequestData(inputText, filterType)) {
    res.send({
      data: null,
      statusMessage: "Invalid Request Body Data",
    });
    return;
  }
  const sfMoviesResponseData = await getSFMoviesData();
  if (sfMoviesResponseData.isError && sfMoviesResponseData.isError == true) {
    res.send({
      data: null,
      statusMessage: sfMoviesResponseData.message,
    });
    return;
  }
  const filteredMoviesData = filterMoviesData(
    sfMoviesResponseData,
    filterType,
    inputText
  );
  const filteredMoviesDataWithCoordinates = await forwardGeocodeMoviesLocation(
    filteredMoviesData
  );
  if (
    filteredMoviesDataWithCoordinates.isError &&
    filteredMoviesDataWithCoordinates.isError == true
  ) {
    res.send({
      data: null,
      statusMessage: filteredMoviesDataWithCoordinates.message,
      error: filteredMoviesDataWithCoordinates?.error,
    });
    return;
  }

  res.send({
    data: filteredMoviesDataWithCoordinates,
    statusMessage: "Succesfully Sent Data",
  });
};

export default autocompleteSearch;
