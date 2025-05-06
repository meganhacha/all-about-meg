import { MongoClient } from 'mongodb';

let client;
let clientPromise;


if (!process.env.MONGODB_URI) {
    throw new Error("Please add MONGODB_URI to your .env file");
}

const uri = process.env.MONGODB_URI;

if (!clientPromise) {
    client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    clientPromise = client.connect();
}

export default clientPromise;