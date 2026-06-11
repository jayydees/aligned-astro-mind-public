-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view other profiles public info" ON public.profiles;

-- Create a secure view for public profile data (only non-sensitive fields)
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  user_id,
  profile_name,
  current_location,
  gender,
  relationship_status,
  communication_preference,
  languages,
  interests,
  primary_interest_description,
  profession,
  life_journey,
  values,
  last_active,
  created_at,
  profile_complete,
  -- Calculate age without exposing exact birth date
  EXTRACT(YEAR FROM AGE(date_of_birth))::integer as age
FROM public.profiles;

-- Grant access to authenticated users
GRANT SELECT ON public.public_profiles TO authenticated;

-- Create a new restrictive policy for viewing other users' public profiles
-- This only allows access through the view, not direct table access
CREATE POLICY "Users can view other profiles via view only" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  -- Users can only see their own full profile directly
  auth.uid() = user_id
);