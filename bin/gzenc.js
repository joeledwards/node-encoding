#!/usr/bin/env node
const gzip = require('zlib').createGzip()
process.stdin.pipe(gzip).pipe(process.stdout)
