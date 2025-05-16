import clientPromise from '../lib/mongodb';

export default async function handler(req, res) {
  try {
    console.log('Received request:', req.method);

    const client = await clientPromise;
    const db = client.db('posts');

    if (req.method === 'GET') {
      const onlyTags = req.query.tagsOnly === 'true';

      if(onlyTags) {
        const tags = await db.collection('posts').distinct('tags');
        return res.status(200).json(tags);
      }

      const posts = await db.collection('posts')
      .find({})
      .sort({date: 1})
      .toArray();
      console.log('Fetched posts:', posts.length);
      return res.status(200).json(posts);
    }

    if (req.method === 'POST') {
      const token = req.headers.authorization?.split(' ')[1];
      if (token !== process.env.POST_TOKEN) {
        console.warn('Unauthorized POST attempt');
        console.warn('Recevied token:', token);
        console.warn('Expected token:', process.env.POST_TOKEN);
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const { title, slug, content, thumbnail, tags } = req.body;
      if (!title || !slug || !content) {
        console.warn('Missing fields');
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await db.collection('posts').insertOne({
        title,
        slug,
        content,
        thumbnail: thumbnail || '',
        date: new Date().toLocaleDateString(),
        tags: tags || ''
      });

      console.log('Inserted post:', result.insertedId);
      return res.status(201).json({ id: result.insertedId });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });

  } catch (error) {
    console.error('API Crash:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
