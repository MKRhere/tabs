!#/bin/bash

set -euo pipefail

deno run -A manifest.ts > manifest.json
deno bundle src/background.ts ext/background.js
deno bundle src/search.ts ext/search.js

7za a tabs.zip ext/ manifest.json
