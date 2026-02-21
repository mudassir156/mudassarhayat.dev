import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
} as nodemailer.TransportOptions)

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 12px;">
          <h2 style="color: #6366f1; margin-bottom: 24px;">📬 New Portfolio Message</h2>

          <div style="background: white; border-radius: 10px; padding: 20px; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 12px; font-weight: 700; color: #6b7280; width: 100px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Name</td>
                <td style="padding: 10px 12px; color: #111827; font-size: 15px;">${name}</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px 12px; font-weight: 700; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
                <td style="padding: 10px 12px; font-size: 15px;">
                  <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: 700; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Subject</td>
                <td style="padding: 10px 12px; color: #111827; font-size: 15px;">${subject}</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px 12px; font-weight: 700; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Message</td>
                <td style="padding: 10px 12px; color: #111827; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>

          <p style="margin-top: 20px; font-size: 13px; color: #9ca3af; text-align: center;">
            Sent from your portfolio contact form · Reply directly to reach ${email}
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}