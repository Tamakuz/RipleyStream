import MovieModel from "../models/movie.model";
import { dbConnection } from "../db/dbConnection";
import { responseAPI } from "../utils/responseApi";
import { Context } from "hono";

export const getMovieTopRated = async (c: Context) => {
  try {
    const { page = "1", limit = "10" } = c.req.query();
    const movies = await MovieModel.find({})
      .select('_id title poster status tmdb_id imdb_id synopsisID synopsisEN tagline status release_date rating popularity')
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ rating: -1 })
      .lean()
      .exec();

    const totalMovies = await MovieModel.countDocuments({});
    const totalPages = Math.ceil(totalMovies / Number(limit));

    if (!movies) {
      return responseAPI({
        c,
        statusCode: 404,
        status: "error",
        message: "No movies found",
        results: [],
      });
    }

    return responseAPI({
      c,
      statusCode: 200,
      status: "success",
      message: "Movies fetched successfully",
      results: {
        movies,
        totalPages,
        currentPage: Number(page),
      },
    });
  } catch (error) {
    console.log(error);
    return responseAPI({
      c,
      statusCode: 500,
      status: "error",
      message: "Error fetching movies",
      results: null,
    });
  }
};
