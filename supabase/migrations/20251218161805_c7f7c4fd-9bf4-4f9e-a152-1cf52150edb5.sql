-- Fix the security definer view by setting it to security invoker
-- This ensures RLS is evaluated in the context of the querying user
ALTER VIEW public.public_profiles SET (security_invoker = true);