import {MongoClient} from 'mongodb';

const uri = process.env.MONGODB_URI;
let cachedClient = null;

export default async function handler(req, res) {
    if (!uri) {
        return res.status(500).json({message: 'Missing MONGODB_URI'});
    }

    if (cachedClient) {
        console.log('Using cached client');
    } else {
        console.log('Creating new client');
        cachedClient = new MongoClient(uri);
        await cachedClient.connect();
    }

    const db = cachedClient.db('perfume-info');
    const postCollection = db.collection('review-posts');

    if (req.method === 'GET') {
        const data = await collection.find({}).toArray();
        return res.status(200).json(data);
    }

    if (req.method === 'POST') {

        const { title, content} = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const result = await postCollection.insertOne({
            title,
            content,
            createdAt: new Date(),
        });

        return res.status(201).json(result.ops[0]);
    }

    res.status(405).json({ message: 'Method not allowed'});
}