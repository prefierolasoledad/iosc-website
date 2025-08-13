import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, email, phone, college, year, branch, github, linkedin } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Event Registration Confirmation",
      text: `Hi ${fullName},

Thanks for registering for our event!

Details:
Date: 28 Aug 2025
Time: 3:00 PM
Venue: Lecture Hall
WhatsApp: https://chat.whatsapp.com/example

${github ? `GitHub: ${github}` : ""}
${linkedin ? `LinkedIn: ${linkedin}` : ""}`,
    });

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("Email sending failed:", error);
    return new Response(JSON.stringify({ success: false, message: "Email sending failed" }), { status: 500 });
  }
}
