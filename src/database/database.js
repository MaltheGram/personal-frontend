import { DB_STRING } from "$env/static/private"
import mongoose from "mongoose"

/* 
  0 - disconnected
  1 - connected
  2 - connecting
  3 - disconnecting
  4 - uninitialized
*/
const mongoConnection = {
	isConnected: 0
}

export const connectToMongoDB = async () => {
	if (mongoConnection.isConnected === 1) {
		console.log("--> Already connected to MongoDB.")
		return
	}

	if (mongoose.connections.length > 0) {
		mongoConnection.isConnected = mongoose.connections[0].readyState
		if (mongoConnection.isConnected === 1) {
			console.log("---> MongoDB is already connected")
			return
		}

		await mongoose.disconnect()
	}
	await mongoose.connect(DB_STRING, {
		dbName: "personal"
	})
	mongoConnection.isConnected = 1
	console.log("--> Connected to MongoDB", DB_STRING ?? "")
}
