import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
      index: true,  // Indeks untuk mempercepat pencarian berdasarkan title
    },
    tagline: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    revenue: {
      type: Number,
      default: null,
    },
    release_date: {
      type: String,
      default: null,
      index: true,  // Indeks untuk mempercepat pencarian berdasarkan release date
    },
    poster: [
      {
        poster_url: String,
        resolution: String,
        _id: false,
      },
    ],
    popularity: {
      type: Number,
      default: null,
    },
    rating: {
      type: Number,
      default: null,
    },
    synopsisEN: {
      type: String,
      default: null,
      index: true,  // Indeks untuk mempercepat pencarian berdasarkan synopsisEN
    },
    synopsisID: {
      type: String,
      default: null,
      index: true,  // Indeks untuk mempercepat pencarian berdasarkan synopsisID
    },
    imdb_id: {
      type: String,
      default: null,
    },
    tmdb_id: {
      type: Number,
      default: null,
    },
    genres: [
      {
        name: String,
        slug: String,
        _id: false,
      },
    ],
    budget: {
      type: Number,
      default: null,
    },
    urlStream: [
      {
        urlStream: String,
        resolution: String,
        _id: false,
      },
    ],
    alternative_titles: [
      {
        title: String,
        country: String,
        _id: false,
      },
    ],
    keywords: [
      {
        name: String,
        slug: String,
        _id: false,
      },
    ],
    cast: [
      {
        _id: false,
        originalName: String,
        characterName: String,
        images: [
          {
            imageUrl: String,
            resolution: String,
            _id: false,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// Menambahkan compound index untuk pencarian yang lebih kompleks
MovieSchema.index({ title: "text", synopsisEN: "text", synopsisID: "text" });
MovieSchema.index({ release_date: 1 });
MovieSchema.index({ genres: 1 });

const Movie = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);

export default Movie;
