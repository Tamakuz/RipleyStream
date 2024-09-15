import { Context } from "hono"
import { StatusCode } from "hono/utils/http-status"

export const responseAPI = ({
  c,
  statusCode,
  status,
  message,
  results,
}: {
  c: Context
  statusCode: StatusCode
  status: string
  message: string
  results: any
}) => {
  c.status(statusCode)
  return c.json({
    statusCode,
    status,
    message,
    results,
  })
}