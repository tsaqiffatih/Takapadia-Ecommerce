// import { MongoClient } from "mongodb";

// // require('dotenv').config();

// const { MONGO_DB_USERNAME, MONGO_DB_PASSWORD } = process.env;

// const uri = process.env.MONGODB_CONNECTION_STRING;

// if (!uri) {
// 	throw new Error(
// 		"MONGODB_CONNECTION_STRING is not defined in the environment variables"
// 	);
// }

// const client = new MongoClient(uri);
// const database = client.db("week2_phase-3");

// export { client, database };

import { Db, MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_CONNECTION_STRING;

if (!uri) {
	throw new Error("Mongo DB is offline something went wrong");
}

export const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
	connectTimeoutMS: 10000,
});

export const database = client.db(process.env.MONGODB_DATABASE_NAME);

/*
async function checkDatabaseConnection() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully');
    
    // Opsional: Lakukan operasi sederhana untuk memastikan koneksi
    await database.command({ ping: 1 });
    console.log('Pinged the database successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Panggil fungsi untuk memeriksa koneksi
checkDatabaseConnection().catch(console.error);

*/
