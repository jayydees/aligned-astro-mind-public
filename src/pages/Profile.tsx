import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RegistrationProvider, useRegistration } from '@/contexts/RegistrationContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import ProgressIndicator from '@/components/registration/ProgressIndicator';
import Step1BirthDetails from '@/components/registration/Step1BirthDetails';
import Step2PersonalIdentity from '@/components/registration/Step2PersonalIdentity';
import Step3RelationshipLocation from '@/components/registration/Step3RelationshipLocation';
import Step4InterestsLanguages from '@/components/registration/Step4InterestsLanguages';
import Step5AboutYou from '@/components/registration/Step5AboutYou';
import Step6ContactAccount from '@/components/registration/Step6ContactAccount';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const TOTAL_STEPS = 6;

const RegistrationForm: React.FC = () => {
  const { currentStep, setCurrentStep, isEditMode, setIsEditMode, loadProfileData } = useRegistration();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkExistingProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profile) {
        setIsEditMode(true);
        loadProfileData(profile);
      }
      setLoading(false);
    };

    checkExistingProfile();
  }, [user, setIsEditMode, loadProfileData]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BirthDetails />;
      case 2:
        return <Step2PersonalIdentity />;
      case 3:
        return <Step3RelationshipLocation />;
      case 4:
        return <Step4InterestsLanguages />;
      case 5:
        return <Step5AboutYou />;
      case 6:
        return <Step6ContactAccount />;
      default:
        return <Step1BirthDetails />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-lg mx-auto px-4 py-8">
        {/* Back Button */}
        {isEditMode && (
          <div className="mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        )}

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Aligned</h1>
          <p className="text-muted-foreground">
            {isEditMode ? 'Edit your profile' : 'Create your profile'}
          </p>
        </div>
        
        <ProgressIndicator 
          currentStep={currentStep} 
          totalSteps={TOTAL_STEPS} 
          onStepClick={setCurrentStep}
        />
        
        <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  return (
    <RegistrationProvider>
      <RegistrationForm />
    </RegistrationProvider>
  );
};

export default Profile;
