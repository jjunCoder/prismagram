import { nouns, adjectives } from "./word";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumberForNouns = Math.floor(Math.random() * nouns.length);
    const randomNumberForAdjectives = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumberForAdjectives]} ${nouns[randomNumberForNouns]}`;
}

export const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    }
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "aption@company.com",
        to: address,
        subject: "Login Secret for Prismagram 👨🏻‍💻",
        html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/web to log in`
    }
    return sendMail(email);
}

export const generateToken = id => jwt.sign(id, process.env.JWT_SECRET);




