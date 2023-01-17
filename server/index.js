const express = require('express'),
  bodyParser = require('body-parser'),
  fs = require('fs').promises

const app = express()
const port = 3000

// We process POST body data - JBG
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))

async function readData(userId) {
  try {
    const val = await fs.readFile(`./${userId}.txt`, 'utf8')
    return parseInt(val)
  } catch(err){
    console.log(err)
    return 0
  }
}

async function writeData(userId, val) {
  try {
    await fs.writeFile(`./${userId}.txt`, `${val}`)
  } catch(err) {
    console.log(err)
  }
}

// I handle GET requests - JBG
app.get('/', async (req, res) => {
  const userId = req.query.userId
  res.send(JSON.stringify({ 'val':  await readData(userId) }))
})

// I handle POST requests - JBG
app.post('/', async (req, res) => {
  try {
    let userId = req.body.userId
    let val = await readData(userId)
    val += 1
    await writeData(userId, `${val}`)
    res.send('POST request handled')
  } catch(e) {
    res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

