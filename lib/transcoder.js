module.exports = transcoder

// Generates a transcoder
function transcoder ({format, modulus, decoding = false, bufferSize = 8192}) {
  return ({input, output}) => {
    let buffers = []
    let totalLength = 0

    function write (writeBuffer) {
      const writeData = decoding ?
        Buffer.from(writeBuffer.toString(), format) :
        writeBuffer.toString(format)
        
      output.write(writeData)
    }

    // Process each chunk of data as it is received
    input.on('data', data => {
      buffers.push(data)
      totalLength += data.byteLength

      if (totalLength >= bufferSize) {
        const writeBuffer = Buffer.concat(buffers)
        totalLength = writeBuffer.byteLength % modulus
        const writeCount = writeBuffer.byteLength - totalLength

        write(writeBuffer.slice(0, writeCount))

        buffers = []
        if (totalLength > 0) {
          const remainder = writeBuffer.slice(writeCount)
          buffers.push(remainder)
        }
      }
    })

    // Flush any remaining data
    input.on('end', () => {
      if (buffers.length > 0) {
        const writeBuffer = Buffer.concat(buffers)
        write(writeBuffer)
      }
    })

    input.resume()
  }
}
