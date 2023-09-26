//Readble Streams = leitura completa de conteudo / Writable Streams == leitura aos poucos do conteudo
// Readble  => zip ou img
// Netflix => Writeble
// Streams -> 
//process.stdin
//  .pipe(process.stdout)

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1
  
  _read() {
    const i = this.index++

    if (i > 100) {
      this.push(null)
    } else{
      const buf = Buffer.from(String(i))
      this.push(buf)
    }
  }
}

class InverseNumber extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = console.log(Number(chunk.toString() * -1))

    callback(null, Buffer.from(toString(transformed)))
  }
}


// Strream de escrita so processa o dado
class MultiplyByTenStream extends Writable {
  _write(chunk, enconding, callback) {
    console.log(Number(chunk.toString() * 10))
    callback()
  }
}

new OneToHundredStream()
    .pipe(new InverseNumber())
    .pipe(new MultiplyByTenStream())