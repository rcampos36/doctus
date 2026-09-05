"use server";

import { Resend } from "resend";

export type ContactState = {
  status: "idle" | "sent" | "error";
  error?: string;
};

function text(value: FormDataEntryValue | null) {
  return String(value || "").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (text(formData.get("company"))) {
    return { status: "sent" };
  }

  const name = text(formData.get("name"));
  const email = text(formData.get("email"));
  const message = text(formData.get("message"));

  if (!name || !email || !message) {
    return { status: "error", error: "Please fill in your name, email, and message." };
  }

  if (!isEmail(email) || name.length > 120 || message.length > 5000) {
    return { status: "error", error: "Please check the form and try again." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      error: "Email is not configured yet. Add RESEND_API_KEY to send messages.",
    };
  }

  const to = process.env.CONTACT_TO_EMAIL || "doctushealthcareconsulting@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Doctus <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New Doctus inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h2>New Doctus inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `,
    });

    if (error) {
      return {
        status: "error",
        error: error.message || "The message could not be sent. Please try again.",
      };
    }

    return { status: "sent" };
  } catch {
    return { status: "error", error: "The message could not be sent. Please try again." };
  }
}
