const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST'){
        return res.status(405).end();
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Missing fields' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOpts = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Contact form message from ${name}`,
        text: `Contact email: ${email}\n\n${message}`,
    };

    try {
        await transporter.sendMail(mailOpts);
        res.status(200).json({success: true});
    } catch (error){
        console.error('Email send error', error);
        res.status(500).json({success: false, error: 'Email send failed'});
    }
}