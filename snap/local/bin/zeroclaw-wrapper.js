#!/usr/bin/env node
'use strict';
// Resolve the platform binary path via the zeroclaw SDK and exec it directly.
//
// The zeroclaw package is ESM-only ("type": "module" with an "exports" map that
// exposes only an "import" entry), so it cannot be require()'d from CommonJS.
// Import its entry file by absolute path under $SNAP so resolution does not
// depend on NODE_PATH (which ESM ignores) or on the package "exports" gate.
const path = require('path');
const { pathToFileURL } = require('url');
const { spawnSync } = require('child_process');

const snap = process.env.SNAP || '';
const entry = path.join(snap, 'lib', 'node_modules', 'zeroclaw', 'dist', 'index.js');

import(pathToFileURL(entry).href)
  .then(({ getBinaryPath }) => {
    const result = spawnSync(getBinaryPath(), process.argv.slice(2), { stdio: 'inherit' });
    process.exitCode = result.status ?? 1;
  })
  .catch((err) => {
    console.error(`zeroclaw: failed to load SDK from ${entry}: ${err.message}`);
    process.exitCode = 1;
  });
