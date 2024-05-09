const express = require('express')
const wppConnect = require('@wppconnect-team/wppconnect')
const request = require('request')
const server = express()
server.use(express.json())
server.use(express.urlencoded({extended: true}))

const URL = "https://bingoflow.bingokart.ai/webhook/435cbf95-ea8f-4784-858c-933c2d01a6ff"


function post_sendMessage(client){
  server.post('/send-message', (req, res) => {
    const w_id = req.body.w_id
    const message = req.body.message
  
    client.sendText(w_id, message)
    res.send("Message has sent successfully")
  })
}

function post_ListenMessages(client) {
  client.onMessage(msg => {
    const options = {
      "method": "POST",
      "url": URL,
      "headers": {
        "Content-type": "application/json"
      },
      json: msg
    }

    request(options, (error) => {
      if (error) {
        throw new Error(error)
      }
    })
  })
}


wppConnect
  .create({ session: 'my_session' })
  .then((client) => { start(client) })
  .catch((error) => { console.log(error) })

function start(client) {
  console.log('Client has started')
  post_ListenMessages(client)
  // listen_messages(client)
  post_sendMessage(client)
}

function listen_messages(client) {
  server.get('/messages', (req, res) => {
    client.onMessage((msg) => {
      console.log(msg); // Log the message when one is received
      res.json(msg);    // Send the message back in the server response
    });
  });
}


server.listen(4000, () => {
  console.log('Listening to port: 4000')
})
