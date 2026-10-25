/**
 * Provider selector. Swap implementations by changing FEEDBACK_PROVIDER.
 *
 *   FEEDBACK_PROVIDER = "supabase" (default) | "firebase"
 *
 * The notifier is always the email notifier, which itself auto-detects
 * Resend/EmailJS/no-op based on env (see notifier.email.server.ts).
 */

import { supabaseStorage } from "./storage.supabase.server";
import { firebaseStorage } from "./storage.firebase.server";
import { emailNotifier } from "./notifier.email.server";
import type { FeedbackProvider } from "./types.server";

function pickStorage() {
  const choice = (process.env.FEEDBACK_PROVIDER ?? "supabase").toLowerCase();
  switch (choice) {
    case "firebase":
      return firebaseStorage;
    case "supabase":
    default:
      return supabaseStorage;
  }
}

export const feedbackProvider: FeedbackProvider = {
  storage: pickStorage(),
  notifier: emailNotifier,
};

export type { FeedbackProvider, FeedbackRecord, FeedbackStored } from "./types.server";
