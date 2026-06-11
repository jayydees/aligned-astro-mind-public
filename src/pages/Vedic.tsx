import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Moon, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Vedic = () => {
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
            <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Vedic Astrology Compatibility
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ancient wisdom meets modern matching technology
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <h2 className="text-2xl font-bold text-secondary mb-4">Our Vedic Compatibility Logic</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Unlike traditional Gun Milan (which uses a fixed 36-point system), Aligned employs a 
              sophisticated Vedic astrology analysis that considers multiple dimensions of compatibility.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Moon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-2">Key Factors We Analyze</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Ascendant Sign (Lagna)</h3>
                  <p className="text-sm text-muted-foreground">
                    Your rising sign shapes your outward personality and how you interact with the world
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Moon Sign (Rashi)</h3>
                  <p className="text-sm text-muted-foreground">
                    Represents emotional nature and inner world—critical for relationship harmony
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Nakshatra Compatibility</h3>
                  <p className="text-sm text-muted-foreground">
                    27 lunar mansions that reveal deeper personality layers and natural affinities
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Strongest Planets (Shadbala)</h3>
                  <p className="text-sm text-muted-foreground">
                    Identifies which planetary energies dominate your chart and how they interact with matches
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-secondary mb-1">House Placements</h3>
                  <p className="text-sm text-muted-foreground">
                    Analyzes 7th house (partnerships), 5th house (romance), and other relationship houses
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-2">House Relationship Combinations</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We analyze how your Moon sign relates to potential matches based on house positions:
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 ml-16">
              <div className="space-y-1">
                <p className="font-semibold text-secondary">1–7 Relationship</p>
                <p className="text-sm text-muted-foreground">Complementary opposites, natural balance</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-secondary">5–9 Relationship</p>
                <p className="text-sm text-muted-foreground">Harmonious trine, supportive energy</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-secondary">3–11 Relationship</p>
                <p className="text-sm text-muted-foreground">Growth and communication alignment</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-secondary">4–10 Relationship</p>
                <p className="text-sm text-muted-foreground">Home and career balance</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-secondary">6–8 Relationship</p>
                <p className="text-sm text-muted-foreground">Intensity and transformation</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-secondary">6–12 / 2–12 / 1–8</p>
                <p className="text-sm text-muted-foreground">Karmic lessons and challenges</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 rounded-2xl p-8 border border-accent/20">
            <h2 className="text-2xl font-bold text-secondary mb-3">Why Vedic Astrology?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Vedic astrology has been used for thousands of years to assess relationship compatibility. 
              By understanding planetary influences and energetic alignments, we can identify natural 
              chemistry and potential challenges before they arise.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Combined with our psychological assessments, this creates a holistic view of compatibility 
              that goes far beyond surface-level attraction.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/profile">
              Get Your Compatibility Score
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Vedic;
