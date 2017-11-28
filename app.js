require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const debug = require('debug')('app')
// const convertAudioToWav = require('./convertAudioToWav')
const { saveTranscription } = require('./handler')

// parse body
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))

app.get('/', (req, res) => {
  debug('get req to /', req.body)
  return res.send("Transcription Service is up :D! Make use of it by posting with param 'url'")
})

// app.put('/', function (req, res) {
//   debug('put req to /', req.body)
//   return res.send('Got put put request')
// })

app.post('/', (req, res) => {
  debug('post req to /', req.body)

  if (!req.body.id) {
    return res.send('Not audio transcription callback!')
  }

  saveTranscription(req.body)
  .then(() => {
    res.send('POST request received at /')
  })
  //   handler(req.body.url)
  // convertAudioToWav(req.body.url)
  //   .then(result => {
  //     console.log('result', result)
  //   })
  //   console.log('req', req)
  //   console.log('req', Object.keys(req))
  //   console.log('req.body', req.body)
  //   console.log('req.params', req.params)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}!`))
