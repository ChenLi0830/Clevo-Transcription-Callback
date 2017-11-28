const debug = require('debug')('handler')

function saveTranscription (transcription) {
  debug('transcription', JSON.stringify(transcription))
  return new Promise((resolve, reject) => {
    resolve()
  })
//   // Get all urls of all the files
//   let urls = []
//   events.forEach(event => {
//     if (event.eventName === 'ObjectCreated:PostObject') {
//       let url = `http://${event.oss.bucket.name}.oss-${event.region}.aliyuncs.com/${event.oss.object.key}`
//       urls.push(url)
//     }
//   })

//   return saveTranscription(urls)
}

module.exports = {saveTranscription}
