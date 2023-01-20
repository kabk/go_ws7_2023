var keypress = require('keypress')

const http = require('http')

function doPost() {
  const postData = JSON.stringify({
    'userId': 1,
  })

  const options = {
    hostname: '213.108.110.122',
    port: 3001,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  }

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    })
  })
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`)
  })

  // Write data to request body
  req.write(postData)
  req.end()
}

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin)
 
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key)
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  } else if (key && key.name == 'space') {
    console.log('doing post')
    doPost()
  }
})
 
process.stdin.setRawMode(true)
process.stdin.resume()

