#!/usr/bin/env node

require('../lib/transcoder')({
  format: 'base64',
  modulus: 4,
  decoding: true
})({
  input: process.stdin,
  output: process.stdout
})
