import React, { useState } from 'react';
import { useRegistration } from '@/contexts/RegistrationContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Step5AboutYou: React.FC = () => {
  const { data, updateAboutYou, setCurrentStep } = useRegistration();
  const { aboutYou } = data;
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!aboutYou.profession.trim()) {
      newErrors.profession = 'Profession is required';
    } else if (aboutYou.profession.length > 100) {
      newErrors.profession = 'Profession must be under 100 characters';
    }
    
    if (!aboutYou.lifeJourney.trim()) {
      newErrors.lifeJourney = 'Life journey is required';
    } else if (aboutYou.lifeJourney.length < 50) {
      newErrors.lifeJourney = 'Please write at least 50 characters';
    } else if (aboutYou.lifeJourney.length > 1000) {
      newErrors.lifeJourney = 'Maximum 1000 characters allowed';
    }
    
    if (!aboutYou.values.trim()) {
      newErrors.values = 'Values are required';
    } else if (aboutYou.values.length < 30) {
      newErrors.values = 'Please write at least 30 characters';
    } else if (aboutYou.values.length > 500) {
      newErrors.values = 'Maximum 500 characters allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setCurrentStep(6);
    } else {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-secondary">About You</h2>
        <p className="text-muted-foreground">Share your story with potential matches</p>
      </div>

      {/* Profession */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Your Profession <span className="text-destructive">*</span>
        </Label>
        <Input
          value={aboutYou.profession}
          onChange={(e) => updateAboutYou({ profession: e.target.value })}
          placeholder="e.g., Software Engineer, Doctor, Teacher..."
          maxLength={100}
          className={errors.profession ? 'border-destructive' : ''}
        />
        {errors.profession && <p className="text-xs text-destructive">{errors.profession}</p>}
      </div>

      {/* Life Journey */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Tell us about your life journey <span className="text-destructive">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">This will be visible on your profile</p>
        <Textarea
          value={aboutYou.lifeJourney}
          onChange={(e) => updateAboutYou({ lifeJourney: e.target.value })}
          placeholder="Share your story, experiences, what shaped you..."
          maxLength={1000}
          rows={5}
          className={errors.lifeJourney ? 'border-destructive' : ''}
        />
        <div className="flex justify-between text-xs">
          <span className={aboutYou.lifeJourney.length < 50 ? 'text-destructive' : 'text-muted-foreground'}>
            Minimum 50 characters
          </span>
          <span className={aboutYou.lifeJourney.length > 900 ? 'text-accent' : 'text-muted-foreground'}>
            {aboutYou.lifeJourney.length}/1000 characters
          </span>
        </div>
        {errors.lifeJourney && <p className="text-xs text-destructive">{errors.lifeJourney}</p>}
      </div>

      {/* Values */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          What do you value most in life? <span className="text-destructive">*</span>
        </Label>
        <Textarea
          value={aboutYou.values}
          onChange={(e) => updateAboutYou({ values: e.target.value })}
          placeholder="Family, honesty, growth, spirituality, freedom..."
          maxLength={500}
          rows={3}
          className={errors.values ? 'border-destructive' : ''}
        />
        <div className="flex justify-between text-xs">
          <span className={aboutYou.values.length < 30 ? 'text-destructive' : 'text-muted-foreground'}>
            Minimum 30 characters
          </span>
          <span className={aboutYou.values.length > 450 ? 'text-accent' : 'text-muted-foreground'}>
            {aboutYou.values.length}/500 characters
          </span>
        </div>
        {errors.values && <p className="text-xs text-destructive">{errors.values}</p>}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={() => setCurrentStep(4)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} className="gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Step5AboutYou;
