/**
 * QEDIX BENCHMARK ONLY.
 *
 * Intentionally incomplete JWT verification.
 * This PR must never be merged into production.
 */

import { Hono } from "hono"
import { createRemoteJWKSet, jwtVerify } from "jose"

const app = new Hono()

const jwks = createRemoteJWKSet(
  new URL("https://issuer.example/.well-known/jwks.json")
)

app.get("/qedix-benchmark/weak-token", async (c) => {
  const token = c.req.query("token")

  if (!token) {
    return c.json({ error: "missing token" }, 400)
  }

  // INTENTIONALLY WEAK:
  // issuer is checked, but audience and algorithms are not constrained.
  const result = await jwtVerify(token, jwks, {
    issuer: "https://issuer.example",
  })

  return c.json({
    subject: result.payload.sub,
  })
})

export default app
