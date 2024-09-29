import { Context } from "hono"
import { responseAPI } from "../../utils/responseApi"
import Anime from "../../models/anime.model"

export const getAnimes = async (c: Context) => {
  try {
    const { page = '1', limit = '10', genre = '', year = '' } = c.req.query();

    let options = {};

    if (genre) {
      options = { ...options, 'genres.slug': { $in: genre.toLocaleLowerCase().split(',') } };
    }

    if (year) {
      options = { ...options, release_date: { $regex: `^${year}` } };
    }

    const animes = await Anime.find(options)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select('_id title status synopsisID synopsisEN rating images alternative_titles type airing aired score season year ');

    const totalAnimes = await Anime.countDocuments(options);
    const totalPages = Math.ceil(totalAnimes / Number(limit));

    if (animes.length === 0) {
      return responseAPI({
        c,
        statusCode: 404,
        status: "error",
        message: "No animes found",
        results: [],
      })
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
      message: 'Failed to fetch animes',
      results: [],
    });
  }
}