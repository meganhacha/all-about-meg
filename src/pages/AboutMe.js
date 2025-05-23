import { Box, Typography, Avatar, Divider, Button} from '@mui/material';
import { Image } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export default function AboutMe() {
    const navigate = useNavigate();

    return (
        <Box sx={{
            maxWidth: 800,
            minHeight: '80vh',
            mx: 'auto',
            mt: 2,
            px: 3,
            gap: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Avatar
                alt="Megan Hacha"
                src="/Me(gan).jpeg"
                sx={{width: 200, height: 200}}/>

            <Box sx={{
                backgroundColor: 'rgb(253, 250, 244)',
                maxWidth: 700,
                p: 4,
                borderRadius: 3,
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                width: '100%',
            }}>

            <Typography fontFamily={'Merriweather'} sx= {{
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 750
            }}>Megan Hacha</Typography>

        {/* Some clarification on last name pronunciation.
            English doesn't tend to favor the k sound when ch is used. */}
            <Typography fontFamily={'Merriweather'} sx={{
                textAlign: 'center',
                fontSize: '1.5rem',
                fontWeight: 500,
            }}>'Hack-uh'</Typography>


            <Typography fontFamily={'Karla'} sx={{
                fontSize: '1rem',
                padding: '10px',
                paddingTop: '20px',
                mt: 5,
                mb: 10,
                fontWeight: 450,
                textAlign: 'center'
            }}>
                Hi! I'm Megan, a recent computer science graduate from Purdue Fort Wayne. While I've explored a wide range of topics, I've found myself most at home with web development and lanugages like Python.
                This site was born out of my desire to deepen my comfort with React, improve my backend skills, and have a space to explore my technical and personal interests. Feel free to click around to see what I've been working on or how I'm spending my free time.

        {/* Using regular html links for now. Steam account link will probably be removed when I realize someone has actually visited the site. */}
                <div>
                <p fontFamily='Karla' fontSize='1.75' paddingTop='1rem'><a href="https://github.com/meganhacha">GitHub</a></p>
                <p fontFamily='Karla' fontSize='1.75' paddingTop='1rem'><a href="https://www.linkedin.com/in/megan-hacha/">LinkedIn</a></p>
                <p fontFamily='Karla' fontSize='1.75' paddingTop='1rem'><a href="https://steamcommunity.com/profiles/76561198116395018/">Steam</a></p>

        {/* Temporary button location until I can figure out appropriate placement. */}
                <Button onClick={() => navigate('/')} sx={{
                    backgroundColor: 'rgb(105, 83, 75)',
                    mt: '3rem',
                    color: 'white'
                }}>
                    Home
                </Button>
                </div>
            </Typography> 

            <Typography fontFamily={'Karla'} sx={{
                fontSize: '1.25rem',
                fontWeight: 450,
                textDecorationLine: 'underline'
            }}> Currently Listening To:</Typography>

        {/* iframe is provided directly from Spotify */}
            <iframe src="https://open.spotify.com/embed/playlist/5Xs5JT4xwUyT0vVHthD5xb?utm_source=generator&theme=0" 
            width="100%" 
            height="152" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title='spotifyFrame'></iframe>

            </Box>
        </Box>
    )
}