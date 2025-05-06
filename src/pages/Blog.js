import { Box, Button, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     fetch('api/posts')
    //     .then((res) => res.json())
    //     .then(setPosts);
    // }, []);

    return(
        <Box display={'column'} alignItems={'center'}>
        <h2>This part of the site is under construction.</h2>
        <h4>No, really. This is going to be the most complicated part so I'm saving it for last.</h4>
        <Button onClick={() => navigate('/')} sx={{background: 'rgb(105, 83, 75)', color: 'white'}}>Take Me Back</Button>
        </Box>
    )
}