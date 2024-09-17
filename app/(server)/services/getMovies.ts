import { Context } from "hono"
import { responseAPI } from "../utils/responseApi"
import Movies from "../models/movie.model"

export const getMovies = async (c: Context) => {
  try {
    const { page = '1', limit = '10', genre = '', year = ''} = c.req.query();

    let options = {};

    if (genre) {
      options = { ...options, 'genres.slug': { $in: genre.toLocaleLowerCase().split(',') } };
    }

    if (year) {
      options = { ...options, release_date: { $regex: `^${year}` } };
    }

    const movies = await Movies.find(options)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select('_id title poster status tmdb_id imdb_id synopsisID synopsisEN');

    const totalMovies = await Movies.countDocuments(options);
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