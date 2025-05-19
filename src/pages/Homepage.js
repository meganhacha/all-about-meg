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

            { /* There are currently 3 cards. I intend to add maybe one or two more, but I'm
                 not sure what they will be exactly. */}
                <HomeCard
                title="About Me"
                description="Who I am, what I do, and even what I'm listening to."
                route="/about"
                />

                <HomeCard
                title="Blog"
                description="An ongoing collection of whatever I've been thinking about lately."
                route="/blog"
                />

                <HomeCard
                title="Contact"
                description="Reach out for questions, answers, or just to connect."
                route="/contact"
                />

            </Box>
        </Box>
    );
}