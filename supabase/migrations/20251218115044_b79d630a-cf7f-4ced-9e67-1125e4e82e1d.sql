-- Drop the security definer view that caused the warning
DROP VIEW IF EXISTS public.public_profiles;

-- Instead, add a policy for users to view other users' public profile info
CREATE POLICY "Users can view other profiles public info" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);