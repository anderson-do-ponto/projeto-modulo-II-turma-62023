import "dotenv/config"
import express from "express"
import { initializeDatabase } from "./database/connection"

initializeDatabase()

const server = express()

server.listen(process.env.PORT, () => console.log("Server is running"))