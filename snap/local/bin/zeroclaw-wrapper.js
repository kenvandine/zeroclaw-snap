#!/usr/bin/env node
'use strict';
// Resolve the platform binary path via the zeroclaw SDK and exec it directly.
const { getBinaryPath } = require('zeroclaw');
const { spawnSync } = require('child_process');
const result = spawnSync(getBinaryPath(), process.argv.slice(2), { stdio: 'inherit' });
process.exitCode = result.status ?? 1;
