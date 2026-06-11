import React, { useState } from 'react';
import { useRegistration } from '@/contexts/RegistrationContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LocationAutocomplete from './LocationAutocomplete';
import { RELATIONSHIP_STATUSES, COMMUNICATION_PREFERENCES } from '@/data/interests';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Step3RelationshipLocation: React.FC = () => {
  const { data, updateRelationshipLocation, setCurrentStep } = useRegistration();
  const { relationshipLocation } = data;
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!relationshipLocation.relationshipStatus) {
      newErrors.relationshipStatus = 'Please select your relationship status';
    }
    if (!relationshipLocation.currentLocation) {
      newErrors.currentLocation = 'Current location is required';
    }
    if (!relationshipLocation.communicationPreference) {
      newErrors.communicationPreference = 'Please select your communication preference';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setCurrentStep(4);
    } else {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
    }
  };

  const handleLocationSelect = (location: string, lat: number, lng: number) => {
    updateRelationshipLocation({
      currentLocation: location,
      currentLatitude: lat,
      currentLongitude: lng,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-secondary">Relationship & Location</h2>
        <p className="text-muted-foreground">Help us understand your situation</p>
      </div>

      {/* Relationship Status */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Relationship Status <span className="text-destructive">*</span>
        </Label>
        <Select
          value={relationshipLocation.relationshipStatus}
          onValueChange={(value) => updateRelationshipLocation({ relationshipStatus: value })}
        >
          <SelectTrigger className={errors.relationshipStatus ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select your status" />
          </SelectTrigger>
          <SelectContent>
            {RELATIONSHIP_STATUSES.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.relationshipStatus && <p className="text-xs text-destructive">{errors.relationshipStatus}</p>}
      </div>

      {/* Current Location */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Current Location <span className="text-destructive">*</span>
        </Label>
        <LocationAutocomplete
          value={relationshipLocation.currentLocation}
          onChange={handleLocationSelect}
          placeholder="Where do you currently live?"
        />
        {errors.currentLocation && <p className="text-xs text-destructive">{errors.currentLocation}</p>}
      </div>

      {/* Communication Preference */}
      <div className="space-y-3">
        <Label className="flex items-center gap-1">
          Communication Preference <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground">How do you prefer connecting with people?</p>
        <RadioGroup
          value={relationshipLocation.communicationPreference}
          onValueChange={(value) => updateRelationshipLocation({ communicationPreference: value })}
          className="flex flex-col gap-3"
        >
          {COMMUNICATION_PREFERENCES.map((pref) => (
            <div key={pref.value} className="flex items-start space-x-3">
              <RadioGroupItem value={pref.value} id={pref.value} className="mt-1" />
              <div>
                <Label htmlFor={pref.value} className="font-medium cursor-pointer">
                  {pref.label}
                </Label>
                <p className="text-sm text-muted-foreground">{pref.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
        {errors.communicationPreference && <p className="text-xs text-destructive">{errors.communicationPreference}</p>}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={() => setCurrentStep(2)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} className="gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Step3RelationshipLocation;
