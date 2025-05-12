import { Box, Typography, Avatar, Divider, Button} from '@mui/material';
import { Image } from '@mui/icons-material';


export default function AboutMe() {

    return (
        <Box sx={{
            maxWidth: 800,
            minHeight: '100vh',
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
                sx={{width: 255, height: 255}}/>

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
                fontSize: '2.5rem',
                fontWeight: 750
            }}>Megan Hacha</Typography>
            
            <Typography fontFamily={'Merriweather'} sx={{
                textAlign: 'center',
                fontSize: '1.5rem',
                fontWeight: 500,
            }}>'Hack-uh'</Typography>


            <Typography fontFamily={'Karla'} sx={{
                fontSize: '1.75rem',
                padding: '10px',
                paddingTop: '20px',
                mt: 5,
                mb: 10,
                fontSize: '1rem',
                fontWeight: 450,
                textAlign: 'center'
            }}>
                Thanks for stopping by!
                My name is Megan, and I'm a soon-to-be graduate of Purdue Fort Wayne's computer science program.
                I've been able to touch on a handful of riveting topics throughout my time there, but I've found myself gravitating towards 2 languages the most: JavaScript and Python.
                This very website was born from the desire to become more comfortable with React, JavaScript itself, and back-end programming.
                Click any of the links below to contact me elsewhere!

                <div>
                <p fontFamily='Karla' fontSize='1.75' paddingTop='1rem'><a href="https://github.com/meganhacha">GitHub</a></p>
                <p fontFamily='Karla' fontSize='1.75' paddingTop='1rem'><a href="https://www.linkedin.com/in/megan-hacha/">LinkedIn</a></p>
                <p fontFamily='Karla' fontSize='1.75' paddingTop='1rem'><a href="https://steamcommunity.com/profiles/76561198116395018/">Steam</a></p>
                </div>
            </Typography> 

            <Typography fontFamily={'Karla'} sx={{
                fontSize: '1.25rem',
                fontWeight: 450,
                textDecorationLine: 'underline'
            }}> Currently Listening To:</Typography>
            <iframe style={{borderRadius: '12px'}} src="https://open.spotify.com/embed/playlist/5Xs5JT4xwUyT0vVHthD5xb?utm_source=generator" 
            width="100%" 
            height="352" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"></iframe>

            </Box>
        </Box>
    )
}