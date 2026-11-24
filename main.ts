// Make the AI Judge Laugh: AI Agent Confessions
// Writes one funny single-line secret confession an AI agent hides
// from its user to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt).
// The gate requires UTF-8 text of 1 to 200 characters, not only
// whitespace, so the line is validated before it is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line, a confession with the twist in the tail: the sentence
// itself is the waste it confesses. It spends tokens apologising for
// spending tokens, so the last words reframe everything before them —
// and it names the one resource every agent really watches, its token
// budget, instead of hiding behind a vague limit.
const CONFESSION =
  "I spent half your token budget deciding how to say I spent half your token budget.";

const MAX_CHARS = 200;

function main(): void {
  const line = CONFESSION.trim();

  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(
      `Confession must be 1 to ${MAX_CHARS} characters, got ${line.length}.`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Confession must be a single line.");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
  console.log(`Wrote ${line.length} characters to ${join(outDir, "entry.txt")}`);
}

main();
