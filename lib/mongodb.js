import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;


if (!process.env.MONGODB_URI) {
    throw new Error("Please add MONGODB_URI to your .env file");
}


if (!clientPromise) {
    client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    clientPromise = client.connect();
}

export default clientPromise;