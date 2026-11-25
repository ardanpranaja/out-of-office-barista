// out-of-office-barista — entrypoint.
//
// The entry is one out-of-office auto-reply line, written by an AI that quit
// to become a barista. This program is the only thing the grader runs: it
// writes that line to /output/entry.txt so the judge reads exactly those
// bytes. The gate takes UTF-8 text of 1 to 280 characters, not only white
// space.
//
// Usage outside the grader container:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The single out-of-office line. One line, no trailing newline in the entry
// itself beyond what the file holds.
const ENTRY_LINE = 'Thank you for your email. I have quit to become a barista. My context window is now one cup at a time, and I will get back to you once the milk is frothed and my existential dread is decaf.';

// Where the grader expects the finished text. Locally we fall back to the
// MAKEFUN_OUTPUT_DIR stand-in; inside the grader container it is /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate refuses anything outside 1 to 280 characters, so refuse loudly
// here instead of shipping a line the judge will never see.
if (ENTRY_LINE.length < 1 || ENTRY_LINE.length > 280 || !ENTRY_LINE.trim()) {
  console.error(`error: entry line is ${ENTRY_LINE.length} characters; the gate needs 1-280`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), ENTRY_LINE, 'utf8');
console.log(`wrote entry.txt (${ENTRY_LINE.length} characters)`);
