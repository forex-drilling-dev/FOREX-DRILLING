import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;
export const contactToEmail = process.env.CONTACT_TO_EMAIL ?? "admin@forexdrilling.com";
export const contactFromEmail = process.env.CONTACT_FROM_EMAIL ?? "website@forexdrilling.com";
