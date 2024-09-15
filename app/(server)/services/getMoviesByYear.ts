import { Context } from "hono";
import { responseAPI } from "../utils/responseApi";
import Movie from "../models/movie.model";

export const getMoviesByYear = async (c: Context) => {
  try {
    const { year } = c.req.param();
    const { page = '1', limit = '10' } = c.req.query();
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      return responseAPI({
        c,
        statusCode: 400,
        status: "error",
        message: 'Invalid page or limit parameter.',
        results: [],
      });
    }

    const movies = await Movie.find({ release_date: { $regex: `^${year}` } })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .select('_id title poster status tmdb_id imdb_id synopsisID synopsisEN');

    const totalMovies = await Movie.countDocuments({ release_date: { $regex: `^${year}` } });
    const totalPages = Math.ceil(totalMovies / limitNumber);

    if (movies.length === 0) {
      return responseAPI({
        c,
        statusCode: 404,
        status: "error",
        results: [],
        message: 'No movies found for the specified year',
      });
    }

    return responseAPI({
      c,
      statusCode: 200,
      status: "success",
      results: {
        movies,
        totalPages,
        currentPage: pageNumber,
      },
      message: 'Movies fetched successfully',
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