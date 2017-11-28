const debug = require('debug')('saveTranscription handler')
const { createApolloFetch } = require('apollo-fetch')

function saveTranscription ({result}) {
  const fetch = createApolloFetch({
    uri: process.env.SERVER_ENDPOINT || `http://localhost:4000/graphql`
  })

  const query = `
  mutation callCreate (
    $status: EnumCallStatus,
    $transcription: CallTranscriptionInput,
    $breakdowns: [CallCallBreakdownsInput]
  ) { 
    callCreate (record: {
      status: $status,
      transcription: $transcription,
      breakdowns: $breakdowns
    }) {
      recordId
      record {
        _id,
        status,
        format,
        encoding,
        source,
        transcription {
            processor,
            taskId,
            status,
            result
        }
        breakdowns {
            begin
            end
            transcript
            speaker
        }
        createdAt
        updatedAt
      }
    }
  }
  `

  let breakdowns = result.result.map(item => {
    return {
      begin: item.begin_time,
      end: item.end_time,
      transcript: item.text,
      speaker: item.channel_id === 0 ? 'staff' : 'customer'
    }
  })

  debug('result.result', result.result)
  // debug('JSON.parse(result.result)', JSON.parse(result.result))
  // debug('JSON.stringify(result.result)', JSON.stringify(result.result))
  return fetch({
    query,
    variables: {
      status: 'active',
      transcription: {
        'taskId': result.id,
        'status': 'completed',
        'result': result.result
      },
      'breakdowns': breakdowns
    }
  })

    .then(body => {
      debug('body.data.callCreate', body.data.callCreate)
      return body.data.callCreate
    })
}

module.exports = {saveTranscription}
