import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, MessageSquare, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const TextFirst = () => {
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
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-secondary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Text-First Profiles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Substance over swipes. Personality over photos.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <h2 className="text-2xl font-bold text-secondary mb-4">Why We Eliminated Photos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Research shows that photo-based dating apps create a superficial selection process where 
              users make snap judgments in under 3 seconds. This leads to:
            </p>
            
            <ul className="space-y-2 ml-6">
              <li className="text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Dating fatigue from endless, meaningless swiping</span>
              </li>
              <li className="text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Overlooking truly compatible partners who aren't conventionally photogenic</span>
              </li>
              <li className="text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Shallow conversations that rarely progress to meaningful connections</span>
              </li>
              <li className="text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Disappointment when in-person chemistry doesn't match photo attraction</span>
              </li>
            </ul>
          </section>

          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-2">The Power of Thoughtful Profiles</h2>
                <p className="text-muted-foreground leading-relaxed">
                  On Aligned, profiles consist of:
                </p>
              </div>
            </div>
            
            <div className="space-y-4 ml-16">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Detailed "About Me" sections</h3>
                  <p className="text-sm text-muted-foreground">
                    Users craft authentic narratives about their personality, values, and what makes them unique
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Personality-revealing prompts</h3>
                  <p className="text-sm text-muted-foreground">
                    Thoughtfully designed questions that reveal communication style, humor, and worldview
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Values and lifestyle preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    Clear indication of relationship goals, deal-breakers, and life priorities
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">AI-powered quality checks</h3>
                  <p className="text-sm text-muted-foreground">
                    Our system encourages depth and authenticity while discouraging generic responses
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-2">The Results</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By focusing on substance, Aligned users experience:
                </p>
              </div>
            </div>
            
            <ul className="space-y-3 ml-16">
              <li className="text-muted-foreground">
                <span className="font-semibold text-secondary">3x longer conversations</span> compared to photo-based apps
              </li>
              <li className="text-muted-foreground">
                <span className="font-semibold text-secondary">Higher match quality</span> with 65% better compatibility scores
              </li>
              <li className="text-muted-foreground">
                <span className="font-semibold text-secondary">More meaningful first dates</span> because you've already connected intellectually
              </li>
              <li className="text-muted-foreground">
                <span className="font-semibold text-secondary">Reduced ghosting</span> as matches are based on genuine interest
              </li>
              <li className="text-muted-foreground">
                <span className="font-semibold text-secondary">Stronger long-term potential</span> founded on personality and values alignment
              </li>
            </ul>
          </section>

          <section className="bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 rounded-2xl p-8 border border-secondary/20">
            <h2 className="text-2xl font-bold text-secondary mb-3">For People Who Want More</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you're tired of being judged solely on photos, if you believe personality and compatibility 
              matter more than looks, and if you're ready for conversations that actually lead somewhere—
              Aligned is built for you. We're creating a dating experience where depth comes first, 
              and where your words reveal who you really are.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/profile">
              Build Your Profile
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TextFirst;
