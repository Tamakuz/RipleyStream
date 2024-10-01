import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
  number_episode: Number,
  sources: String
}, { _id: false });

const genreSchema = new mongoose.Schema({
  name: String,
  slug: String
}, { _id: false });

const alternativeTitleSchema = new mongoose.Schema({
  type: String,
  title: String
}, { _id: false });

const imageSchema = new mongoose.Schema({
  image_url: String,
  small_image_url: String,
  large_image_url: String
}, { _id: false });

const animeSchema = new mongoose.Schema({
  title: String,
  synopsisID: String,
  synopsisEN: String,
  images: {
    jpg: imageSchema,
    webp: imageSchema
  },
  alternative_titles: [alternativeTitleSchema],
  type: String,
  source: String,
  status: String,
  airing: Boolean,
  aired: {
    from: Date,
    to: Date
  },
  duration: String,
  rating: String,
  score: Number,
  scored_by: Number,
  popularity: Number,
  season: String,
  year: Number,
  studios: [String],
  genres: [genreSchema],
  episodes: [episodeSchema]
});

// Add text index for searching
animeSchema.index({ title: 'text', synopsisID: 'text', synopsisEN: 'text' }); 

const Anime = mongoose.models.Anime || mongoose.model('Anime', animeSchema);

export default Anime;
