const server = require('./server')
const dotenv = require('dotenv').config()

const port = process.env.PORT || 5000
server.listen(port, () =>
  console.log(`Server up and running on port ${port} !`)
)
