import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'louistart0ggy@gmail.com',
        pass: 'yxwqluowapinllpn',
    },
});

export default transporter;
