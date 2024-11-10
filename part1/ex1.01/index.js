import crypto from "crypto"

function main() {
  const uuids = []

  setInterval(() => {
    const newUUID = crypto.randomUUID()
    console.log(new Date().toISOString(), newUUID)
    uuids.push(newUUID)
  }, 5000)
}

main()
