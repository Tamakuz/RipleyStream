import { Context, Next } from 'hono'
import { createMiddleware } from 'hono/factory'
import { responseAPI } from '../utils/responseApi';
import User from '@/app/(server)/models/user.model';
export const honoMiddleware = createMiddleware(async (c: Context, next: Next) => {
  try {
    const token = c.req.query('api_token');
    const user = await User.findOne({ tokenApi: token });
    if (!user) {
      return responseAPI({
        c,
        statusCode: 401,
        status: "error",
        message: 'Unauthorized access. Please provide a valid API token.',
        results: null,
      });
    }
    await next()
  } catch (error) {
    return responseAPI({
      c,
      statusCode: 500,
      status: "error",
      message: 'Internal server error',
      results: null,
    });
  }
})