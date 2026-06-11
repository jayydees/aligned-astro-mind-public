import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Brain, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-accent/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-elevated">
              <Heart className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-3xl font-bold text-secondary">Aligned</h2>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-secondary leading-tight">
              Find deeper compatibility,
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                beyond photos
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Aligned uses AI, psychology, and Vedic astrology to help you find
              meaningful connections based on who you truly are.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/auth">
                Get Started
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2"
              asChild
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
          
          {/* Login Link */}
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link to="/auth" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-16">
            <Link to="/psychology" className="block">
              <div className="p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-elevated transition-all space-y-3 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-secondary">
                  Psychology-Driven
                </h3>
                <p className="text-sm text-muted-foreground">
                  Personality assessments designed by psychologists to understand
                  your core traits and values.
                </p>
              </div>
            </Link>

            <Link to="/vedic" className="block">
              <div className="p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-elevated transition-all space-y-3 h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-lg text-secondary">
                  Vedic Astrology
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ancient wisdom meets modern matching with planetary and
                  Nakshatra compatibility analysis.
                </p>
              </div>
            </Link>

            <Link to="/text-first" className="block">
              <div className="p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-elevated transition-all space-y-3 h-full">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold text-lg text-secondary">
                  Text-First Profiles
                </h3>
                <p className="text-sm text-muted-foreground">
                  No photos. Just thoughtfully crafted bios and prompts that
                  reveal personality and intention.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
