import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import TiptapEditor from '../components/TiptapEditor';


export default function PostForm() {
    const { slug } = useParams();
    const isEdit = !!slug;
    const [token, setToken] = useState('');
    const [hasAccess, setHasAccess] = useState(false);
    const [form, setForm] = useState( {
        title: '',
        slug: '',
        content: '',
        thumbnail: '',
        tags: [],
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


    useEffect(() => {
        
        if(!isEdit) return;

        if (slug) {
            fetch(`/api/posts/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setForm({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    thumbnail: data.thumbnail,
                    tagsIn: data.tags.join(', '),
                });
            });
        }
    }, [slug]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tags = form.tagsIn
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

        const payload = {
            title: form.title,
            slug: form.slug,
            content: form.content,
            thumbnail: form.thumbnail,
            tags,
        };

        const method = isEdit ? 'PUT' : 'POST';
        const endpt = isEdit ? `/api/posts/${slug}` : '/api/posts';

        const res = await fetch(endpt, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (res.ok){
            navigate('/blog');
        }
    };

    const handleAccess = () => {
        const expectedToken = import.meta.env.REACT_APP_POST_TOKEN;

        if(token.trim() === expectedToken.trim()) {
            setHasAccess(true);
            localStorage.setItem('admin-token', token);
            console.log('Using token: ', token);
            setStatus('');
        } else {
            setStatus('Invalid token');
        };
    }

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

                        <Box sx={{ mb: 2}}>
                            <Typography variant='subtitle1'>
                                Content
                            </Typography>
                            <TiptapEditor
                            value={form.content}
                            onChange={(value) =>
                                setForm((prev) => ({
                                    ...prev,
                                    content: value,
                                }))
                                }
                            />
                        </Box>

                        <TextField
                        label="Tags (separate with commas)"
                        name="tags"
                        fullWidth
                        value={form.tagsIn || ''}
                        onChange={(e) => {
                            setForm((prev) => ({
                                ...prev,
                                tagsIn: e.target.value,
                            }))
                        }}
                        />

                        <Button type="submit" sx={{ mt: 2}}>
                            {isEdit ? 'Update Post' : 'Create Post'}
                        </Button>
                        {status && <Alert sx={{ mt: 2 }}>{status}</Alert>}
                    </form>
                )}
                <Button onClick={() => navigate('/blog')}>Back to Blog Page</Button>
            </Box>
        );
    }