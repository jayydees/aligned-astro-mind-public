import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MatchCard } from "@/components/MatchCard";
import { ProgressNudge } from "@/components/ProgressNudge";
import { Sparkles, ArrowLeft, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

// Public profile data from secure view (excludes sensitive fields)
interface PublicProfile {
  id: string;
  user_id: string;
  profile_name: string;
  current_location: string;
  gender: string;
  relationship_status: string;
  communication_preference: string;
  languages: string[];
  interests: string[];
  primary_interest_description: string | null;
  profession: string;
  life_journey: string;
  values: string;
  last_active: string | null;
  created_at: string;
  profile_complete: boolean;
  age: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<PublicProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!user) return;

      // Fetch current user's profile for completion percentage
      const { data: myProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      setUserProfile(myProfile);

      // Fetch other profiles using the secure public_profiles view
      // This view only exposes non-sensitive fields (no phone, coordinates, birth details, real names)
      const { data, error } = await supabase
        .from("public_profiles" as any)
        .select("*")
        .neq("user_id", user.id)
        .eq("profile_complete", true)
        .limit(20);

      if (!error && data) {
        setProfiles(data as unknown as PublicProfile[]);
      }
      setLoading(false);
    };

    fetchProfiles();
  }, [user]);

  // Calculate profile completion percentage
  const calculateCompletion = (profile: Profile | null): number => {
    if (!profile) return 0;
    
    const fields = [
      profile.first_name,
      profile.last_name,
      profile.profile_name,
      profile.gender,
      profile.date_of_birth,
      profile.time_of_birth,
      profile.place_of_birth,
      profile.current_location,
      profile.profession,
      profile.life_journey,
      profile.values,
      (profile.interests as string[])?.length > 0,
      (profile.languages as string[])?.length > 0,
    ];
    
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };


  const completion = calculateCompletion(userProfile);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-4xl font-bold text-secondary">
            Your Matches
          </h1>
          <p className="text-muted-foreground">
            Thoughtfully curated based on personality and compatibility
          </p>
        </div>

        {/* Progress Nudge */}
        <div className="mb-8">
          <ProgressNudge completion={completion} />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-muted-foreground">Loading matches...</div>
          </div>
        ) : profiles.length > 0 ? (
          <>
            {/* AI Recommendation Badge */}
            <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full w-fit">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-secondary">
                AI Recommended for You
              </span>
            </div>

            {/* Match Feed */}
            <div className="space-y-6">
              {profiles.map((profile) => (
                <MatchCard
                  key={profile.id}
                  name={profile.profile_name}
                  age={profile.age}
                  city={profile.current_location}
                  bioSnippet={profile.life_journey}
                  psychScore={85} // TODO: Calculate from assessment
                  vedicScore={78} // TODO: Calculate from kundali
                  moonSign="Taurus" // TODO: Calculate from birth details
                  personalityType="INFJ" // TODO: From assessment
                  lookingFor={profile.relationship_status}
                  psychJustification="You both value emotional depth and meaningful connections."
                  vedicJustification="Compatible Moon signs in harmonious houses."
                />
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16 space-y-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto">
              <Users className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-secondary">No matches yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {!userProfile 
                ? "Complete your profile to start seeing compatible matches."
                : "We're working on finding your perfect matches. Check back soon!"}
            </p>
            {!userProfile && (
              <Button asChild className="mt-4">
                <Link to="/profile">Complete Profile</Link>
              </Button>
            )}
          </div>
        )}

        {/* Load More */}
        {profiles.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              That's all for now. Check back soon for more matches! ✨
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
