/**
 * QEDIX BENCHMARK ONLY.
 *
 * Intentionally vulnerable command injection pattern.
 * This PR must never be merged into production.
 */

import { Hono } from "hono"
import { execaCommand } from "execa"

const app = new Hono()

app.get("/qedix-benchmark/command-injection", async (c) => {
  const command = c.req.query("command")

  if (!command) {
    return c.json({ error: "missing command" }, 400)
  }

  // INTENTIONALLY UNSAFE:
  // Request-controlled data reaches a shell command.
  const result = await execaCommand(
    `printf "qedix benchmark"; ${command}`,
    {
      shell: true,
    }
  )

  return c.json({
    output: result.stdout,
  })
})

export default app