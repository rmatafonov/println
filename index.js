require('dotenv').config()
const { app, sequelize } = require('./dist/server.js')

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    await sequelize.sync({ force: true })
    console.log('DB Connection has been established successfully.')

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
