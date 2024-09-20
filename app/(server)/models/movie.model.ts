import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
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
    },
    synopsisID: {
      type: String,
      default: null,
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

const Movie = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);

export default Movie;
