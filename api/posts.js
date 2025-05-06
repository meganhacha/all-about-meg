import clientPromise from "../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db();

    if (req.method === 'GET') {
        const posts = await db.collection('posts').find({}).sort({ date: -1}).toArray();
        res.status(200).json(posts);
    } else if (req.method === 'POST') {
        const { title, slug, content, thumbnail, tags } = req.body;

        if(!title || !slug || !content) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await db.collection('posts').insertOne({
            title,
            slug,
            content,
            tags: tags || [],
            date: new Date(),
        });

        res.status(201).json(result);
    } else {
        res.status(405).json({message: 'Method not allowed' });
    }


}