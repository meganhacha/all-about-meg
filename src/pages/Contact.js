import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Contact = () => {
    const navigate = useNavigate();

    const [status, setStatus] = useState("Send");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        const { name, email, message } = e.target.elements;
        let deets = {
            name: name.value,
            email: email.value,
            message: message.value
        };

        let response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(deets),
        });

        if (response.ok) {
            setStatus('Message sent!');
            e.target.reset();
        } else {
            setStatus('Failed to send.');
        }
    };

    return (
        <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            maxWidth: '80%',
            gap: 5,
            padding: 3,
            borderRadius: 2,
            boxShadow: 2,
            position: 'relative',
            left: '10%',
            marginTop: '3vw'
        }}
        >
        <Typography variant="h3" fontFamily={'Merriweather'} color={'rgb(75, 57, 51)'}>Get in Touch</Typography>
        <Typography variant="h5" fontFamily={'Merriweather'} color={'rgb(101, 75, 67)'}>Send me a message and I'll get back to you ASAP!</Typography>
        <TextField name="name" label="Your Name" required />
        <TextField name="email" label="Your Email" type="email" required />
        <TextField name="message" label="Your Message" multiline rows={4} required />
        <Button type="submit" variant="contained" sx={{
            height: '3rem',
            fontFamily: 'Karla',
            fontSize: '24px',
            background: 'rgb(105, 83, 75)',
        }}>{status}</Button>

        <Button onClick={() => navigate('/')} sx={{
                        height: '3rem',
                        fontFamily: 'Karla',
                        fontSize: '24px',
                        background: 'rgb(105, 83, 75)',
                        color: 'white'
        }}>Home</Button>
        </Box>
    );
};
export default Contact;