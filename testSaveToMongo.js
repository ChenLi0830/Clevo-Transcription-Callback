const { saveTranscription } = require('./handler')
const debug = require('debug')('test')
require('dotenv').config()

let sample = {
  biz_duration: 251515,
  callback_url: 'http://transcriptionCallback.c8689b5863ec444e5bba9a51e950e18fc.us-west-1.alicontainer.com',
  id: 'd39641f1861f4ebe8445d5d452efd341',
  enable_callback: true,
  result: [
    { begin_time: 110980,
      channel_id: 0,
      emotion_value: 7,
      end_time: 114225,
      silence_duration: 6,
      speech_rate: 240,
      text: '我在跟您核实一下62288'
    },
    { begin_time: 124700,
      channel_id: 0,
      emotion_value: 6,
      end_time: 129605,
      silence_duration: 0,
      speech_rate: 269,
      text: '对她注销的那个卡号哎，必须是什么时间的交易啊'
    }
  ],
  status: 'SUCCEED'
}

saveTranscription({result: sample})
  .then(savedResult => {
    debug('savedResult', savedResult)
  })
// // save req.body to MongoDB server
