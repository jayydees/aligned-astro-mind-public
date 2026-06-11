import React, { useState } from 'react';
import { useRegistration } from '@/contexts/RegistrationContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Step2PersonalIdentity: React.FC = () => {
  const { data, updatePersonalIdentity, setCurrentStep } = useRegistration();
  const { personalIdentity } = data;
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!personalIdentity.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (personalIdentity.firstName.length > 50) {
      newErrors.firstName = 'First name must be under 50 characters';
    }
    
    if (!personalIdentity.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (personalIdentity.lastName.length > 50) {
      newErrors.lastName = 'Last name must be under 50 characters';
    }
    
    if (!personalIdentity.profileName.trim()) {
      newErrors.profileName = 'Profile name is required';
    } else if (personalIdentity.profileName.length > 30) {
      newErrors.profileName = 'Profile name must be under 30 characters';
    }
    
    if (!personalIdentity.gender) {
      newErrors.gender = 'Please select your gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setCurrentStep(3);
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
        <h2 className="text-2xl font-bold text-secondary">Personal Identity</h2>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </div>

      {/* First Name */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          First Name <span className="text-destructive">*</span>
        </Label>
        <Input
          value={personalIdentity.firstName}
          onChange={(e) => updatePersonalIdentity({ firstName: e.target.value })}
          placeholder="Enter your first name"
          maxLength={50}
          className={errors.firstName ? 'border-destructive' : ''}
        />
        {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Last Name <span className="text-destructive">*</span>
        </Label>
        <Input
          value={personalIdentity.lastName}
          onChange={(e) => updatePersonalIdentity({ lastName: e.target.value })}
          placeholder="Enter your last name"
          maxLength={50}
          className={errors.lastName ? 'border-destructive' : ''}
        />
        {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
      </div>

      {/* Profile Name */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Profile Name <span className="text-destructive">*</span>
        </Label>
        <Input
          value={personalIdentity.profileName}
          onChange={(e) => updatePersonalIdentity({ profileName: e.target.value })}
          placeholder="Choose a display name"
          maxLength={30}
          className={errors.profileName ? 'border-destructive' : ''}
        />
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">This name will be visible on your public profile</span>
          <span className={personalIdentity.profileName.length > 25 ? 'text-accent' : 'text-muted-foreground'}>
            {personalIdentity.profileName.length}/30 characters
          </span>
        </div>
        {errors.profileName && <p className="text-xs text-destructive">{errors.profileName}</p>}
      </div>

      {/* Gender */}
      <div className="space-y-3">
        <Label className="flex items-center gap-1">
          Gender <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={personalIdentity.gender}
          onValueChange={(value) => updatePersonalIdentity({ gender: value })}
          className="flex flex-col gap-3"
        >
          {['Male', 'Female', 'Non-Binary'].map((gender) => (
            <div key={gender} className="flex items-center space-x-3">
              <RadioGroupItem value={gender} id={gender.toLowerCase()} />
              <Label htmlFor={gender.toLowerCase()} className="font-normal cursor-pointer">
                {gender}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.gender && <p className="text-xs text-destructive">{errors.gender}</p>}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={() => setCurrentStep(1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} className="gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Step2PersonalIdentity;
