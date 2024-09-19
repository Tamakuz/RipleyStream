import { Context, Next } from "hono";
import { responseAPI } from "../utils/responseApi";
import { RateLimiter } from "limiter";

const limiter = new RateLimiter({
  tokensPerInterval: 5,
  interval: "hour",
});

export const rateLimitedMiddleware = async (c: Context, next: Next) => {
  try {
    const remainingRequests = await limiter.removeTokens(1);
    console.log(remainingRequests);
    
    if (remainingRequests <= 0) {
      c.json({
        status: "error",
        message: "Terlalu banyak permintaan, coba lagi nanti.",
        results: null
      })
    }
    
    await next();
  
  } catch (error) {
    console.error(error);
    return responseAPI({
      c,
      statusCode: 500,
      status: "error",
      message: "Internal server error",
      results: null,
    });
  }
};