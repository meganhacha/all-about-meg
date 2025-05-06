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
                fontSize: '1.5rem',
                padding: '10px',
                paddingTop: '20px',
                mt: 5,
                mb: 10,
                fontSize: '1rem',
                fontWeight: 450,
                textAlign: 'center'
            }}>
                Thanks for stopping by!
            </Typography> 

            <Typography fontFamily={'Karla'} sx={{
                fontSize: '1.25rem',
                fontWeight: 450,
                textDecorationLine: 'underline'
            }}>Currently Listening To:</Typography>
            <iframe style={{borderRadius: '12px'}} src="https://open.spotify.com/embed/playlist/5Xs5JT4xwUyT0vVHthD5xb?utm_source=generator" 
            width="100%" 
            height="352" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"></iframe>

            </Box>
        </Box>
    )
}