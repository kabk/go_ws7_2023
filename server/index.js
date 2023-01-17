const express = require('express'),
  bodyParser = require('body-parser'),
  fs = require('fs')

const app = express()
const port = 3000

// We process POST body data - JBG
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))

function readData(userId) {
  fs.readFile(`./${userId}.txt`, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    return parseInt(userId)
  })
}

function writeData(userId, val) {
  fs.writeFile(`./${userId}.txt`, val, err => {
    if (err) {
      console.error(err)
    }
  })
}

// I handle GET requests - JBG
app.get('/', (req, res) => {
  res.send(JSON.stringify({ 'msg': 'Hello world!', 'val': 2 }))
})

// I handle POST requests - JBG
app.post('/', async (req, res) => {
  try {
    console.log('Client sent: ', req.body.userId)
    console.log('Client sent: ', req.body.val)
    res.send('POST request handled')
  } catch(e) {
    res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

