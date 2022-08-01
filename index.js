require('dotenv').config()
const { app, db } = require('./dist/server.js')

<<<<<<< HEAD
const PORT = process.env.PORT || 3000
=======
const PORT = process.env.PORT || 5000
>>>>>>> main

const start = async () => {
  try {
    db.dbConnect()
      .then(() => {
        console.log('DB Connection has been established successfully.')
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
      })
      .catch((err) => {
        console.error('Unable to connect to the DB:', err)
      })
  } catch (e) {
    console.log(e)
  }
}

start()
