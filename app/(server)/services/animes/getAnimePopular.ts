import AnimeModel from "../../models/anime.model";
import { dbConnection } from "../../db/dbConnection";
import { responseAPI } from "../../utils/responseApi";
import { Context } from "hono";

export const getAnimePopular = async (c: Context) => {
  try {
    await dbConnection();

    const { page = "1", limit = "10" } = c.req.query();
    const animes = await AnimeModel.find({})
      .select('_id title status synopsisID synopsisEN rating images alternative_titles type airing aired score season year')
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ score: -1 })
      .lean()
      .exec();

    const totalAnimes = await AnimeModel.countDocuments({});
    const totalPages = Math.ceil(totalAnimes / Number(limit));

    if (!animes) {
      return responseAPI({
        c,
        statusCode: 404,
        status: "error",
        message: "No animes found",
        results: [],
      });
    }

    return responseAPI({
      c,
      statusCode: 200,
      status: "success",
      message: "Animes fetched successfully",
      results: {
        animes,
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
      message: "Error fetching animes",
      results: null,
    });
  }
};
