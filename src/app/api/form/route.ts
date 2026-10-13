import * as Sentry from '@sentry/nextjs';
import Handlebars from 'handlebars';
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import nodemailer from 'nodemailer';

interface FormData {
  name: string;
  email: string;
  message: string;
  phone: string;
  token: string;
}

const CONTACT_TEMPLATE_PATH = path.resolve('./src/email/contact.handlebars');

type ContactEmailContext = Omit<FormData, 'token'>;

let contactTemplate:
  | Handlebars.TemplateDelegate<ContactEmailContext>
  | undefined;

async function renderContactEmail(context: ContactEmailContext) {
  contactTemplate ??= Handlebars.compile(
    await readFile(CONTACT_TEMPLATE_PATH, 'utf8'),
  );
  return contactTemplate(context);
}

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
    return NextResponse.json(
      { errors: ['Invalid request body'] },
      { status: 400 },
    );
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

  try {
    await transporter.sendMail({
      from: `${name} no-reply@${process.env.CONTACT_FORM_SEND_EMAIL_DOMAIN}`,
      replyTo: email,
      to: process.env.CONTACT_FORM_RECEIVE_EMAIL,
      subject: 'Neue Anfrage, Dücker Medizintechnik Kontaktformular',
      html: await renderContactEmail({ name, email, phone, message }),
    });
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ message: 'an error occurred' }, { status: 500 });
  }
}
