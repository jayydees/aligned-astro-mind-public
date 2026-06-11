-- Create profiles table for user registration data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Birth Details (private)
  date_of_birth DATE NOT NULL,
  time_of_birth TIME NOT NULL,
  place_of_birth TEXT NOT NULL,
  birth_latitude DECIMAL(10, 7) NOT NULL,
  birth_longitude DECIMAL(10, 7) NOT NULL,
  birth_timezone TEXT NOT NULL,
  
  -- Personal Identity
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  profile_name TEXT NOT NULL UNIQUE,
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'Non-Binary')),
  
  -- Location & Status
  relationship_status TEXT NOT NULL,
  current_location TEXT NOT NULL,
  current_latitude DECIMAL(10, 7) NOT NULL,
  current_longitude DECIMAL(10, 7) NOT NULL,
  communication_preference TEXT NOT NULL,
  
  -- Interests & Languages
  languages JSONB NOT NULL DEFAULT '[]'::jsonb,
  interests JSONB NOT NULL DEFAULT '[]'::jsonb,
  primary_interest_description TEXT,
  
  -- About
  profession TEXT NOT NULL,
  life_journey TEXT NOT NULL,
  values TEXT NOT NULL,
  
  -- Contact
  whatsapp_country_code TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  
  -- Metadata
  profile_complete BOOLEAN NOT NULL DEFAULT true,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can only view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create a view for public profile data (what other users can see)
CREATE VIEW public.public_profiles AS
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
  created_at
FROM public.profiles;