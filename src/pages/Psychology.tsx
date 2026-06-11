import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, Heart, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Psychology = () => {
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
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Brain className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Psychology-Driven Matching
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scientifically validated assessments designed by psychologists
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <h2 className="text-2xl font-bold text-secondary mb-4">Our Assessment Framework</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Aligned uses a comprehensive psychological framework that goes beyond simple personality 
              types to understand the nuances of human compatibility.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Big Five Personality Traits</h3>
                  <p className="text-sm text-muted-foreground">
                    Measures openness, conscientiousness, extraversion, agreeableness, and emotional stability
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">MBTI Type Indicators</h3>
                  <p className="text-sm text-muted-foreground">
                    Identifies thinking patterns and how you process information and make decisions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Attachment Styles</h3>
                  <p className="text-sm text-muted-foreground">
                    Understanding secure, anxious, avoidant, or mixed attachment patterns in relationships
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Love Languages</h3>
                  <p className="text-sm text-muted-foreground">
                    Identifies how you prefer to give and receive love (words, acts, gifts, time, touch)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Values Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Core life values like family, career, adventure, spirituality, and personal growth
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Lightbulb className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-2">How It Improves Matching</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By understanding multiple dimensions of personality, we can identify:
                </p>
              </div>
            </div>
            
            <ul className="space-y-3 ml-16">
              <li className="text-muted-foreground">
                <span className="font-semibold text-secondary">Complementary traits</span> that create balance
              </li>
              <li className="text-muted-foreground">
                <span className="font-semibold text-secondary">Shared values</span> that align life goals
              </li>
              <li className="text-muted-foreground">
                <span className="font-semibold text-secondary">Communication compatibility</span> for fewer misunderstandings
              </li>
              <li className="text-muted-foreground">
                <span className="font-semibold text-secondary">Emotional needs alignment</span> in relationships
              </li>
              <li className="text-muted-foreground">
                <span className="font-semibold text-secondary">Potential friction points</span> to be aware of early
              </li>
            </ul>
          </section>

          <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-2">The Result</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Unlike superficial swipe-based apps, our psychology-driven approach has shown to increase 
                  match quality by up to 65%. Users report more meaningful conversations, better first dates, 
                  and stronger long-term relationship potential.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/profile">
              Take the Assessment
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Psychology;
