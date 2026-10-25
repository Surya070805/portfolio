/**
 * Pluggable feedback storage + notification providers.
 *
 * A provider is anything that implements `FeedbackProvider`. The default
 * stack uses Supabase for persistence and an email notifier (Lovable Email
 * by default, optional Resend/EmailJS). Drop-in adapters for Firebase and
 * EmailJS are included so swapping providers is a one-line change.
 *
 * NOTE: This file is server-only. It is imported by the `submitFeedback`
 * server function and a server route. Never import it from client code.
 */

import type { FeedbackInput } from "@/lib/feedback-schema";

export type FeedbackRecord = FeedbackInput & {
  source?: string;
  userAgent?: string | null;
  ipHash?: string | null;
};

export type FeedbackStored = FeedbackRecord & {
  id: string;
  createdAt: string;
};

export interface FeedbackStorage {
  name: string;
  save(input: FeedbackRecord): Promise<FeedbackStored>;
}

export interface FeedbackNotifier {
  name: string;
  notify(input: FeedbackStored): Promise<void>;
}

export interface FeedbackProvider {
  storage: FeedbackStorage;
  notifier?: FeedbackNotifier;
}
