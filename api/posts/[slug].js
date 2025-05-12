import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db();
    const { slug } = req.query;

    if(req.method === 'GET') {
        try {
            const post = await db.collection('posts').findOne({ slug });

            if(!post) {
                return res.status(404).json({ error: 'Post not found'});
            }

            res.status(200).json(post);
        
        } catch (err){
            res.status(500).json({ error: 'Failed to fetch post'});
        }
    }

    else if (req.method === 'PUT') {
        const token = req.headers.authorization?.split(' ')[1];
        if(token !== process.env.POST_TOKEN) {
            return res.status(403).json({ error: 'Unauthorized'});
        }

        const { title, content, thumbnail, tags } = req.body;

        if (!title || !content || !Array.isArray(tags)) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        try {
            const result = await db.collection('posts').updateOne(
                { slug },
                {
                    $set: {
                        title,
                        content,
                        thumbnail,
                        tags,
                        date: new Date().toLocaleDateString(), 
                    },
                }
            );

            if(result.matchedCount === 0){
                return res.status(404).json({ error: 'Post not found'});
            }

            res.status(200).json({ message: 'Post updated'});

        } catch(error) {
            res.status(500).json({ error: 'Failed to update post '});
        }
    }
    else if (req.method === 'DELETE') {
        const token = req.headers.authorization?.split(' ')[1];

        if (token !== process.env.POST_TOKEN) {
            return res.status(403).json({ error: 'Unauthorized'});
        }

        try {
            const result = await db.collection('posts').deleteOne({ slug });

            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Post not found'});
            }

            return res.status(200).json({ message: 'Post deleted'});
        } catch (err) {
            return res.status(500).json({ error: 'Failed to delete post'});
        }
    }
    else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`$Method ${req.method} Not Allowed`);
    }
}