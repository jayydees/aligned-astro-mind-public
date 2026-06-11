import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { CompatibilityScore } from "./CompatibilityScore";

interface MatchCardProps {
  name: string;
  age: number;
  city: string;
  bioSnippet: string;
  psychScore: number;
  vedicScore: number;
  moonSign: string;
  personalityType: string;
  lookingFor: string;
  psychJustification: string;
  vedicJustification: string;
}

export const MatchCard = ({
  name,
  age,
  city,
  bioSnippet,
  psychScore,
  vedicScore,
  moonSign,
  personalityType,
  lookingFor,
  psychJustification,
  vedicJustification,
}: MatchCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">
              {name}, {age}
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4" />
              <span>{city}</span>
              <span className="mx-1">•</span>
              <span>{lookingFor}</span>
              <span className="mx-1">•</span>
              <span>{moonSign}</span>
              <span className="mx-1">•</span>
              <span>{personalityType}</span>
            </div>
          </div>
        </div>

        {/* Bio Snippet */}
        <p className="text-foreground/80 leading-relaxed italic">
          "{bioSnippet}"
        </p>

        {/* Compatibility Scores */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <CompatibilityScore
              type="psychological"
              score={psychScore}
              label="Psychological"
            />
            <p className="text-xs text-muted-foreground italic">
              {psychJustification}
            </p>
          </div>
          <div className="space-y-2">
            <CompatibilityScore
              type="vedic"
              score={vedicScore}
              label="Vedic Astrology"
            />
            <p className="text-xs text-muted-foreground italic">
              {vedicJustification}
            </p>
          </div>
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="pt-4 border-t border-border space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-secondary">
                Psychological Compatibility
              </h4>
              <p className="text-sm text-muted-foreground">
                Strong alignment in communication style and values. Complementary
                personality traits that foster growth.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-secondary">
                Vedic Compatibility
              </h4>
              <p className="text-sm text-muted-foreground">
                Moon signs indicate emotional harmony. Nakshatra compatibility
                suggests natural understanding.
              </p>
            </div>
          </div>
        )}

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-muted-foreground hover:text-foreground"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-sm">
            {isExpanded ? "Show less" : "View detailed breakdown"}
          </span>
          <ChevronDown
            className={`w-4 h-4 ml-2 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </Button>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 border-2 hover:bg-destructive/10 hover:border-destructive/20"
          >
            <X className="w-5 h-5 mr-2" />
            Pass
          </Button>
          <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90">
            <Heart className="w-5 h-5 mr-2" />
            Connect
          </Button>
        </div>
      </div>
    </Card>
  );
};
