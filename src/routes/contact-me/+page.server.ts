import type { IContactPayload } from '$lib/ts-interfaces';
import { invalid } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

const user = import.meta.env.VITE_EMAIL_USER;
const pass = import.meta.env.VITE_EMAIL_PASS;
const myEmail = import.meta.env.VITE_MY_EMAIL;

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: { user, pass },
});

/** @type {import('./$types').Actions} */
export const actions = {
    submission: async ({ request }) => {
        try {
            const data = await request.formData();
            const submission: IContactPayload = {
                email: '',
                name: '',
                message: '',
            };
            
            for (const pair of data.entries()) {
                submission[pair[0] as keyof IContactPayload] = pair[1];
            }

            // send the form submission
            const email = await transporter.sendMail({
                from: `MarcusWiseman.com <${user}>`,
                to: myEmail,
                subject: 'Contact form submission',
                html: `
                    <h3>Contact form submission</h3>
                    <h5>Email: ${submission.email}</h5>
                    <h5>Name: ${submission.name}</h5>
                    <p>Message: ${submission.message}</p>
                `,
            });

            if (!!email) return { success: true };
            else return invalid(500, { message: 'Email error, please try again' });
        } catch (err) {
            return invalid(500, { message: 'Server error, please try again :>> ' + err });
        }
    },
};
