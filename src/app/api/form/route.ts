import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

interface FormData {
  name: string;
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

async function validateHuman(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    { method: 'POST' },
  );
  const data = await response.json();
  return data.success;
}

export async function POST(request: NextRequest) {
  let body: FormData;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ errors: ['Invalid request body'] }, { status: 400 });
  }

  const { name, email, phone, message, token } = body;

  const human = await validateHuman(token);
  if (!human) {
    return NextResponse.json(
      { errors: ["It's a bot! ❤️ ❌ 🤖"] },
      { status: 400 },
    );
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
      from: `${name} no-reply@${process.env.CONTACT_FORM_SEND_EMAIL_DOMAIN}`,
      replyTo: email,
      to: process.env.CONTACT_FORM_RECEIVE_EMAIL,
      subject: 'Neue Anfrage, Dücker Medizintechnik Kontaktformular',
      // @ts-expect-error nodemailer-express-handlebars extends the options
      template: 'contact',
      context: { name, email, phone, message },
    });
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (err) {
    console.error('Mail send error:', err);
    return NextResponse.json(
      { message: 'an error occurred' },
      { status: 500 },
    );
  }
}
