import { Box, Button, Card, CardMedia, CardContent, Typography, Grid, TextField, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const [tokenInput, setTokenInput] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/posts')
        .then((res) => res.json())
        .then(setPosts);

        fetch('/api/posts?tagsOnly=true')
        .then((res) => res.json())
        .then(setAllTags);

        const storedToken = localStorage.getItem('admin-token');
        const expectedToken = process.env.REACT_APP_POST_TOKEN;

        if (storedToken === expectedToken) {
            setIsAdmin(true);
            setShowAddButton(true);
        }

    }, []);

    const handleTokenSubmit = () => {
        const expectedToken = process.env.REACT_APP_POST_TOKEN;

        if (tokenInput === expectedToken) {
            localStorage.setItem('admin-token', tokenInput);
            setIsAdmin(true);
            window.location.reload();
        }
    }

    const visiblePosts = selectedTag ? posts.filter((post) => post.tags?.includes(selectedTag)) : posts;

    return(
        <Box sx={{ px: 3, py: 4, maxWidth: 1200, mx: 'auto'}}>
            <Typography sx={{fontFamily: 'Merriweather', fontSize: '3rem', fontWeight: 700, mb: '1.5rem' }} align="center" gutterBottom>
                Posts
            </Typography>

            <FormControl sx={{minWidth: '100px', pb: '1rem'}}>
                <InputLabel>Filter by Tag</InputLabel>
                <Select
                    value={selectedTag}
                    onChange={(e) => {
                        setSelectedTag(e.target.value)
                    }}
                    label="Filter by Tag"
                >

                    <MenuItem value="">
                        All
                    </MenuItem>
                    {allTags.map((tag, idx) => (
                        <MenuItem key={idx} value={tag}>
                            {tag}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Grid container spacing={3}>
                {visiblePosts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post._id}>
                        <Card
                        key={post.slug}
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


            <Box mt={4} textAlign="center" display="flex" flexDirection="column" gap={2} width="50%" pl="25%">
            {!isAdmin && (
                <>
                <TextField
                label="Admin Token"
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                sx={{ mb: 1}}
                />
                <Button sx={{ backgroundColor: 'rgb(105, 83, 75)', color: 'white' }} onClick={handleTokenSubmit}>
                    Log In as Admin
                </Button>
                </>
            )}

            {showAddButton && (
                <Button sx={{ backgroundColor: 'rgb(105, 83, 75)', color: 'white' }} onClick={() => navigate('/create')}>
                    Create New Post
                </Button>
            )}

            {showAddButton && (
                <Button sx={{ backgroundColor: 'rgb(105, 83, 75)', color: 'white'}} onClick={() => {
                    const newToken = prompt('Enter a new token: ');
                    if(newToken){
                        localStorage.setItem('admin-token', newToken);
                        window.location.reload();
                    }
                }}
                >
                    Change Token
                </Button>
            )
        }

        <Button sx={{ backgroundColor: 'rgb(105, 83, 75)', color: 'white' }} onClick={() => navigate('/')}>Home</Button>
        </Box>
    </Box>
    );
}