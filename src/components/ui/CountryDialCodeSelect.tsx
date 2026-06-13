import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import {
  COUNTRY_DIALING_CODES,
  type CountryDialingOption,
  findCountryByIso2,
  getDefaultCountry,
} from '@/data/countryDialingCodes';

export interface CountryDialCodeSelectProps {
  value: string;
  onChange: (iso2: string) => void;
  label?: string;
}

export function CountryDialCodeSelect({ value, onChange, label }: CountryDialCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = findCountryByIso2(value) || getDefaultCountry();

  // Filter countries based on search
  const filteredCountries = COUNTRY_DIALING_CODES.filter((country) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      country.name.toLowerCase().includes(query) ||
      country.iso2.toLowerCase().includes(query) ||
      country.dialCode.includes(query)
    );
  });

  // Handle click outside to close dropdown
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (country: CountryDialingOption) => {
    onChange(country.iso2);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSearchQuery('');
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="mb-2 block text-sm font-semibold text-stone-700">{label}</label>
      )}

      {/* Selected country display */}
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-left text-base transition-all duration-200 hover:border-stone-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
      >
        <span className="flex items-center gap-2">
          <span className="text-2xl leading-none">{selectedCountry.flag}</span>
          <span className="font-medium text-stone-900">{selectedCountry.name}</span>
          <span className="text-stone-500">+{selectedCountry.dialCode}</span>
        </span>
        <ChevronDown
          className={`h-5 w-5 text-stone-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border-2 border-stone-300 bg-white shadow-lg">
          {/* Search input */}
          <div className="border-b border-stone-200 p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country, code..."
                className="w-full rounded-lg border border-stone-300 py-2 pl-9 pr-3 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>
          </div>

          {/* Country list */}
          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.iso2}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-stone-50 ${
                    country.iso2 === selectedCountry.iso2 ? 'bg-pink-50' : ''
                  }`}
                >
                  <span className="text-2xl leading-none">{country.flag}</span>
                  <span className="flex-1 font-medium text-stone-900">{country.name}</span>
                  <span className="text-sm text-stone-500">+{country.dialCode}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm text-stone-500">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
