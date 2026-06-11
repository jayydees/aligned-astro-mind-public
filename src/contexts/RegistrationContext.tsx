import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BirthDetails {
  dateOfBirth: { day: string; month: string; year: string };
  timeOfBirth: { hour: string; minute: string; period: string };
  placeOfBirth: string;
  birthLatitude: number | null;
  birthLongitude: number | null;
  birthTimezone: string;
}

export interface PersonalIdentity {
  firstName: string;
  lastName: string;
  profileName: string;
  gender: string;
}

export interface RelationshipLocation {
  relationshipStatus: string;
  currentLocation: string;
  currentLatitude: number | null;
  currentLongitude: number | null;
  communicationPreference: string;
}

export interface InterestsLanguages {
  languages: string[];
  interests: string[];
  primaryInterestDescription: string;
}

export interface AboutYou {
  profession: string;
  lifeJourney: string;
  values: string;
}

export interface ContactAccount {
  whatsappCountryCode: string;
  whatsappNumber: string;
  whatsappNumberConfirm: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

export interface RegistrationData {
  birthDetails: BirthDetails;
  personalIdentity: PersonalIdentity;
  relationshipLocation: RelationshipLocation;
  interestsLanguages: InterestsLanguages;
  aboutYou: AboutYou;
  contactAccount: ContactAccount;
}

const initialData: RegistrationData = {
  birthDetails: {
    dateOfBirth: { day: '', month: '', year: '' },
    timeOfBirth: { hour: '', minute: '', period: 'AM' },
    placeOfBirth: '',
    birthLatitude: null,
    birthLongitude: null,
    birthTimezone: '',
  },
  personalIdentity: {
    firstName: '',
    lastName: '',
    profileName: '',
    gender: '',
  },
  relationshipLocation: {
    relationshipStatus: '',
    currentLocation: '',
    currentLatitude: null,
    currentLongitude: null,
    communicationPreference: '',
  },
  interestsLanguages: {
    languages: [],
    interests: [],
    primaryInterestDescription: '',
  },
  aboutYou: {
    profession: '',
    lifeJourney: '',
    values: '',
  },
  contactAccount: {
    whatsappCountryCode: '+91',
    whatsappNumber: '',
    whatsappNumberConfirm: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  },
};

interface RegistrationContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  data: RegistrationData;
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  updateBirthDetails: (details: Partial<BirthDetails>) => void;
  updatePersonalIdentity: (identity: Partial<PersonalIdentity>) => void;
  updateRelationshipLocation: (location: Partial<RelationshipLocation>) => void;
  updateInterestsLanguages: (interests: Partial<InterestsLanguages>) => void;
  updateAboutYou: (about: Partial<AboutYou>) => void;
  updateContactAccount: (contact: Partial<ContactAccount>) => void;
  loadProfileData: (profile: any) => void;
  clearData: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

const STORAGE_KEY = 'aligned_registration_data';

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState<RegistrationData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialData;
      }
    }
    return initialData;
  });

  useEffect(() => {
    if (!isEditMode) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isEditMode]);

  const loadProfileData = (profile: any) => {
    if (!profile) return;
    
    // Parse date of birth
    const dob = new Date(profile.date_of_birth);
    const dobDay = dob.getDate().toString().padStart(2, '0');
    const dobMonth = (dob.getMonth() + 1).toString().padStart(2, '0');
    const dobYear = dob.getFullYear().toString();
    
    // Parse time of birth
    const [hours, minutes] = profile.time_of_birth.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const period = hour24 >= 12 ? 'PM' : 'AM';
    
    setData({
      birthDetails: {
        dateOfBirth: { day: dobDay, month: dobMonth, year: dobYear },
        timeOfBirth: { 
          hour: hour12.toString().padStart(2, '0'), 
          minute: minutes, 
          period 
        },
        placeOfBirth: profile.place_of_birth,
        birthLatitude: profile.birth_latitude,
        birthLongitude: profile.birth_longitude,
        birthTimezone: profile.birth_timezone,
      },
      personalIdentity: {
        firstName: profile.first_name,
        lastName: profile.last_name,
        profileName: profile.profile_name,
        gender: profile.gender,
      },
      relationshipLocation: {
        relationshipStatus: profile.relationship_status,
        currentLocation: profile.current_location,
        currentLatitude: profile.current_latitude,
        currentLongitude: profile.current_longitude,
        communicationPreference: profile.communication_preference,
      },
      interestsLanguages: {
        languages: profile.languages || [],
        interests: profile.interests || [],
        primaryInterestDescription: profile.primary_interest_description || '',
      },
      aboutYou: {
        profession: profile.profession,
        lifeJourney: profile.life_journey,
        values: profile.values,
      },
      contactAccount: {
        whatsappCountryCode: profile.whatsapp_country_code,
        whatsappNumber: profile.whatsapp_number,
        whatsappNumberConfirm: profile.whatsapp_number,
        email: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: true,
      },
    });
  };

  const updateBirthDetails = (details: Partial<BirthDetails>) => {
    setData(prev => ({
      ...prev,
      birthDetails: { ...prev.birthDetails, ...details },
    }));
  };

  const updatePersonalIdentity = (identity: Partial<PersonalIdentity>) => {
    setData(prev => ({
      ...prev,
      personalIdentity: { ...prev.personalIdentity, ...identity },
    }));
  };

  const updateRelationshipLocation = (location: Partial<RelationshipLocation>) => {
    setData(prev => ({
      ...prev,
      relationshipLocation: { ...prev.relationshipLocation, ...location },
    }));
  };

  const updateInterestsLanguages = (interests: Partial<InterestsLanguages>) => {
    setData(prev => ({
      ...prev,
      interestsLanguages: { ...prev.interestsLanguages, ...interests },
    }));
  };

  const updateAboutYou = (about: Partial<AboutYou>) => {
    setData(prev => ({
      ...prev,
      aboutYou: { ...prev.aboutYou, ...about },
    }));
  };

  const updateContactAccount = (contact: Partial<ContactAccount>) => {
    setData(prev => ({
      ...prev,
      contactAccount: { ...prev.contactAccount, ...contact },
    }));
  };

  const clearData = () => {
    setData(initialData);
    setCurrentStep(1);
    setIsEditMode(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <RegistrationContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        data,
        isEditMode,
        setIsEditMode,
        updateBirthDetails,
        updatePersonalIdentity,
        updateRelationshipLocation,
        updateInterestsLanguages,
        updateAboutYou,
        updateContactAccount,
        loadProfileData,
        clearData,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within RegistrationProvider');
  }
  return context;
};
