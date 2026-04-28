import { NextResponse } from "next/server";
import { z } from "zod";
import { resend, contactFromEmail, contactToEmail } from "@/lib/resend";

const schema = z.object({
  name:    z.string().min(2),
  company: z.string().min(2),
  role:    z.string().min(2),
  country: z.string().min(2),
  scope:   z.enum(["mining", "exploration", "civil", "environmental", "other"]),
  message: z.string().min(20),
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
    replyTo: data.name,
    text:    `Name: ${data.name}\nCompany: ${data.company}\nRole: ${data.role}\nCountry: ${data.country}\nScope: ${data.scope}\n\n${data.message}`,
  });

  if (error) {
    console.error("[contact] Resend error", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
