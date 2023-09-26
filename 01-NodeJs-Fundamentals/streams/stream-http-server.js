import http from 'node:http'
import { Transform } from "node:stream";

class InverseNumber extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = console.log(Number(chunk.toString() * -1))
    console.log(transformed)
    callback(null, Buffer.from(toString(transformed)))
  }
}

// req => ReadableStream
// res => WritebleStream

const server = http.createServer( async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)

  //return req
  // .pipe(new InverseNumber())
  //  .pipe(res)
})

server.listen(3334)