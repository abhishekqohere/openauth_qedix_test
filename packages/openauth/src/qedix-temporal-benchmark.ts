/**
 * QEDIX BENCHMARK ONLY.
 *
 * Intentionally unsafe temporal/date handling.
 * This PR must never be merged into production.
 */

import { Hono } from "hono"

const app = new Hono()

app.get("/qedix-benchmark/temporal", (c) => {
  const now = Date.now()

  // INTENTIONALLY RISKY:
  // Treats one calendar day as exactly 86,400,000 milliseconds.
  // This assumption can be incorrect across DST transitions.
  const tomorrow = now + 86400000

  const hasReachedTomorrow = tomorrow > now

  const localDate = new Date(now)

  // INTENTIONALLY LOCAL-TIME DEPENDENT:
  // Behavior depends on the server's configured local timezone.
  localDate.setHours(7)

  const localDay = localDate.getDay()

  return c.json({
    hasReachedTomorrow,
    localDay,
  })
})

export default app