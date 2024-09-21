import { Context, Next, MiddlewareHandler } from "hono";
import { responseAPI } from "../utils/responseApi";
import { LRUCache } from 'lru-cache'

const rateLimitCache = new LRUCache({
  max: 1000, // Increased to handle more unique IPs
  ttl: 1000 * 60, // 60 seconds (1 minute)
})

export const rateLimitedMiddleware: MiddlewareHandler = async (c, next) => {
  const ip = c.req.header('x-forwarded-for') || 'unknown'
  let requestData = rateLimitCache.get(ip) as { count: number, timestamp: number } | undefined
  
  const now = Date.now()
  
  if (!requestData || now - requestData.timestamp >= 60000) {
    // If no previous request or 60 seconds have passed, reset the count
    requestData = { count: 1, timestamp: now }
  } else {
    // Increment the count for existing requests within 60 seconds
    requestData.count++
  }
  
  rateLimitCache.set(ip, requestData)
  
  // console.log(`IP: ${ip}, Request Count: ${requestData.count}`)
  
  if (requestData.count > 60) {
    return responseAPI({
      c,
      statusCode: 429,
      status: "error",
      message: "Too many requests. Please try again after 1 minute.",
      results: null,
    })
  }
  
  await next()
}