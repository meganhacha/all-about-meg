import { AppBar, Box, Toolbar, Typography, Button, styled } from '@mui/material';
const pages = ['About Me', 'Thoughts', 'Contact'];

const styledAppBar = {
    background: 'rgba(131, 107, 98, 0.7)'
}

const styledToolbar = {
    padding: '3px',
    alignContent: 'right'
}


export default function NavBar() {
return (
    <AppBar position='static' sx={styledAppBar}>
        <Toolbar>
            {pages.map((page) =>
            <Button
            key={page}
            sx={{my: 2, color: 'rgb(77, 48, 4)', fontSize: '1.3rem', alignContent: 'center', paddingLeft: '1.5rem', paddingRight: '1.5rem', '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'rgb(75, 57, 51)',
                color: 'rgb(251, 186, 88)'
            } 
            }}>
                {page}
            </Button>)}
        </Toolbar>
    </AppBar>
)
}