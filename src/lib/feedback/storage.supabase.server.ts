import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { FeedbackRecord, FeedbackStorage, FeedbackStored } from "./types.server";

export const supabaseStorage: FeedbackStorage = {
  name: "supabase",
  async save(input: FeedbackRecord): Promise<FeedbackStored> {
    const { data, error } = await supabaseAdmin
      .from("feedback")
      .insert({
        name: input.name,
        email: input.email,
        subject: input.subject || null,
        message: input.message,
        source: input.source ?? "website",
        user_agent: input.userAgent ?? null,
        ip_hash: input.ipHash ?? null,
      })
      .select("id, created_at")
      .single();

    if (error) {
      throw new Error(`[feedback/supabase] ${error.message}`);
    }

    return {
      ...input,
      id: data.id as string,
      createdAt: data.created_at as string,
    };
  },
};
