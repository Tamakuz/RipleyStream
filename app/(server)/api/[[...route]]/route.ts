import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { prettyJSON } from 'hono/pretty-json'
import { dbConnection } from '../../db/dbConnection'
import { getMovies } from '../../services/getMovies'
import { getMoviesById } from '../../services/getMovieById'
import { getMoviesByYear } from '../../services/getMoviesByYear'
import { honoMiddleware } from '../../services/honoMiddleware'

const app = new Hono().basePath('/api/v1')

app.use(prettyJSON())
app.use(async (_, next) => {
  await dbConnection()
  await next()
})

app.use(honoMiddleware)

app.get('/movies/discover', getMovies)
app.get('/movie/:id', getMoviesById)
app.get('/movies/year/:year', getMoviesByYear)

// Handle not found routes
app.notFound((c) => c.json({ message: 'Endpoint not found' }, 404))

export const GET = handle(app)
export const POST = handle(app)
