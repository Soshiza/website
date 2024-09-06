import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    const { subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail.com',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.GMAIL_EMAIL,
        to: 'soshiza.agency@gmail.com',
        subject,
        text: message,
    });

    res.status(200).send({ status: 'OK' });
}