import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface ProgressNudgeProps {
  completion: number;
}

export const ProgressNudge = ({ completion }: ProgressNudgeProps) => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-6 shadow-card border border-primary/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-lg text-secondary">
              Your Profile Progress
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Complete your profile for <span className="font-semibold text-accent">65% better</span> matches
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-secondary">
                {completion}% complete
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>
        <Button size="sm" className="shrink-0" asChild>
          <Link to="/profile">
            Complete
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
