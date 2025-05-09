import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { LocalSeeOutlined } from '@mui/icons-material';


export default function NewPost() {
    const [token, setToken] = useState('');
    const [hasAccess, setHasAccess] = useState(false);
    const [form, setForm] = useState( {
        title: '',
        slug: '',
        content: '',
        thumbnail: ''
    });

    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('admin-token');
        const expectedToken = process.env.REACT_APP_POST_TOKEN;
        if (storedToken && storedToken === expectedToken) {
            setHasAccess(true);
            setToken(storedToken);
        }
    }, []);

    const handleAccess = () => {
        const expectedToken = import.meta.env.REACT_APP_POST_TOKEN;

        if(token.trim() === expectedToken.trim()) {
            setHasAccess(true);
            localStorage.setItem('admin-token', token);
            console.log('Using token: ', token);
            setStatus('');
        } else {
            setStatus('Invalid token');
        }
    }

        const handleChange = (e) => {
            const { name, value } = e.target;
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setStatus('Sending...');

            const response = await fetch('api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                setStatus('Post created!');
                setForm({ title: '', slug: '', content: '', thumbnail: '' });
            }else {
                const err = await response.json();
                setStatus(`Failed: ${err.error || 'Unknown Error'}`);
            }
        };


        return (
            <Box sx={{maxWidth: 600, mx: 'auto', mt: 6, px: 3}}>
                {!hasAccess ? (
                    <>
                    <Typography variant="h6" mb={1}>
                        Admin Token Required
                    </Typography>
                    
                    <TextField label="Token" type="password" fullWidth value={token} onChange={(e) => setToken(e.target.value)}
                    sx={{ mb: 2}} />
                    <Button variant="contained" onClick={handleAccess}>
                        Enter
                    </Button>

                    {status && <Alert severity="error" sx={{ mt: 2}}>{status}</Alert>}
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h5" mb={2}>
                            Create a New Post
                        </Typography>

                        <TextField
                        label="Slug (for URL)"
                        name="slug"
                        fullWidth
                        value={form.slug}
                        onChange={handleChange}
                        sx={{ mb: 2}}
                        />

                        <TextField
                        label="Thumbnail URL"
                        name="thumbnail"
                        fullWidth
                        value={form.thumbnail}
                        onChange={handleChange}
                        sx={{ mb: 2}}
                        />

                        <TextField
                        label="Title"
                        name="title"
                        fullWidth
                        value={form.title}
                        onChange={handleChange}
                        sx={{ mb: 2}}
                        />

                        <TextField
                        label="Content"
                        name="content"
                        fullWidth
                        value={form.content}
                        onChange={handleChange}
                        sx={{ mb: 2}}
                        />

                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                        {status && <Alert sx={{ mt: 2}}>{status}</Alert>}
                    </form>
                )}
                <Button onClick={() => navigate('/blog')}>Back to Blog Page</Button>
            </Box>
        );
    }