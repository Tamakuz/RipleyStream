import { Context } from "hono";
import Movie from "../models/movie.model";
import { responseAPI } from "../utils/responseApi";
import mongoose from "mongoose";

export const getMoviesById = async (c: Context) => {
  try {
    const { id } = c.req.param();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return responseAPI({
        c,
        statusCode: 400,
        status: "error",
        message: "Invalid movie ID format",
        results: null,
      });
    }

    const movie = await Movie.findById(id).select('-__v');

    if (!movie) {
      return responseAPI({
        c,
        statusCode: 404,
        status: "error",
        message: "Movie not found",
        results: null,
      });
    }

    return responseAPI({
      c,
      statusCode: 200,
      status: "success",
      message: "Movie fetched successfully",
      results: movie,
    });
  } catch (error) {
    console.log(error);

    return responseAPI({
      c,
      statusCode: 500,
      status: "error",
      message: 'Failed to fetch movie',
      results: null,
    });
  }
}