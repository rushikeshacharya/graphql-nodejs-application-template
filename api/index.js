import server from "./server"

const options = {
  port: 4004
}

server.start(options, () => {
  console.log("Server is running on http://localhost:4004")
})
