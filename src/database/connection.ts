import { connect, connection } from "mongoose";

function initializeDatabase() {
    connection.on("open", () => {
        console.log("Database is running")
    })

    connect(process.env.DATABASE_URL as string)
}

export { initializeDatabase }