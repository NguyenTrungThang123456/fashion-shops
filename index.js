const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// IMPORT MODELS
require('./backend/models/productModel')

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb+srv://thang:thang@testcluster1.bt7hu.mongodb.net/fashion?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
)

app.use(bodyParser.json())

//IMPORT ROUTES
require('./backend/routes/productRoutes')(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})
