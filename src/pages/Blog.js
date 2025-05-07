import { Box, Button, Card, CardMedia, CardContent, Typography, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [tokenInput, setTokenInput] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('api/posts')
        .then((res) => res.json())
        .then(setPosts);

        const storedToken = localStorage.getItem('admin-token');
        const expectedToken = process.env.REACT_APP_POST_TOKEN;

        if (storedToken && storedToken === expectedToken) {
            setIsAdmin(true);
        }

    }, []);

    const handleTokenSubmit = () => {
        const expectedToken = process.env.REACT_APP_POST_TOKEN;

        if (tokenInput === expectedToken) {
            localStorage.setItem('admin-token', tokenInput);
            setIsAdmin(true);
        }
    }

    return(
        <Box sx={{ px: 3, py: 4, maxWidth: 1200, mx: 'auto'}}>
            <Typography variant="h3" align="center" gutterBottom>
                Posts
            </Typography>

            <Grid container spacing={3}>
                {posts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post._id}>
                        <Card
                        sx={{ cursor: 'pointer', height: '100%'}}
                        onClick={() => navigate(`/blog/${post.slug}`)}
                        >
                            <CardMedia
                            component="img"
                            height="200"
                            image={post.thumbnail || 'https://cdn.futura-sciences.com/buildsv6/images/wide1920/2/f/3/2f3c2b936a_50185294_ocean-plus-chaud.jpg'}
                            alt={post.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{post.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {new Date(post.date).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>


            <Box mt={4} textAlign="center">
            {!isAdmin && (
                <>
                <TextField
                label="Admin Token"
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                sx={{ mb: 1}}
                />
                <Button variant="outlined" onClick={handleTokenSubmit}>
                    Log In as Admin
                </Button>
                </>
            )}

            {isAdmin && (
                <Button variant="outlined" onClick={() => navigate('/newpost')}>
                    Create New Post
                </Button>
            )}
        </Box>
    </Box>
    );
}