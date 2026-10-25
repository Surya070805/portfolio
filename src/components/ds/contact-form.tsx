import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { feedbackSchema, type FeedbackInput } from "@/lib/feedback-schema";
import { submitFeedback } from "@/services/feedback-service";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  className?: string;
  onSuccess?: (id?: string) => void;
  showSubject?: boolean;
};

export function ContactForm({ className, onSuccess, showSubject = true }: Props) {
  const reveal = useReveal();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  });

  const onSubmit = async (data: FeedbackInput) => {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await submitFeedback({ data });
      setStatus("success");
      reset();
      onSuccess?.(res?.id);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setStatus("error");
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  if (status === "success") {
    return (
      <motion.div
        {...reveal}
        className={cn(
          "rounded-lg border border-border bg-card/40 p-8 text-center shadow-card",
          className,
        )}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-h3 mt-4">Message received.</h3>
        <p className="mt-2 text-small text-muted-foreground">
          Thanks for reaching out — I&apos;ll get back to you shortly.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          <RotateCcw className="h-3.5 w-3.5" /> Send another
        </Button>
      </motion.div>
    );
  }

  const submitting = status === "submitting";

  return (
    <motion.form
      {...reveal}
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "space-y-4 rounded-lg border border-border bg-card/40 p-6 shadow-card",
        className,
      )}
      noValidate
    >
      {/* Honeypot — visually hidden but discoverable by bots */}
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="cf-website">Website</Label>
        <Input id="cf-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="cf-name">Name</Label>
          <Input
            id="cf-name"
            autoComplete="name"
            disabled={submitting}
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cf-email">Email</Label>
          <Input
            id="cf-email"
            type="email"
            autoComplete="email"
            disabled={submitting}
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      {showSubject && (
        <div className="space-y-1.5">
          <Label htmlFor="cf-subject">
            Subject <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="cf-subject"
            disabled={submitting}
            {...register("subject")}
            aria-invalid={!!errors.subject}
            placeholder="What's this about?"
          />
          {errors.subject && (
            <p className="text-xs text-destructive">{errors.subject.message}</p>
          )}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="cf-message">Message</Label>
        <Textarea
          id="cf-message"
          rows={5}
          maxLength={2000}
          disabled={submitting}
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <AnimatePresence>
        {status === "error" && errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive"
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-muted-foreground">
          Validated client + server.
        </p>
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" /> Send message
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
}
