REVOKE SELECT, UPDATE, DELETE ON public.feedback FROM anon, authenticated;

CREATE POLICY "No public reads of feedback"
ON public.feedback
FOR SELECT
TO anon, authenticated
USING (false);