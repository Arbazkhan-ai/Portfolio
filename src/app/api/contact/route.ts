import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const dataFilePath = path.join(process.cwd(), 'src/data/messages.json');

const getMessages = () => {
    if (!fs.existsSync(dataFilePath)) return [];
    try {
        return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    } catch {
        return [];
    }
};

// Create reusable Nodemailer transporter using Gmail SMTP
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });
};

export async function GET() {
    try {
        const messages = getMessages();
        return NextResponse.json(messages);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // ── 1. Save to JSON file (existing behavior) ──────────────────────────
        const messages = getMessages();
        const newMessage = {
            id: Date.now(),
            name,
            email,
            message,
            date: new Date().toISOString(),
            read: false,
        };
        const updatedMessages = [newMessage, ...messages];
        fs.writeFileSync(dataFilePath, JSON.stringify(updatedMessages, null, 4));

        // ── 2. Send email notification via Gmail SMTP ──────────────────────────
        const gmailUser = process.env.GMAIL_USER;
        const gmailPass = process.env.GMAIL_APP_PASSWORD;
        const receiver  = process.env.CONTACT_RECEIVER || 'arbazkhan140@gmail.com';

        if (gmailUser && gmailPass && gmailPass !== 'your_app_password_here') {
            try {
                const transporter = createTransporter();

                // Notification email to you
                await transporter.sendMail({
                    from: `"Portfolio Contact" <${gmailUser}>`,
                    to: receiver,
                    replyTo: email,
                    subject: `📩 New Contact from ${name} — Portfolio`,
                    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; background: #040711; font-family: 'Segoe UI', Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #040711; }
    .header {
      background: linear-gradient(135deg, #0c1425 0%, #111d34 100%);
      border-bottom: 2px solid transparent;
      border-image: linear-gradient(90deg, #4f8dff, #a855f7, #f472b6) 1;
      padding: 36px 40px;
      text-align: center;
    }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; color: #f0f4ff; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #94a3b8; }
    .badge {
      display: inline-block;
      margin-top: 12px;
      padding: 4px 14px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      background: rgba(79,141,255,0.12);
      border: 1px solid rgba(79,141,255,0.3);
      color: #4f8dff;
    }
    .body { padding: 36px 40px; }
    .field { margin-bottom: 24px; }
    .field-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #475569;
      margin-bottom: 8px;
      font-family: monospace;
    }
    .field-value {
      background: #0c1425;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px;
      padding: 14px 18px;
      font-size: 14px;
      color: #f0f4ff;
      line-height: 1.6;
    }
    .message-box {
      background: #0c1425;
      border: 1px solid rgba(79,141,255,0.2);
      border-left: 3px solid #4f8dff;
      border-radius: 12px;
      padding: 18px 20px;
      font-size: 14px;
      color: #cbd5e1;
      line-height: 1.8;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .reply-btn {
      display: inline-block;
      margin-top: 28px;
      padding: 14px 28px;
      background: linear-gradient(135deg, #4f8dff, #a855f7);
      color: #ffffff;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 0.02em;
    }
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 28px 0; }
    .footer { padding: 20px 40px 32px; text-align: center; color: #475569; font-size: 11px; font-family: monospace; }
    .footer span { color: #4f8dff; }
    .meta { display: flex; gap: 20px; margin-top: 8px; }
    .meta-item { color: #94a3b8; font-size: 12px; }
    .meta-item strong { color: #f0f4ff; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>📩 New Message</h1>
      <p>Someone reached out through your portfolio contact form</p>
      <span class="badge">Portfolio · Arbaz Khan</span>
    </div>

    <div class="body">
      <div class="field">
        <div class="field-label">Sender Name</div>
        <div class="field-value">${name}</div>
      </div>

      <div class="field">
        <div class="field-label">Reply-To Email</div>
        <div class="field-value">${email}</div>
        <div class="meta">
          <div class="meta-item">Received: <strong>${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</strong></div>
        </div>
      </div>

      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>

      <hr class="divider" />

      <div style="text-align: center;">
        <a href="mailto:${email}?subject=Re: Portfolio Inquiry&body=Hi ${name},%0D%0A%0D%0A" class="reply-btn">
          ↩ Reply to ${name}
        </a>
      </div>
    </div>

    <div class="footer">
      <p>Sent from your portfolio at <span>arbazkhan.dev</span></p>
      <p style="margin-top:4px; opacity:0.5;">This notification was auto-generated — do not reply to this email directly.</p>
    </div>
  </div>
</body>
</html>
                    `,
                });

                // Auto-reply to the sender
                await transporter.sendMail({
                    from: `"Arbaz Khan — AI Engineer" <${gmailUser}>`,
                    to: email,
                    subject: `Thanks for reaching out, ${name}! — Arbaz Khan`,
                    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; background: #040711; font-family: 'Segoe UI', Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #040711; }
    .header {
      background: linear-gradient(135deg, #0c1425 0%, #111d34 100%);
      border-bottom: 2px solid transparent;
      border-image: linear-gradient(90deg, #4f8dff, #a855f7) 1;
      padding: 40px;
      text-align: center;
    }
    .avatar {
      width: 72px; height: 72px; border-radius: 50%;
      background: linear-gradient(135deg, #4f8dff, #a855f7);
      margin: 0 auto 16px;
      display: flex; align-items: center; justify-content: center;
      font-size: 28px; font-weight: 800; color: white;
      line-height: 72px; text-align: center;
    }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; color: #f0f4ff; }
    .header p { margin: 8px 0 0; font-size: 13px; color: #94a3b8; }
    .body { padding: 36px 40px; }
    .greeting { font-size: 22px; font-weight: 700; color: #f0f4ff; margin-bottom: 16px; }
    .text { font-size: 15px; color: #94a3b8; line-height: 1.8; }
    .highlight {
      background: #0c1425;
      border: 1px solid rgba(79,141,255,0.2);
      border-left: 3px solid #4f8dff;
      border-radius: 12px;
      padding: 16px 20px;
      margin: 24px 0;
      font-size: 13px;
      color: #cbd5e1;
      font-family: monospace;
      line-height: 1.7;
    }
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 28px 0; }
    .social { text-align: center; margin-top: 24px; }
    .social a {
      display: inline-block;
      margin: 0 8px;
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      text-decoration: none;
      border: 1px solid rgba(255,255,255,0.1);
      color: #94a3b8;
    }
    .footer { padding: 20px 40px 32px; text-align: center; color: #475569; font-size: 11px; font-family: monospace; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="avatar">A</div>
      <h1>Arbaz Khan</h1>
      <p>AI Engineer & Developer</p>
    </div>

    <div class="body">
      <div class="greeting">Hey ${name}! 👋</div>
      <p class="text">
        Thanks for reaching out through my portfolio. I got your message and will get back to you as soon as possible — usually within 24–48 hours.
      </p>

      <div class="highlight">
        📋 <strong style="color:#f0f4ff;">Your Message Summary</strong><br><br>
        <strong>From:</strong> ${name} &lt;${email}&gt;<br>
        <strong>Received:</strong> ${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}<br><br>
        <em style="color:#94a3b8;">"${message.substring(0, 120).replace(/</g, '&lt;').replace(/>/g, '&gt;')}${message.length > 120 ? '...' : ''}"</em>
      </div>

      <p class="text">
        In the meantime, feel free to check out my work on GitHub or connect with me on LinkedIn.
      </p>

      <hr class="divider">

      <div class="social">
        <a href="https://github.com/Arbazkhan-ai">🐙 GitHub</a>
        <a href="https://www.linkedin.com/in/arbaz-khan-3az/">💼 LinkedIn</a>
      </div>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Arbaz Khan — AI Engineer & Developer</p>
    </div>
  </div>
</body>
</html>
                    `,
                });

                console.log(`[Contact] Email sent for "${name}" <${email}>`);
            } catch (emailError) {
                // Log the email error but don't fail the whole request —
                // the message is already saved to the JSON file.
                console.error('[Contact] Failed to send email:', emailError);
            }
        } else {
            console.warn('[Contact] Email not sent: GMAIL_APP_PASSWORD not configured in .env.local');
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('[Contact] POST error:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
