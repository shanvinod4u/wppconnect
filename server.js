const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect
  .create({ session: "my session" })
  .then((client) => { start(client) })
  .catch((error) => { console.log(error) })

function start(client) {
  console.log('client has started')
  listen_messages(client)
}

function listen_messages(client) {
  client.onMessage((msg) => {
    const wa_id = msg.from
    const message = "Ask me something"
    client.sendText(wa_id, message)
  })
}
