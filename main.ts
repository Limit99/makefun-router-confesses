import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The Router Confesses: one funny single line, under 200 characters, in
// which a home Wi-Fi router excuses itself for dying at the climax of a
// movie. The confession is a concrete human scene: the final scene on
// screen, the microwave, and a router that has never been the same since.
const LINE =
  "I am sorry I died during the final scene — the microwave asked me to hold its beer, and I have never been the same since.";
const MAX_CHARS = 200;

function main(): void {
  // Revision: also reject line breaks and blank text, matching the sealed gate exactly.
  if (LINE.includes("\n") || LINE.trim().length === 0) {
    throw new Error("entry must be a single non-empty line");
  }
  // Revision 2: the line must name the microwave and the final scene, so a
  // generic router joke cannot slip through as this entry.
  if (!LINE.toLowerCase().includes("microwave") || !LINE.toLowerCase().includes("final scene")) {
    throw new Error("entry must name the microwave and the final scene");
  }
  if (LINE.length < 1 || LINE.length >= MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS - 1}`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
