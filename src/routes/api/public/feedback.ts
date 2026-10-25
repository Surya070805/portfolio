/**
 * Public HTTP endpoint for external feedback submissions (e.g. embed
 * widgets, partner sites). Uses the same provider stack as the internal
 * server function but with CORS enabled so it can be called from any origin.
 *
 * URL: /api/public/feedback
 */

import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "crypto";
import { feedbackSchema } from "@/lib/feedback-schema";
import { feedbackProvider } from "@/lib/feedback/provider.server";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function hashIp(ip: string | null) {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT ?? "feedback";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export const Route = createFileRoute("/api/public/feedback")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json(
            { ok: false, error: "Invalid JSON" },
            { status: 400, headers: CORS },
          );
        }

        const parsed = feedbackSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
            { status: 400, headers: CORS },
          );
        }

        if (parsed.data.website) {
          return Response.json({ ok: true, id: "drop" }, { headers: CORS });
        }

        const ip =
          request.headers.get("cf-connecting-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          null;

        try {
          const stored = await feedbackProvider.storage.save({
            name: parsed.data.name,
            email: parsed.data.email,
            subject: parsed.data.subject || undefined,
            message: parsed.data.message,
            source: "api:public",
            userAgent: request.headers.get("user-agent"),
            ipHash: hashIp(ip),
          });

          if (feedbackProvider.notifier) {
            void feedbackProvider.notifier.notify(stored);
          }

          return Response.json({ ok: true, id: stored.id }, { headers: CORS });
        } catch (err) {
          console.error("[api/public/feedback]", err);
          return Response.json(
            { ok: false, error: "Internal error" },
            { status: 500, headers: CORS },
          );
        }
      },
    },
  },
});
