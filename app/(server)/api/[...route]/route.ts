import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { prettyJSON } from 'hono/pretty-json'
import { dbConnection } from '../../db/dbConnection'
import { getMovies } from '../../services/getMovies'
import { getMoviesById } from '../../services/getMovieById'
import { getMoviesByGenres } from '../../services/getMoviesByGenres'
import { getMoviesByYear } from '../../services/getMoviesByYear'

// export const runtime = 'edge'

const app = new Hono().basePath('/api/v2')


app.use(prettyJSON())
app.use(async (_, next) => {
  await dbConnection()
  await next()
})

app.get('/movies', getMovies)
app.get('/movies/:id', getMoviesById)
app.get('/movies/genres/:genres', getMoviesByGenres)
app.get('/movies/year/:year', getMoviesByYear)

export const GET = handle(app)
