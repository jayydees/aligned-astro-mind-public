import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
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
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-elevated">
              <Heart className="w-8 h-8 text-secondary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-secondary mb-4">
            About Aligned
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Rethinking modern dating with depth, compatibility, and intention
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-3">The Problem</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Modern dating apps create fatigue through excessive emphasis on looks-based photo swiping, 
                  poorly filled bios, and low-quality prompts that don't reveal personality or values.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  People are left judging compatibility on superficial attributes, leading to disappointing 
                  matches and wasted time.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-3">Our Solution</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Aligned eliminates photos entirely and focuses on thoughtfully crafted bios and prompts. 
                  We use AI to analyze personality compatibility while incorporating Vedic astrology-based 
                  compatibility logic (planetary positions, Nakshatra analysis) for deeper alignment.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our psychologist-designed assessments go beyond MBTI to understand your core traits, 
                  attachment style, and values—delivering matches that truly resonate.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-3">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a dating landscape where people connect based on genuine compatibility—where 
                  conversations start with depth, matches feel meaningful, and relationships are built on 
                  shared values and authentic understanding. Aligned is for those who want substance over 
                  swipes, and depth over superficiality.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/profile">
              Start Your Journey
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default About;
