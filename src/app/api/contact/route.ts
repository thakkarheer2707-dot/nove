import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send notification email to the website owner
    await transporter.sendMail({
      from: `"NOVE Contact Form" <${process.env.SMTP_EMAIL}>`,
      to: "Thakkarheer2707@gmail.com",
      subject: `New Contact Message: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #ffffff; border: 1px solid #e5e7eb; color: #1f2937; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="letter-spacing: 0.1em; border-bottom: 2px solid #111827; display: inline-block; padding-bottom: 8px; margin: 0; font-family: serif; color: #111827;">NOVE</h1>
            <p style="color: #6b7280; font-size: 14px; margin-top: 8px; font-weight: bold; letter-spacing: 0.05em; uppercase;">NEW CONTACT FORM SUBMISSION</p>
          </div>
          
          <div style="background: #f9fafb; padding: 25px; border-radius: 12px; border: 1px solid #f3f4f6; margin-bottom: 30px;">
            <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: bold; letter-spacing: 0.1em; color: #9ca3af; text-transform: uppercase;">Sender Name</p>
            <p style="margin: 0 0 20px 0; font-size: 16px; color: #111827; font-weight: 600;">${name}</p>
            
            <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: bold; letter-spacing: 0.1em; color: #9ca3af; text-transform: uppercase;">Sender Email</p>
            <p style="margin: 0 0 20px 0; font-size: 16px; color: #3b82f6; font-weight: 500;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>

            <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: bold; letter-spacing: 0.1em; color: #9ca3af; text-transform: uppercase;">Enquiry Subject</p>
            <p style="margin: 0; font-size: 16px; color: #111827; font-weight: 600;">${subject}</p>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px;">Message Details</h3>
            <p style="font-size: 15px; color: #374151; line-height: 1.6; white-space: pre-wrap; background: #fff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 12px;">${message}</p>
          </div>

          <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 40px; border-top: 1px solid #f3f4f6; padding-top: 20px;">
            This enquiry was sent securely from the NOVE contact page portal.
          </p>
        </div>
      `,
    });

    console.log(`[CONTACT MAIL] Successfully forwarded submission from ${email} to owner.`);

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully." });
  } catch (error: any) {
    console.error("[CONTACT API ERROR] Failure:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
