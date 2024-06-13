import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

interface Data {
  fullName: string;
  email: string;
  message: string;
  phone: string;
  token: string;
}

const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: path.resolve('./src/email/'),
    layoutsDir: path.resolve('./src/email/'),
    defaultLayout: 'contact',
  },
  viewPath: path.resolve('./src/email/'),
  extName: '.handlebars',
};

export default async function ContactApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { fullName, email, phone, message, token }: Data = req.body;

  const human = await validateHuman(token);
  if (!human) {
    res.status(400);
    res.json({ errors: ["It's a bot! ❤️ ❌ 🤖"] });
    return;
  }
  const transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT as unknown as number,
    secure: true,
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  transporter.use('compile', hbs(handlebarOptions));

  try {
    await transporter.sendMail({
      from: `${fullName} no-reply@${process.env.CONTACT_FORM_SEND_EMAIL_DOMAIN}`,
      replyTo: email,
      to: process.env.CONTACT_FORM_RECEIVE_EMAIL,
      subject: 'Neue Anfrage, Dücker Medizintechnik Kontaktformular',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      template: 'contact',
      context: {
        fullName: fullName,
        email: email,
        phone: phone,
        message: message,
      },
    });
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(500).json({ message: 'an error occurred' });
    throw err;
  }
}

async function validateHuman(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: 'POST',
    },
  );
  const data = await response.json();
  return data.success;
}
