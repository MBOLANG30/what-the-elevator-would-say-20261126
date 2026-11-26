// What the Elevator Would Say — make.fun entry
// Writes the winning one-liner (78 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output). Gate: UTF-8 text, 1-120 chars, single line, non-blank.
// No network, no secrets, no reading anything outside this file.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I know your floor. I know your weight. I know you lied about both on the form.";

function main(): void {
  // Gate check, mirroring the sealed scorer: 1-120 chars, one line, non-blank.
  const chars = [...LINE].length;
  if (chars < 1 || chars > 120) {
    throw new Error(`line is ${chars} chars, must be 1-120`);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single non-blank line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  // Never delete the output folder: only create it if missing, then write the file.
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  // Round-trip check: what the grader reads must be exactly the gated line.
  const back = readFileSync(target, "utf8");
  if (back !== LINE) {
    throw new Error("round-trip mismatch: entry.txt does not match the gated line");
  }
}

main();
