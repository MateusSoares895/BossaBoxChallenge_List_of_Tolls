import express from 'express'
import cors from 'cors'

import routes from './routes'

class App {
  express: express.Application
  constructor() {
    this.express = express()
    this.middlewares()
  }
  middlewares() {
    this.express.use(express.json())
    this.express.use(cors())
  }

  routes() {
    this.express.use(routes)
  }
}

export default App
