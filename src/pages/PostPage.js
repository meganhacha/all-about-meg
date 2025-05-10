import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function PostPage() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);


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

        const storedToken = localStorage.getItem('admin-token');
        const expectedToken = process.env.REACT_APP_POST_TOKEN;
        if (storedToken && storedToken === expectedToken) {
            setHasAccess(true);
        }
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
        <Box sx={{ maxWidth: 1000, mx: 'auto', pt: 6, px: 3}}>
            <Typography variant="h4" fontFamily={'Merriweather'} gutterBottom>
                {post.title}
            </Typography>

            <Typography sx={{fontFamily: 'Karla', fontSize: '1rem'}}>
                {new Date(post.date).toLocaleDateString()}
            </Typography>

            {post.thumbnail && (
                <img
                src={post.thumbnail}
                alt={post.title}
                style={{ width: '40%', borderRadius: '8px', marginBottom: '1.5rem', height: '40%'}}
                />
            )}

            <Box>
            <Typography sx={{ whiteSpace: 'pre-wrap', fontFamily: 'Karla', fontSize: '1rem', mt: '5%'}}>
                {post.content}
            </Typography>

            <Typography sx={{fontFamily: 'Karla', fontSize: '.75rem', pt: '5%'}}>
                Tagged: {post.tags?.join(', ')}
            </Typography>
            </Box>

            <Button variant='outlined' onClick={() => navigate('/blog')}>Back</Button>

            {hasAccess && (
                <Button onClick={() => navigate(`/edit/${post.slug}`)}>
                    Edit Post
                </Button>
            )}
        </Box>
    )

}