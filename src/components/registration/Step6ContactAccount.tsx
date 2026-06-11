import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '@/contexts/RegistrationContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRY_CODES } from '@/data/interests';
import { Eye, EyeOff, Loader2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Step6ContactAccount: React.FC = () => {
  const { data, updateContactAccount, clearData, isEditMode } = useRegistration();
  const { user } = useAuth();
  const { contactAccount } = data;
  const { toast } = useToast();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = [
    { test: (p: string) => p.length >= 8, label: 'Minimum 8 characters' },
    { test: (p: string) => /[A-Z]/.test(p), label: 'At least 1 uppercase letter' },
    { test: (p: string) => /[0-9]/.test(p), label: 'At least 1 number' },
    { test: (p: string) => /[@#$%^&*!]/.test(p), label: 'At least 1 special character (@, #, $, etc.)' },
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!contactAccount.whatsappNumber) {
      newErrors.whatsappNumber = 'WhatsApp number is required';
    } else if (!phoneRegex.test(contactAccount.whatsappNumber)) {
      newErrors.whatsappNumber = 'Please enter a valid 10-digit number';
    }
    
    if (contactAccount.whatsappNumber !== contactAccount.whatsappNumberConfirm) {
      newErrors.whatsappNumberConfirm = "Numbers don't match!";
    }
    
    // Only validate email/password in registration mode
    if (!isEditMode) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!contactAccount.email) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(contactAccount.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      if (!contactAccount.password) {
        newErrors.password = 'Password is required';
      } else {
        const failedRequirements = passwordRequirements.filter(req => !req.test(contactAccount.password));
        if (failedRequirements.length > 0) {
          newErrors.password = 'Password does not meet all requirements';
        }
      }
      
      if (contactAccount.password !== contactAccount.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
      
      if (!contactAccount.agreedToTerms) {
        newErrors.agreedToTerms = 'You must agree to the terms';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate() || !user) return;

    setIsLoading(true);
    try {
      const { birthDetails, personalIdentity, relationshipLocation, interestsLanguages, aboutYou } = data;
      const birthDate = `${birthDetails.dateOfBirth.year}-${birthDetails.dateOfBirth.month}-${birthDetails.dateOfBirth.day}`;
      const hour24 = birthDetails.timeOfBirth.period === 'PM' && birthDetails.timeOfBirth.hour !== '12'
        ? String(parseInt(birthDetails.timeOfBirth.hour) + 12)
        : birthDetails.timeOfBirth.period === 'AM' && birthDetails.timeOfBirth.hour === '12'
          ? '00'
          : birthDetails.timeOfBirth.hour;
      const birthTime = `${hour24}:${birthDetails.timeOfBirth.minute}:00`;

      const { error } = await supabase.from('profiles').update({
        date_of_birth: birthDate,
        time_of_birth: birthTime,
        place_of_birth: birthDetails.placeOfBirth,
        birth_latitude: birthDetails.birthLatitude,
        birth_longitude: birthDetails.birthLongitude,
        birth_timezone: birthDetails.birthTimezone,
        first_name: personalIdentity.firstName,
        last_name: personalIdentity.lastName,
        profile_name: personalIdentity.profileName,
        gender: personalIdentity.gender,
        relationship_status: relationshipLocation.relationshipStatus,
        current_location: relationshipLocation.currentLocation,
        current_latitude: relationshipLocation.currentLatitude,
        current_longitude: relationshipLocation.currentLongitude,
        communication_preference: relationshipLocation.communicationPreference,
        languages: interestsLanguages.languages,
        interests: interestsLanguages.interests,
        primary_interest_description: interestsLanguages.primaryInterestDescription || null,
        profession: aboutYou.profession,
        life_journey: aboutYou.lifeJourney,
        values: aboutYou.values,
        whatsapp_country_code: contactAccount.whatsappCountryCode,
        whatsapp_number: contactAccount.whatsappNumber,
      }).eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Profile updated! 🎉",
        description: "Your changes have been saved.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast({
        title: "Please fix the errors",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: contactAccount.email,
        password: contactAccount.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Parse birth date and time
        const { birthDetails, personalIdentity, relationshipLocation, interestsLanguages, aboutYou } = data;
        const birthDate = `${birthDetails.dateOfBirth.year}-${birthDetails.dateOfBirth.month}-${birthDetails.dateOfBirth.day}`;
        const hour24 = birthDetails.timeOfBirth.period === 'PM' && birthDetails.timeOfBirth.hour !== '12'
          ? String(parseInt(birthDetails.timeOfBirth.hour) + 12)
          : birthDetails.timeOfBirth.period === 'AM' && birthDetails.timeOfBirth.hour === '12'
            ? '00'
            : birthDetails.timeOfBirth.hour;
        const birthTime = `${hour24}:${birthDetails.timeOfBirth.minute}:00`;

        // Insert profile
        const { error: profileError } = await supabase.from('profiles').insert({
          user_id: authData.user.id,
          date_of_birth: birthDate,
          time_of_birth: birthTime,
          place_of_birth: birthDetails.placeOfBirth,
          birth_latitude: birthDetails.birthLatitude,
          birth_longitude: birthDetails.birthLongitude,
          birth_timezone: birthDetails.birthTimezone,
          first_name: personalIdentity.firstName,
          last_name: personalIdentity.lastName,
          profile_name: personalIdentity.profileName,
          gender: personalIdentity.gender,
          relationship_status: relationshipLocation.relationshipStatus,
          current_location: relationshipLocation.currentLocation,
          current_latitude: relationshipLocation.currentLatitude,
          current_longitude: relationshipLocation.currentLongitude,
          communication_preference: relationshipLocation.communicationPreference,
          languages: interestsLanguages.languages,
          interests: interestsLanguages.interests,
          primary_interest_description: interestsLanguages.primaryInterestDescription || null,
          profession: aboutYou.profession,
          life_journey: aboutYou.lifeJourney,
          values: aboutYou.values,
          whatsapp_country_code: contactAccount.whatsappCountryCode,
          whatsapp_number: contactAccount.whatsappNumber,
        });

        if (profileError) throw profileError;

        // Clear stored data
        clearData();

        toast({
          title: "Account created successfully! 🎉",
          description: "Welcome to Aligned! Your kundali is being prepared...",
        });

        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-secondary">
          {isEditMode ? 'Contact Information' : 'Contact & Account'}
        </h2>
        <p className="text-muted-foreground">
          {isEditMode ? 'Update your contact details' : 'Final step to create your account'}
        </p>
      </div>

      {/* WhatsApp Number */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          WhatsApp Number <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-2">
          <Select
            value={contactAccount.whatsappCountryCode}
            onValueChange={(value) => updateContactAccount({ whatsappCountryCode: value })}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_CODES.map((cc) => (
                <SelectItem key={cc.code} value={cc.code}>
                  {cc.code} {cc.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="tel"
            value={contactAccount.whatsappNumber}
            onChange={(e) => updateContactAccount({ whatsappNumber: e.target.value.replace(/\D/g, '') })}
            placeholder="9876543210"
            maxLength={10}
            className={`flex-1 ${errors.whatsappNumber ? 'border-destructive' : ''}`}
          />
        </div>
        <p className="text-xs text-muted-foreground">Used for important notifications only</p>
        {errors.whatsappNumber && <p className="text-xs text-destructive">{errors.whatsappNumber}</p>}
      </div>

      {/* Confirm WhatsApp Number */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Retype WhatsApp Number <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-2">
          <div className="w-32 px-3 py-2 bg-muted rounded-md text-sm">
            {contactAccount.whatsappCountryCode}
          </div>
          <Input
            type="tel"
            value={contactAccount.whatsappNumberConfirm}
            onChange={(e) => updateContactAccount({ whatsappNumberConfirm: e.target.value.replace(/\D/g, '') })}
            placeholder="9876543210"
            maxLength={10}
            className={`flex-1 ${errors.whatsappNumberConfirm ? 'border-destructive' : ''}`}
          />
        </div>
        {errors.whatsappNumberConfirm && <p className="text-xs text-destructive">{errors.whatsappNumberConfirm}</p>}
      </div>

      {/* Only show account fields in registration mode */}
      {!isEditMode && (
        <>
          <hr className="border-border" />

          {/* Email */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              type="email"
              value={contactAccount.email}
              onChange={(e) => updateContactAccount({ email: e.target.value })}
              placeholder="you@example.com"
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={contactAccount.password}
                onChange={(e) => updateContactAccount({ password: e.target.value })}
                placeholder="••••••••"
                className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="space-y-1">
              {passwordRequirements.map((req, i) => {
                const passed = req.test(contactAccount.password);
                return (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    {passed ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span className={passed ? 'text-green-500' : 'text-muted-foreground'}>{req.label}</span>
                  </div>
                );
              })}
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Confirm Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                value={contactAccount.confirmPassword}
                onChange={(e) => updateContactAccount({ confirmPassword: e.target.value })}
                placeholder="••••••••"
                className={errors.confirmPassword ? 'border-destructive pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
          </div>

          {/* Terms */}
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={contactAccount.agreedToTerms}
                onCheckedChange={(checked) => updateContactAccount({ agreedToTerms: checked === true })}
              />
              <Label htmlFor="terms" className="text-sm font-normal leading-tight cursor-pointer">
                I agree to the{' '}
                <a href="/terms" target="_blank" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" target="_blank" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>
            {errors.agreedToTerms && <p className="text-xs text-destructive">{errors.agreedToTerms}</p>}
          </div>
        </>
      )}

      <Button
        onClick={isEditMode ? handleUpdate : handleSubmit}
        disabled={isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {isEditMode ? 'Saving Changes...' : 'Creating Account...'}
          </>
        ) : (
          isEditMode ? 'Save Changes' : 'Create Account & Get Started'
        )}
      </Button>
    </div>
  );
};

export default Step6ContactAccount;
