import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { prettyJSON } from 'hono/pretty-json'
import { dbConnection } from '../../db/dbConnection'
import { getMovies } from '../../services/getMovies'
import { getMoviesById } from '../../services/getMovieById'
import { honoMiddleware } from '../../services/honoMiddleware'
import { getMoviePopular } from '../../services/getMoviePopular'
import { responseAPI } from '../../utils/responseApi'
import { getMovieTopRated } from '../../services/getMovieTopRated'
const app = new Hono().basePath('/api/v1')

app.use(prettyJSON())
app.use(async (_, next) => {
  await dbConnection()
  await next()
})

app.use(honoMiddleware)

app.get('/movies/discover', getMovies)
app.get('/movie/:id', getMoviesById)
app.get('/movies/popular', getMoviePopular)
app.get('/movies/top-rated', getMovieTopRated)


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
