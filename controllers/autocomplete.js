import Movie from "../model/movie.js";

const autocompleteSearch = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.inputText == "") {
      res.send({
        result: [],
      });
    } else if (!req.body.inputText || !req.body.filter) {
      res
        .status(400)
        .send("inputText/filter is missing . please specify in request body");
    } else {
      const inputText = req.body.inputText;
      const filter = req.body.filter;
      let search;

      switch (filter) {
        case "movie":
          search = await Movie.find({
            title: { $regex: new RegExp("^" + inputText + ".*", "i") },
          }).exec();
          break;
        case "locations":
          search = await Movie.find({
            locations: { $regex: new RegExp("^" + inputText + ".*", "i") },
          }).exec();
          break;
        case "director":
          search = await Movie.find({
            director: { $regex: new RegExp("^" + inputText + ".*", "i") },
          }).exec();
          break;
        default:
          break;
      }

      //limit search results to top 5
      if (search) search = search.slice(0, 5);

      res.status(200).send({
        result: search,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { autocompleteSearch };
