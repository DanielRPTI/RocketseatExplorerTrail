//{ "users ": [...] um database para salvar todos meus dados por isso seria um objeto pois separaria por cada dado que eu deseja salvar}
import  fs from 'node:fs/promises'

// destina a onde sera criado o bacon de dados local 
const databasePath = new URL('../db.json', import.meta.url)


export class Database {
  #database = {}
  
  // salva os conteudos caso existam na db.json
  constructor() {
    fs.readFile(databasePath, 'utf-8')
    .then( data => {
      this.#database = JSON.parse(data)
    })
    .catch(() =>{
      this.#persist()
    })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  } 


  select(table) {
    const data = this.#database[table]

    return data 
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    } else{
      this.#database[table] = [data]
    }

    this.#persist()

    return data; 
  }
}