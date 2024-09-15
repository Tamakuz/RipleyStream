import { Context } from "hono"
import { responseAPI } from "../utils/responseApi"
import Movies from "../models/movie.model"

export const getMovies = async (c: Context) => {
  try {
    const { page = '1', limit = '10' } = c.req.query();
    const sortCriteria = {};
    const movies = await Movies.find()
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort(sortCriteria)
      .select('_id title poster status tmdb_id imdb_id synopsisID synopsisEN');

    const totalMovies = await Movies.countDocuments();
    const totalPages = Math.ceil(totalMovies / Number(limit));

    if (movies.length === 0) {
      return responseAPI({
        c,
        statusCode: 404,
        status: "error",
        message: "No movies found",
        results: [],
      })
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
      message: 'Failed to fetch movies',
      results: [],
    });
  }
}