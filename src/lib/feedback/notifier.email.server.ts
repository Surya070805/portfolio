import type { FeedbackNotifier, FeedbackStored } from "./types.server";

/**
 * Email notifier — sends a plain-text notification of new feedback to the
 * site owner. Provider auto-detected from env:
 *
 *   - RESEND_API_KEY      → Resend (https://resend.com)
 *   - EMAILJS_SERVICE_ID  → EmailJS REST API (https://www.emailjs.com)
 *   - (default)           → no-op log; safe to ship without configuring email
 *
 * Recipient: FEEDBACK_NOTIFY_EMAIL (falls back to "from" address).
 */

const NOTIFY_TO = process.env.FEEDBACK_NOTIFY_EMAIL;
const FROM = process.env.FEEDBACK_FROM_EMAIL ?? "noreply@example.com";

function format(input: FeedbackStored) {
  const subject = `[Feedback] ${input.subject || "New message"} — ${input.name}`;
  const text = [
    `From: ${input.name} <${input.email}>`,
    input.subject ? `Subject: ${input.subject}` : null,
    `Source: ${input.source ?? "website"}`,
    `When: ${input.createdAt}`,
    "",
    input.message,
  ]
    .filter(Boolean)
    .join("\n");
  return { subject, text };
}

async function sendViaResend(input: FeedbackStored) {
  const apiKey = process.env.RESEND_API_KEY!;
  const { subject, text } = format(input);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: FROM,
      to: [NOTIFY_TO ?? FROM],
      reply_to: input.email,
      subject,
      text,
    }),
  });
  if (!res.ok) {
    throw new Error(`[feedback/email:resend] ${res.status} ${await res.text()}`);
  }
}

async function sendViaEmailJS(input: FeedbackStored) {
  const serviceId = process.env.EMAILJS_SERVICE_ID!;
  const templateId = process.env.EMAILJS_TEMPLATE_ID!;
  const userId = process.env.EMAILJS_USER_ID!;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  const { subject, text } = format(input);
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      accessToken: privateKey,
      template_params: {
        to_email: NOTIFY_TO ?? FROM,
        from_name: input.name,
        from_email: input.email,
        reply_to: input.email,
        subject,
        message: text,
      },
    }),
  });
  if (!res.ok) {
    throw new Error(`[feedback/email:emailjs] ${res.status} ${await res.text()}`);
  }
}

export const emailNotifier: FeedbackNotifier = {
  name: "email",
  async notify(input) {
    try {
      if (process.env.RESEND_API_KEY) {
        await sendViaResend(input);
        return;
      }
      if (process.env.EMAILJS_SERVICE_ID) {
        await sendViaEmailJS(input);
        return;
      }
      // Safe default: log only. Configure RESEND_API_KEY or EMAILJS_* to enable real delivery.
      console.log("[feedback/email] (no provider configured) would notify:", {
        id: input.id,
        from: `${input.name} <${input.email}>`,
        subject: input.subject,
      });
    } catch (err) {
      // Never let a failed notification fail the user's submission.
      console.error("[feedback/email] notify failed:", err);
    }
  },
};
