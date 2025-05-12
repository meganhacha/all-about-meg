import * as React from 'react';
import {Button, Stack, Typography, Box} from '@mui/material';
import HomeCard from '../cards/HomeCard';


export default function Homepage() {

    const styledMaster = {
       paddingTop: '2rem' 
    }
    
    const styledText = {
        textAlign: 'center',
        fontFamily: 'Karla',
        color: 'rgb(75, 57, 51)',
    }



    return (
        <Box sx={styledMaster}>
            <Box>
            <Typography variant='h2' fontWeight={750} sx={styledText}>
                Hello!
            </Typography>
            <Typography variant='h5' fontWeight={500} sx={styledText}>
                Thanks for stopping by. Click any of the links below to see more!
            </Typography>
            </Box>

            <Box sx = {{
                    display: 'grid',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    mt: 10,
                    gap: '2rem'
                }}
            >
                <HomeCard
                title="About Me"
                description="Learn a bit more about me and what I'm up to at the moment."
                route="/about"
                />

                <HomeCard
                title="Blog"
                description="Perfume reviews and various other things from my mind."
                route="/blog"
                />

                <HomeCard
                title="Contact"
                description="Share your thoughts with yours truly."
                route="/contact"
                />

            </Box>
        </Box>
    );
}