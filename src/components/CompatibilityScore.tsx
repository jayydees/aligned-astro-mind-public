import { Brain, Sparkles } from "lucide-react";

interface CompatibilityScoreProps {
  type: "psychological" | "vedic";
  score: number;
  label: string;
}

export const CompatibilityScore = ({
  type,
  score,
  label,
}: CompatibilityScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-accent";
    if (score >= 70) return "text-primary";
    return "text-muted-foreground";
  };

  const getBackgroundColor = (score: number) => {
    if (score >= 80) return "bg-accent/10";
    if (score >= 70) return "bg-primary/10";
    return "bg-muted/50";
  };

  return (
    <div
      className={`p-4 rounded-xl border border-border ${getBackgroundColor(
        score
      )} transition-colors`}
    >
      <div className="flex items-center gap-2 mb-2">
        {type === "psychological" ? (
          <Brain className="w-4 h-4 text-secondary" />
        ) : (
          <Sparkles className="w-4 h-4 text-secondary" />
        )}
        <span className="text-xs font-semibold text-secondary uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
        {score}%
      </div>
    </div>
  );
};
