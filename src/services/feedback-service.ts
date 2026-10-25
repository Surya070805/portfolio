import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { createHash } from "crypto";
import { feedbackSchema, type FeedbackInput } from "@/lib/feedback-schema";
import { feedbackProvider } from "@/lib/feedback/provider.server";

// In-memory rate limit per server instance. Sufficient for low-volume
// portfolio traffic; swap for Redis/Upstash for production-scale apps.
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimit(key: string) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_PER_WINDOW;
}

function hashIp(ip: string | null | undefined) {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT ?? "feedback";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export const submitFeedback = createServerFn({ method: "POST" })
  .validator((data: unknown) => feedbackSchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot — silently accept and drop
    if (data.website) {
      return { ok: true as const, id: "drop" };
    }

    const ip = (() => {
      try {
        return getRequestIP({ xForwardedFor: true });
      } catch {
        return null;
      }
    })();
    const ipHash = hashIp(ip);

    if (!rateLimit(ipHash ?? "global")) {
      throw new Error("Too many submissions — please try again in a minute.");
    }

    const userAgent = (() => {
      try {
        return getRequestHeader("user-agent") ?? null;
      } catch {
        return null;
      }
    })();

    const stored = await feedbackProvider.storage.save({
      name: data.name,
      email: data.email,
      subject: data.subject || undefined,
      message: data.message,
      source: "website:contact-form",
      userAgent,
      ipHash,
    });

    // Fire-and-forget notification — never blocks the user response.
    if (feedbackProvider.notifier) {
      void feedbackProvider.notifier.notify(stored);
    }

    return { ok: true as const, id: stored.id };
  });

export type { FeedbackInput };
