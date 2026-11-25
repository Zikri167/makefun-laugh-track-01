// Laugh Track: The Crypto Trading Joke Contest
// Writes one original one-line joke about crypto/trading life to /output/entry.txt.
// Stdlib only, no network, deterministic: the same bytes on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE: string =
  "I buy the dip, then I buy the dip's dip, then I just rename the dip my long-term holding.";

// Gate validation: 1-200 characters counted in Unicode code points
// (not UTF-16 length), single line, no trailing newline, not only whitespace.
const lengthInCodePoints: number = [...JOKE].length;
if (lengthInCodePoints < 1 || lengthInCodePoints > 200) {
  throw new Error(
    `joke must be 1-200 characters, got ${lengthInCodePoints}`,
  );
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("joke must be a single line with no newline");
}
if (JOKE.trim().length === 0) {
  throw new Error("joke must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");

// Read back and verify: the file on disk must be byte-identical to the
// joke, with no trailing newline added by the write.
const written: string = readFileSync("/output/entry.txt", "utf8");
if (written !== JOKE) {
  throw new Error("written entry.txt does not match the joke exactly");
}
