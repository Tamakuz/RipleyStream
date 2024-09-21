import { Context } from "hono";
import Movie from "../models/movie.model";
import { responseAPI } from "../utils/responseApi";

export const getSearchMovie = async (c: Context) => {
  try {
    const { page = "1", limit = "10", query, year, genre } = c.req.query();

    const searchCriteria: any = {};

    // Pencarian menggunakan text index untuk title, synopsisEN, dan synopsisID
    if (query) {
      searchCriteria.$text = { $search: query };  // Gunakan fitur text search
    }

    // Filter berdasarkan tahun
    if (year) {
      searchCriteria.release_date = { $regex: `^${year}`, $options: "i" };  // Masih bisa gunakan regex untuk ini
    }

    // Filter berdasarkan genre
    if (genre) {
      searchCriteria.genres = { $in: [genre] };  // Memanfaatkan indeks di genres
    }

    // Query pencarian di MongoDB
    const movies = await Movie.find(searchCriteria)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select('_id title poster status tmdb_id imdb_id synopsisID synopsisEN tagline status release_date rating popularity genres')
      .lean()
      .exec()

    const totalMovies = await Movie.countDocuments(searchCriteria);
    const totalPages = Math.ceil(totalMovies / Number(limit));

    // Jika tidak ditemukan film
    if (movies.length === 0) {
      return responseAPI({
        c,
        statusCode: 404,
        status: "error",
        message: "No movies found matching the search criteria",
        results: null,
      });
    }

    // Berhasil mendapatkan film
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
    console.error(error);
    return responseAPI({
      c,
      statusCode: 500,
      status: "error",
      message: "Error searching movies",
      results: null,
    });
  }
};
