import { connect, connection } from "mongoose";

function initializeDatabase() {
    connection.on("open", () => {
        console.log("Database is running in mongodb")
    })

    connect(process.env.DATABASE_URL as string)
}

export { initializeDatabase }