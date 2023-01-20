const express = require('express'),
  bodyParser = require('body-parser'),
  fs = require('fs').promises

const app = express()
const port = 3000

// We process POST body data - JBG
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))

async function exchangeCoins(fromUserId, toUserId) {
  console.log("EXCHANGE", fromUserId, toUserId)
  let val = await readData(fromUserId)
  val -= 1
  await writeData(fromUserId, `${val}`)
  val = await readData(toUserId)
  val += 1
  await writeData(toUserId, `${val}`)
}

async function dispurse() {
  try {
    let coinCount = await readData(1)
    console.log('COIN COUNT', coinCount)
    let files = await fs.readdir('./')
    let userIds = []

    files.forEach(f => {
      if(f.indexOf('.txt') != -1) {
        let userId = parseInt(f.replace('.txt', ''))
        if(userId > 1) {
          console.log('USER ID', userId)
          userIds.push(userId)
        }
      }
    })

    console.log('USER IDS', userIds)
    if(coinCount < userIds.length) return
 
    let blockCount = parseInt(coinCount / userIds.length)
    console.log('BLOCKS', blockCount)
    for(let i = 0; i < blockCount; i++) {
      for(let j = 0; j < userIds.length; j++) {
        await exchangeCoins(1, userIds[j])
      }
    }
  } catch(err) {
    console.log(err)
  }
  
}

async function readData(userId) {
  try {
    const val = await fs.readFile(`./${userId}.txt`, 'utf8') || 0
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
    let fromUserId = req.body.fromUserId
    let toUserId = req.body.toUserId
    if(userId) {
      let val = await readData(userId)
      val += 1
      await writeData(userId, `${val}`)
    } else if(fromUserId && toUserId) {
      exchangeCoins(fromUserId, toUserId)
    }
    await dispurse()
    res.send('POST request handled')
  } catch(e) {
    res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})