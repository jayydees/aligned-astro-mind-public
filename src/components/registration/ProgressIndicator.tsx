import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  onStepClick 
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-secondary">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}% complete
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {onStepClick && (
        <div className="flex justify-between mt-3">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <button
              key={step}
              onClick={() => onStepClick(step)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                step === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : step < currentStep
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {step}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;
