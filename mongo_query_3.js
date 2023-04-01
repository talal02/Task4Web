
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://talal_ahmed:talal_ahmed@cluster1.i3wda6k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db_name = "Task4"

console.log("Connecting to MongoDB...");

async function run() {
  try {
    const database = client.db(db_name);
    const users = database.collection("USER");
    const query = { "date_of_creation": { $gt: new Date("2022-02-02") }, "addresses.city": "New York" };
    const cursor = users.find(query);
    if ((await users.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }
    await cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);