import { Box, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './pageFormats.css';


export default function Projects() {
    const navigate = useNavigate();

    return (
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <h1 className='page-title'>Projects</h1>

            <Button onClick={() => navigate('/')} sx={{
                    backgroundColor: 'rgb(105, 83, 75)',
                    mt: '3rem',
                    color: 'white'
                }}>
                Home
            </Button>
        </Box>

    )
}