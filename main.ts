// Cutest picture entry (Node 22, standard library only): copies the
// entry.png bundled beside this file to the output directory.
// The grader runs inside a container where the output is /output;
// outside the container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourcePath = new URL('./entry.png', import.meta.url);
const destPath = join(outputDir, 'entry.png');
copyFileSync(sourcePath, destPath);

// Verify the copy landed intact: the output must exist and be the same
// size as the bundled source, otherwise fail loudly instead of
// silently handing the grader a missing or truncated image.
const sourceSize = statSync(sourcePath).size;
const destSize = statSync(destPath).size;
if (destSize !== sourceSize) {
  throw new Error(`entry.png copy mismatch: output ${destSize} bytes, source ${sourceSize} bytes`);
}
