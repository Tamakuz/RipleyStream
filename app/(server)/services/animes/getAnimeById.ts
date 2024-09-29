import { Context } from "hono";
import Anime from "../../models/anime.model";
import { responseAPI } from "../../utils/responseApi";
import mongoose from "mongoose";

export const getAnimeById = async (c: Context) => {
  try {
    const { id } = c.req.param();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return responseAPI({
        c,
        statusCode: 400,
        status: "error",
        message: "Invalid anime ID format",
        results: null,
      });
    }

    const anime = await Anime.findById(id).select('-__v');

    if (!anime) {
      return responseAPI({
        c,
        statusCode: 404,
        status: "error",
        message: "Anime not found",
        results: null,
      });
    }

    return responseAPI({
      c,
      statusCode: 200,
      status: "success",
      message: "Anime fetched successfully",
      results: anime,
    });
  } catch (error) {
    console.log(error);

    return responseAPI({
      c,
      statusCode: 500,
      status: "error",
      message: 'Failed to fetch anime',
      results: null,
    });
  }
}