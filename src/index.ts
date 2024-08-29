import server from "./server"

// Listen to the server
server.listen(process.env.DEV_PORT, () => {
  console.log(`Server running on port: http://localhost:${process.env.DEV_PORT}`)
})