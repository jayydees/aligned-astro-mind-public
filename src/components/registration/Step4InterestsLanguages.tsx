import React, { useState, useMemo } from 'react';
import { useRegistration } from '@/contexts/RegistrationContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { INTERESTS, LANGUAGES } from '@/data/interests';
import { ArrowLeft, ArrowRight, X, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Step4InterestsLanguages: React.FC = () => {
  const { data, updateInterestsLanguages, setCurrentStep } = useRegistration();
  const { interestsLanguages } = data;
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [languageSearch, setLanguageSearch] = useState('');
  const [interestSearch, setInterestSearch] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const filteredLanguages = useMemo(() => {
    return LANGUAGES.filter(
      lang => lang.toLowerCase().includes(languageSearch.toLowerCase()) &&
              !interestsLanguages.languages.includes(lang)
    );
  }, [languageSearch, interestsLanguages.languages]);

  const filteredInterests = useMemo(() => {
    return INTERESTS.filter(
      interest => interest.toLowerCase().includes(interestSearch.toLowerCase())
    );
  }, [interestSearch]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (interestsLanguages.languages.length < 1) {
      newErrors.languages = 'Please select at least 1 language';
    } else if (interestsLanguages.languages.length > 10) {
      newErrors.languages = 'Maximum 10 languages allowed';
    }
    
    if (interestsLanguages.interests.length < 5) {
      newErrors.interests = 'Please select at least 5 interests';
    } else if (interestsLanguages.interests.length > 15) {
      newErrors.interests = 'Maximum 15 interests allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setCurrentStep(5);
    } else {
      toast({
        title: "Please complete required selections",
        variant: "destructive",
      });
    }
  };

  const addLanguage = (language: string) => {
    if (interestsLanguages.languages.length < 10 && !interestsLanguages.languages.includes(language)) {
      updateInterestsLanguages({
        languages: [...interestsLanguages.languages, language]
      });
    }
    setLanguageSearch('');
    setShowLanguageDropdown(false);
  };

  const removeLanguage = (language: string) => {
    updateInterestsLanguages({
      languages: interestsLanguages.languages.filter(l => l !== language)
    });
  };

  const toggleInterest = (interest: string) => {
    if (interestsLanguages.interests.includes(interest)) {
      updateInterestsLanguages({
        interests: interestsLanguages.interests.filter(i => i !== interest)
      });
    } else if (interestsLanguages.interests.length < 15) {
      updateInterestsLanguages({
        interests: [...interestsLanguages.interests, interest]
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-secondary">Interests & Languages</h2>
        <p className="text-muted-foreground">What makes you unique?</p>
      </div>

      {/* Languages */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Languages You Speak <span className="text-destructive">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">Select 1-10 languages</p>
        
        {/* Selected Languages */}
        <div className="flex flex-wrap gap-2 min-h-[32px]">
          {interestsLanguages.languages.map((lang) => (
            <Badge key={lang} variant="secondary" className="gap-1 px-3 py-1">
              {lang}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => removeLanguage(lang)}
              />
            </Badge>
          ))}
        </div>

        {/* Language Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={languageSearch}
            onChange={(e) => setLanguageSearch(e.target.value)}
            onFocus={() => setShowLanguageDropdown(true)}
            placeholder="Search languages..."
            className="pl-10"
          />
          {showLanguageDropdown && filteredLanguages.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filteredLanguages.slice(0, 8).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => addLanguage(lang)}
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm"
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors.languages && <p className="text-xs text-destructive">{errors.languages}</p>}
      </div>

      {/* Interests */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          Pick Your Interests <span className="text-destructive">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">
          {interestsLanguages.interests.length} selected (minimum 5, maximum 15)
        </p>

        {/* Interest Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={interestSearch}
            onChange={(e) => setInterestSearch(e.target.value)}
            placeholder="Search interests..."
            className="pl-10"
          />
        </div>

        {/* Interest Grid */}
        <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto p-2 border border-border rounded-lg">
          {filteredInterests.map((interest) => {
            const isSelected = interestsLanguages.interests.includes(interest);
            return (
              <Badge
                key={interest}
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </Badge>
            );
          })}
        </div>
        {errors.interests && <p className="text-xs text-destructive">{errors.interests}</p>}
      </div>

      {/* Primary Interest Description */}
      <div className="space-y-2">
        <Label>Describe Your Primary Interest (Optional)</Label>
        <Textarea
          value={interestsLanguages.primaryInterestDescription}
          onChange={(e) => updateInterestsLanguages({ primaryInterestDescription: e.target.value })}
          placeholder="Tell us more about your favorite interest..."
          maxLength={300}
          rows={3}
        />
        <p className="text-xs text-muted-foreground text-right">
          {interestsLanguages.primaryInterestDescription.length}/300 characters
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={() => setCurrentStep(3)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} className="gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Step4InterestsLanguages;
