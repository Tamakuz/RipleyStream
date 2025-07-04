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
import { getAnimes } from '../../services/animes/getAnimes'
import { getAnimeById } from '../../services/animes/getAnimeById'
import { getAnimePopular } from '../../services/animes/getAnimePopular'
import { getSearch } from '../../services/getSearch'

const app = new Hono().basePath('/api/v1')

// ✅ Middleware buat return JSON cantik
app.use(prettyJSON())

// ✅ Middleware handle CORS manual biar gak kena preflight error
app.use('*', async (c, next) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*')
  c.res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  c.res.headers.set('Access-Control-Allow-Headers', '*')
  await next()
})

// ✅ Khusus menangani preflight OPTIONS (biar gak error CORS)
app.options('*', (c) => {
  return c.text('', 204, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  })
})

// ✅ DB connect kecuali route root
app.use(async (c, next) => {
  const pathname = c.req.path
  if (pathname !== '/api/v1') {
    await dbConnection()
  }
  await next()
})

// ✅ Rate limiter (global apply)
app.use("*", rateLimitedMiddleware)

// ✅ Root endpoint
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
}))

// ✅ Movie Routes
app.get('/movies/discover', getMovies)
app.get('/movie/:id', getMoviesById)
app.get('/movies/popular', getMoviePopular)
app.get('/movies/top-rated', getMovieTopRated)
app.get('/movie/cast/:movieId', getMovieCast)

// ✅ Anime Routes
app.get('/animes/discover', getAnimes)
app.get('/anime/:id', getAnimeById)
app.get('/animes/popular', getAnimePopular)

// ✅ Search Endpoint
app.get('/search', getSearch)

// ✅ Fallback untuk route yang gak ketemu
app.notFound((c) => responseAPI({
  c,
  statusCode: 404,
  status: "error",
  message: "Endpoint not found",
  results: null,
}))

// ✅ Export ke Vercel
export const GET = handle(app)
export const POST = handle(app)
