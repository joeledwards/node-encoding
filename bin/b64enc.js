#!/usr/bin/env node

require('../lib/transcoder')({
  format: 'base64',
  modulus: 3,
  decoding: false
})({
  input: process.stdin,
  output: process.stdout
})
