import { Card, CardActionArea, CardContent, Typography, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomeCard({title, description, route}) {
    const navigate = useNavigate();

    return (
        <Card sx={{
            width: '50vw',
            background: 'white'
        }}>

            <CardActionArea onClick={() => navigate(route)}>
                <CardContent>
                    <Typography variant="h5" fontFamily={'Merriweather'} fontSize={'32px'} gutterBottom>
                        {title}
                    </Typography>

                    <Typography variant="body2" fontSize={'18px'} color='rgb(77, 48, 4)'>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );

}