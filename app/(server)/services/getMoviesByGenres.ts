import { Context } from "hono";
import { responseAPI } from "../utils/responseApi";
import Movie from "../models/movie.model";

export const getMoviesByGenres = async (c: Context) => {
  try {
    const { genres } = c.req.param();
    const page = Number(c.req.query().page) || 1;
    const limit = Number(c.req.query().limit) || 10;
    const genreArray = genres.split(',');
    const movies = await Movie.find({ 'genres.slug': { $in: genreArray } })
      .select('_id title poster status tmdb_id imdb_id synopsisID synopsisEN')
      .skip((page - 1) * limit)
      .limit(limit);
    const totalMovies = await Movie.countDocuments({ 'genres.slug': { $in: genreArray } });
    const totalPages = Math.ceil(totalMovies / limit);

    if (movies.length === 0) {
      return responseAPI({
        c,
        statusCode: 404,
        status: "error",
        message: "No movies found for the specified genres",
        results: [],
      });
    }

    return responseAPI({
      c,
      statusCode: 200,
      status: "success",
      results: {
        movies,
        totalPages,
        currentPage: page,
      },
      message: 'Movies fetched successfully',
    });
  } catch (error) {
    return responseAPI({
      c,
      statusCode: 500,
      status: "error",
      message: 'Failed to fetch movies',
      results: [],
    });
  }
}