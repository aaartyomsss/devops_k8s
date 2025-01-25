import NATS from "nats"

const webhookUrl = process.env.WEBHOOK_URL
const natsUrl = process.env.NATS_URL

const ns = NATS.connect({
  url: natsUrl,
})

console.log("Connected here!", ns, webhookUrl)

const payload = (json) => ({
  content: `Todo has been created ${json}`,
  username: "Epicus maximus",
})

async function sendMsg(msgString) {
  const res = await fetch(webhookUrl, {
    body: JSON.stringify(payload(msgString)),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })

  console.log(res)
}

ns.subscribe("new_todo", { queue: "broadcaster" }, async (msg) => {
  console.log("Gotten message: ", msg)
  await sendMsg(msg)
})
