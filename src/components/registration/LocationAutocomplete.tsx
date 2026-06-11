import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { MapPin, Loader2 } from 'lucide-react';

interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    state?: string;
    country?: string;
  };
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (location: string, lat: number, lng: number, timezone: string) => void;
  placeholder?: string;
  showTimezone?: boolean;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Start typing a city...",
  showTimezone = false,
}) => {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [detectedTimezone, setDetectedTimezone] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchLocations = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1&limit=5`,
        {
          headers: {
            'User-Agent': 'Aligned Dating App',
          },
        }
      );
      const data = await response.json();
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Location search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchLocations(newQuery);
    }, 300);
  };

  const getTimezoneFromCoords = (lat: number, lon: number): string => {
    // Simplified timezone detection based on longitude
    // In production, use a proper timezone API
    const offset = Math.round(lon / 15);
    const sign = offset >= 0 ? '+' : '';
    
    // Common timezone mappings for India
    if (lon >= 68 && lon <= 97 && lat >= 8 && lat <= 37) {
      return 'Asia/Kolkata';
    }
    
    return `Etc/GMT${sign}${-offset}`;
  };

  const formatDisplayName = (result: LocationResult): string => {
    const parts = result.display_name.split(', ');
    if (parts.length >= 3) {
      return `${parts[0]}, ${parts[parts.length - 2]}, ${parts[parts.length - 1]}`;
    }
    return result.display_name;
  };

  const handleSelect = (result: LocationResult) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const timezone = getTimezoneFromCoords(lat, lon);
    const displayName = formatDisplayName(result);
    
    setQuery(displayName);
    setDetectedTimezone(timezone);
    setShowResults(false);
    onChange(displayName, lat, lon, timezone);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={handleInputChange}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder={placeholder}
          className="pl-10"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>
      
      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(result)}
              className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-start gap-2"
            >
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
              <span className="text-sm">{formatDisplayName(result)}</span>
            </button>
          ))}
        </div>
      )}

      {showTimezone && detectedTimezone && (
        <p className="text-xs text-muted-foreground mt-1">
          Detected timezone: {detectedTimezone}
        </p>
      )}
    </div>
  );
};

export default LocationAutocomplete;
