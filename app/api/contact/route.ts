import { NextResponse } from "next/server";
import { z } from "zod";
import { resend, contactFromEmail, contactToEmail } from "@/lib/resend";

const schema = z.object({
  name:    z.string().min(2).max(120).regex(/^[^\r\n]+$/, "Invalid name"),
  email:   z.string().email().max(200),
  company: z.string().min(2).max(200).regex(/^[^\r\n]+$/, "Invalid company"),
  role:    z.string().min(2).max(120).regex(/^[^\r\n]+$/, "Invalid role"),
  country: z.string().min(2).max(120).regex(/^[^\r\n]+$/, "Invalid country"),
  scope:   z.enum(["mining", "exploration", "civil", "groundwater", "other"]),
  message: z.string().min(20).max(5000),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const data = parsed.data;

  if (!resend) {
    console.info("[contact] Resend not configured — logging payload only", data);
    return NextResponse.json({ ok: true, stubbed: true });
  }

  const { error } = await resend.emails.send({
    from:    contactFromEmail,
    to:      contactToEmail,
    subject: `New enquiry — ${data.company} (${data.scope})`,
    replyTo: `${data.name} <${data.email}>`,
    text:
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Company: ${data.company}\n` +
      `Role: ${data.role}\n` +
      `Country: ${data.country}\n` +
      `Scope: ${data.scope}\n\n` +
      data.message,
  });

  if (error) {
    console.error("[contact] Resend error", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
