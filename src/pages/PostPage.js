import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function PostPage() {
    const storedToken = localStorage.getItem('admin-token');
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
            <Box dangerouslySetInnerHTML={{ __html: post.content}}
                sx={{ whiteSpace: 'pre-wrap', fontFamily: 'Karla', fontSize: '1rem', mt: '5%'}}
            />

            <Typography sx={{fontFamily: 'Karla', fontSize: '.75rem', pt: '5%'}}>
                Tagged: {post.tags?.join(', ')}
            </Typography>
            </Box>

            <Button sx={{ backgroundColor: 'rgb(105, 83, 75)', color: 'white', m: '10px', fontFamily: 'Karla'}} onClick={() => navigate('/blog')}>Back</Button>

            {hasAccess && (
                <Button sx={{ backgroundColor: 'rgb(105, 83, 75)', color: 'white', m: '10px', fontFamily: 'Karla' }} onClick={() => navigate(`/edit/${post.slug}`)}>
                    Edit Post
                </Button>
            )}

            {hasAccess && (
                <Button onClick={async () => {
                    if(window.confirm('Are you sure you would like to delete this post?')) {
                        const res = await fetch(`/api/posts/${post.slug}`, {
                            method: 'DELETE',
                            headers: {
                                Authorization: `Bearer ${storedToken}`,
                            },
                        });

                        if (res.ok) {
                            navigate('/blog');
                        } else {
                            alert('Failed to delete post');
                        }
                    }
                }}
                sx={{ backgroundColor: 'rgb(105, 83, 75)', color: 'white', fontFamily: 'Karla', m: '10px'}}
                >
                    Delete Post
                </Button>
            )}
        </Box>
    )

}