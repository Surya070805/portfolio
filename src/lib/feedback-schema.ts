import { z } from "zod";

export const feedbackSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email" })
    .max(255, { message: "Email must be under 255 characters" }),
  subject: z
    .string()
    .trim()
    .max(150, { message: "Subject must be under 150 characters" })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(5, { message: "Message must be at least 5 characters" })
    .max(2000, { message: "Message must be under 2000 characters" }),
  // Honeypot — bots fill this, humans don't see it
  website: z.string().max(0).optional().or(z.literal("")),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
