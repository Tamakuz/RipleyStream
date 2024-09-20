import { Context } from "hono";
import MovieModel from "../models/movie.model";
import { responseAPI } from "../utils/responseApi";

export const getMovieCast = async (c: Context) => {
  try {
    const { movieId } = c.req.param();
    console.log(movieId)
    const movie = await MovieModel.findById(movieId);

    if (!movie) {
      return responseAPI({
        c,
        statusCode: 404,
        status: "error",
        message: "Cast not found",
        results: null,
      });
    }

    return responseAPI({
      c,
      statusCode: 200,
      status: "success",
      message: "Movie cast fetched successfully",
      results: movie.cast, 
    });
  } catch (error) {
    return responseAPI({
      c,
      statusCode: 500,
      status: "error",
      message: "Internal server error",
      results: null,  
    });
  }
}