import React, { useState } from 'react';
import { useRegistration } from '@/contexts/RegistrationContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import LocationAutocomplete from './LocationAutocomplete';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const months = [
  { value: '01', label: 'January' }, { value: '02', label: 'February' }, { value: '03', label: 'March' },
  { value: '04', label: 'April' }, { value: '05', label: 'May' }, { value: '06', label: 'June' },
  { value: '07', label: 'July' }, { value: '08', label: 'August' }, { value: '09', label: 'September' },
  { value: '10', label: 'October' }, { value: '11', label: 'November' }, { value: '12', label: 'December' },
];

const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const years = Array.from({ length: 105 }, (_, i) => String(2024 - i));
const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

const Step1BirthDetails: React.FC = () => {
  const { data, updateBirthDetails, setCurrentStep } = useRegistration();
  const { birthDetails } = data;
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!birthDetails.dateOfBirth.day || !birthDetails.dateOfBirth.month || !birthDetails.dateOfBirth.year) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    if (!birthDetails.timeOfBirth.hour || !birthDetails.timeOfBirth.minute) {
      newErrors.timeOfBirth = 'Time of birth is required';
    }
    if (!birthDetails.placeOfBirth) {
      newErrors.placeOfBirth = 'Place of birth is required';
    }
    if (!birthDetails.birthTimezone) {
      newErrors.birthTimezone = 'Timezone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setCurrentStep(2);
    } else {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
    }
  };

  const handleLocationSelect = (location: string, lat: number, lng: number, timezone: string) => {
    updateBirthDetails({
      placeOfBirth: location,
      birthLatitude: lat,
      birthLongitude: lng,
      birthTimezone: timezone,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-secondary">Birth Details</h2>
        <p className="text-muted-foreground">Required for kundali calculations</p>
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Date of Birth <span className="text-destructive">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">(Required for kundali calculations)</p>
        <div className="grid grid-cols-3 gap-2">
          <Select
            value={birthDetails.dateOfBirth.day}
            onValueChange={(value) => updateBirthDetails({
              dateOfBirth: { ...birthDetails.dateOfBirth, day: value }
            })}
          >
            <SelectTrigger className={errors.dateOfBirth ? 'border-destructive' : ''}>
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {days.map(day => (
                <SelectItem key={day} value={day}>{day}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={birthDetails.dateOfBirth.month}
            onValueChange={(value) => updateBirthDetails({
              dateOfBirth: { ...birthDetails.dateOfBirth, month: value }
            })}
          >
            <SelectTrigger className={errors.dateOfBirth ? 'border-destructive' : ''}>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => (
                <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={birthDetails.dateOfBirth.year}
            onValueChange={(value) => updateBirthDetails({
              dateOfBirth: { ...birthDetails.dateOfBirth, year: value }
            })}
          >
            <SelectTrigger className={errors.dateOfBirth ? 'border-destructive' : ''}>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {errors.dateOfBirth && <p className="text-xs text-destructive">{errors.dateOfBirth}</p>}
      </div>

      {/* Time of Birth */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Time of Birth <span className="text-destructive">*</span>
        </Label>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="h-3 w-3" /> Check your birth certificate if unsure
        </p>
        <div className="grid grid-cols-3 gap-2">
          <Select
            value={birthDetails.timeOfBirth.hour}
            onValueChange={(value) => updateBirthDetails({
              timeOfBirth: { ...birthDetails.timeOfBirth, hour: value }
            })}
          >
            <SelectTrigger className={errors.timeOfBirth ? 'border-destructive' : ''}>
              <SelectValue placeholder="Hour" />
            </SelectTrigger>
            <SelectContent>
              {hours.map(hour => (
                <SelectItem key={hour} value={hour}>{hour}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={birthDetails.timeOfBirth.minute}
            onValueChange={(value) => updateBirthDetails({
              timeOfBirth: { ...birthDetails.timeOfBirth, minute: value }
            })}
          >
            <SelectTrigger className={errors.timeOfBirth ? 'border-destructive' : ''}>
              <SelectValue placeholder="Min" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map(minute => (
                <SelectItem key={minute} value={minute}>{minute}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={birthDetails.timeOfBirth.period}
            onValueChange={(value) => updateBirthDetails({
              timeOfBirth: { ...birthDetails.timeOfBirth, period: value }
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {errors.timeOfBirth && <p className="text-xs text-destructive">{errors.timeOfBirth}</p>}
      </div>

      {/* Place of Birth */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Place of Birth <span className="text-destructive">*</span>
        </Label>
        <LocationAutocomplete
          value={birthDetails.placeOfBirth}
          onChange={handleLocationSelect}
          placeholder="Start typing your birth city..."
          showTimezone={true}
        />
        {errors.placeOfBirth && <p className="text-xs text-destructive">{errors.placeOfBirth}</p>}
      </div>

      {/* Timezone */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Timezone <span className="text-destructive">*</span>
        </Label>
        <Input
          value={birthDetails.birthTimezone}
          onChange={(e) => updateBirthDetails({ birthTimezone: e.target.value })}
          placeholder="Auto-detected from birth place"
          className={errors.birthTimezone ? 'border-destructive' : ''}
        />
        <p className="text-xs text-muted-foreground">Auto-detected from birth place. Change only if incorrect.</p>
        {errors.birthTimezone && <p className="text-xs text-destructive">{errors.birthTimezone}</p>}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <Button onClick={handleNext} className="gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Step1BirthDetails;
