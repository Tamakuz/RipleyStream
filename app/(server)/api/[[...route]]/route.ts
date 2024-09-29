import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { prettyJSON } from 'hono/pretty-json'
import { dbConnection } from '../../db/dbConnection'
import { getMovies } from '../../services/movies/getMovies'
import { getMoviesById } from '../../services/movies/getMovieById'
import { getMoviePopular } from '../../services/movies/getMoviePopular'
import { responseAPI } from '../../utils/responseApi'
import { getMovieTopRated } from '../../services/movies/getMovieTopRated'
import { rateLimitedMiddleware } from '../../services/rateLimited'
import { getMovieCast } from '../../services/movies/getMovieCast'
import { getSearchMovie } from '../../services/getSearchMovie'
import { honoMiddleware } from '../../services/honoMiddleware'
import { getAnimes } from '../../services/animes/getAnimes'
import { getAnimeById } from '../../services/animes/getAnimeById'
import { getAnimePopular } from '../../services/animes/getAnimePopular'

const app = new Hono().basePath('/api/v1')

app.use(prettyJSON())
app.use(async (c, next) => {
  const pathname = c.req.path;
  if (pathname !== '/api/v1') {
    await dbConnection();
  }
  await next();
})

// app.use(honoMiddleware)
app.use("*", rateLimitedMiddleware)

app.get('', (c) => responseAPI({
  c,
  statusCode: 200,
  status: "success",
  message: "Welcome to the Movie and Anime API Stream",
  results: {
    version: "1.0",
    description: "This API provides information about movies and animes",
    endpoints: [
      "/movies/discover",
      "/movie/:id",
      "/movies/popular",
      "/movies/top-rated",
      "/movie/cast/:movieId",
      "/movies/search",
      "/animes/discover"
    ],
    documentation: "For more information, please refer to the API documentation"
  }
}));

app.get('/movies/discover', getMovies)
app.get('/movie/:id', getMoviesById)
app.get('/movies/popular', getMoviePopular)
app.get('/movies/top-rated', getMovieTopRated)
app.get('/movie/cast/:movieId', getMovieCast)
app.get('/movies/search', getSearchMovie)

app.get('/animes/discover', getAnimes)
app.get('/anime/:id', getAnimeById)
app.get('/animes/popular', getAnimePopular)
// Handle not found routes
app.notFound((c) => responseAPI({
  c,
  statusCode: 404,
  status: "error",
  message: "Endpoint not found",
  results: null,
}))

export const GET = handle(app)
export const POST = handle(app)
