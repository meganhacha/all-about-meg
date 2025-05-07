import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';


export default function PostPage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch(`/api/posts/${slug}`)
        .then((res) => res.json())
        .then((data) => {
            setPost(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, [slug]);

    if (loading) {
        return (
            <Box sx={{ mt: 6, textAlign: 'center'}}>
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    if (!post) {
        return (
            <Box sx={{ mt: 6, px: 3}}>
                <Typography variant="h5">Post not found.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', pt: 6, px: 3, backgroundColor: 'white'}}>
            <Typography variant="h4" fontFamily={'Merriweather'} gutterBottom>
                {post.title}
            </Typography>

            <Typography variant="body2">
                {new Date(post.date).toLocaleDateString()}
            </Typography>

            {post.thumbnail && (
                <img
                src={post.thumbnail}
                alt={post.title}
                style={{ width: '40%', borderRadius: '8px', marginBottom: '1.5rem', height: '40%'}}
                />
            )}

            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap'}}>
                {post.content}
            </Typography>
        </Box>
    )

}