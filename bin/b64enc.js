#!/usr/bin/env node

let buffers = []
let totalLength = 0

let total = 0

// Process each chunk of data as it is received
process.stdin.on('data', data => {
  buffers.push(data)
  totalLength += data.byteLength
  total += data.byteLength

  if (totalLength >= 8192) {
    const writeBuffer = Buffer.concat(buffers)
    totalLength = writeBuffer.byteLength % 3
    const writeCount = writeBuffer.byteLength - totalLength
    process.stdout.write(writeBuffer.slice(0, writeCount).toString('base64'))

    buffers = []
    if (totalLength > 0) {
      const remainder = writeBuffer.slice(writeCount)
      buffers.push(remainder)
    }
  }
})

// Flush any remaining data
process.stdin.on('end', () => {
  if (buffers.length > 0) {
    const writeBuffer = Buffer.concat(buffers)
    process.stdout.write(writeBuffer.toString('base64'))
  }
})

process.stdin.resume()
