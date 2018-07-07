#!/usr/bin/env node

require('../lib/transcoder')({
  format: 'hex',
  modulus: 2,
  decoding: false
})({
  input: process.stdin,
  output: process.stdout
})
