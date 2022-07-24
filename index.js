require('dotenv').config()
const {
  app, startApp
} = require('./dist/server.js')

const PORT = process.env.PORT || 9001

const start = async () => {
  try {
    startApp()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
