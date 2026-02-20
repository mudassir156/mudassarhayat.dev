import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})
console.log('USER:', process.env.GMAIL_USER)
console.log('PASS:', process.env.GMAIL_APP_PASSWORD ? 'loaded' : 'MISSING')
export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    await transporter.sendMail({
      from: `"Portfolio" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `...`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error) // ← add this
    return NextResponse.json({ error: String(error) }, { status: 500 }) // ← return actual error
  }
}