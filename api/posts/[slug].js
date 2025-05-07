import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db();

    const { slug } = req.query;
    console.log('looking for slug: ', slug);

    const post = await db.collection('posts').findOne({ slug });

    if(!post) {
        return res.status(404).json({ error: 'Post not found'});
    }

    res.status(200).json(post);
}