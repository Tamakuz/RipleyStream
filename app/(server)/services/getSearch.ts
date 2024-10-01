import { Context } from "hono";
import Movie from "../models/movie.model";
import Anime from "../models/anime.model";
import { responseAPI } from "../utils/responseApi";

export const getSearch = async (c: Context) => {
  try {
    const { page = "1", limit = "10", query, year, genre, type } = c.req.query();

    // Check if query is empty
    if (!query) {
      return responseAPI({
        c,
        statusCode: 400,
        status: "error",
        message: "Query parameter is required",
        results: null,
      });
    }

    const searchCriteria: any = {};

    // Pencarian menggunakan text index untuk title, synopsisEN, dan synopsisID
    searchCriteria.$text = { $search: query };  // Gunakan fitur text search

    // Filter berdasarkan tahun
    if (year) {
      searchCriteria.release_date = { $regex: `^${year}`, $options: "i" };  // Masih bisa gunakan regex untuk ini
    }

    // Filter berdasarkan genre
    if (genre) {
      searchCriteria.genres = { $in: [genre] };  // Memanfaatkan indeks di genres
    }

    let Model, resultKey;
    if (type === 'animes') {
      Model = Anime;
      resultKey = 'animes';
    } else {
      Model = Movie;
      resultKey = 'movies';
    }

    // Query pencarian di MongoDB
    const results = await Model.find(searchCriteria)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select(type === 'animes' 
        ? '_id title status synopsisID synopsisEN rating images alternative_titles type airing aired score season year'
        : '_id title poster status tmdb_id imdb_id synopsisID synopsisEN tagline status release_date rating popularity genres')
      .lean()
      .exec()

    const totalResults = await Model.countDocuments(searchCriteria);
    const totalPages = Math.ceil(totalResults / Number(limit));

    // Jika tidak ditemukan hasil
    if (results.length === 0) {
      return responseAPI({
        c,
        statusCode: 404,
        status: "error",
        message: `No ${resultKey} found matching the search criteria`,
        results: null,
      });
    }

    // Berhasil mendapatkan hasil
    return responseAPI({
      c,
      statusCode: 200,
      status: "success",
      message: `${resultKey.charAt(0).toUpperCase() + resultKey.slice(1)} fetched successfully`,
      results: {
        [resultKey]: results,
        totalPages,
        currentPage: Number(page),
      },
    });
  } catch (error) {
    console.error(error);
    return responseAPI({
      c,
      statusCode: 500,
      status: "error",
      message: "Error searching",
      results: null,
    });
  }
};
