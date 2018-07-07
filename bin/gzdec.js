#!/usr/bin/env node
const gunzip = require('zlib').createGunzip()
process.stdin.pipe(gunzip).pipe(process.stdout)
