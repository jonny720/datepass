/**
 * Country dialing codes dataset for WhatsApp number input
 * Sorted alphabetically by country name
 */

export type CountryDialingOption = {
  iso2: string;
  name: string;
  flag: string;
  dialCode: string;
};

export const COUNTRY_DIALING_CODES: CountryDialingOption[] = [
  { iso2: 'AF', name: 'Afghanistan', flag: '🇦🇫', dialCode: '93' },
  { iso2: 'AL', name: 'Albania', flag: '🇦🇱', dialCode: '355' },
  { iso2: 'DZ', name: 'Algeria', flag: '🇩🇿', dialCode: '213' },
  { iso2: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '54' },
  { iso2: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '61' },
  { iso2: 'AT', name: 'Austria', flag: '🇦🇹', dialCode: '43' },
  { iso2: 'BH', name: 'Bahrain', flag: '🇧🇭', dialCode: '973' },
  { iso2: 'BD', name: 'Bangladesh', flag: '🇧🇩', dialCode: '880' },
  { iso2: 'BY', name: 'Belarus', flag: '🇧🇾', dialCode: '375' },
  { iso2: 'BE', name: 'Belgium', flag: '🇧🇪', dialCode: '32' },
  { iso2: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '55' },
  { iso2: 'BG', name: 'Bulgaria', flag: '🇧🇬', dialCode: '359' },
  { iso2: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '1' },
  { iso2: 'CL', name: 'Chile', flag: '🇨🇱', dialCode: '56' },
  { iso2: 'CN', name: 'China', flag: '🇨🇳', dialCode: '86' },
  { iso2: 'CO', name: 'Colombia', flag: '🇨🇴', dialCode: '57' },
  { iso2: 'CR', name: 'Costa Rica', flag: '🇨🇷', dialCode: '506' },
  { iso2: 'HR', name: 'Croatia', flag: '🇭🇷', dialCode: '385' },
  { iso2: 'CY', name: 'Cyprus', flag: '🇨🇾', dialCode: '357' },
  { iso2: 'CZ', name: 'Czech Republic', flag: '🇨🇿', dialCode: '420' },
  { iso2: 'DK', name: 'Denmark', flag: '🇩🇰', dialCode: '45' },
  { iso2: 'EG', name: 'Egypt', flag: '🇪🇬', dialCode: '20' },
  { iso2: 'EE', name: 'Estonia', flag: '🇪🇪', dialCode: '372' },
  { iso2: 'FI', name: 'Finland', flag: '🇫🇮', dialCode: '358' },
  { iso2: 'FR', name: 'France', flag: '🇫🇷', dialCode: '33' },
  { iso2: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '49' },
  { iso2: 'GR', name: 'Greece', flag: '🇬🇷', dialCode: '30' },
  { iso2: 'HK', name: 'Hong Kong', flag: '🇭🇰', dialCode: '852' },
  { iso2: 'HU', name: 'Hungary', flag: '🇭🇺', dialCode: '36' },
  { iso2: 'IS', name: 'Iceland', flag: '🇮🇸', dialCode: '354' },
  { iso2: 'IN', name: 'India', flag: '🇮🇳', dialCode: '91' },
  { iso2: 'ID', name: 'Indonesia', flag: '🇮🇩', dialCode: '62' },
  { iso2: 'IR', name: 'Iran', flag: '🇮🇷', dialCode: '98' },
  { iso2: 'IQ', name: 'Iraq', flag: '🇮🇶', dialCode: '964' },
  { iso2: 'IE', name: 'Ireland', flag: '🇮🇪', dialCode: '353' },
  { iso2: 'IL', name: 'Israel', flag: '🇮🇱', dialCode: '972' },
  { iso2: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '39' },
  { iso2: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '81' },
  { iso2: 'JO', name: 'Jordan', flag: '🇯🇴', dialCode: '962' },
  { iso2: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', dialCode: '7' },
  { iso2: 'KE', name: 'Kenya', flag: '🇰🇪', dialCode: '254' },
  { iso2: 'KW', name: 'Kuwait', flag: '🇰🇼', dialCode: '965' },
  { iso2: 'LV', name: 'Latvia', flag: '🇱🇻', dialCode: '371' },
  { iso2: 'LB', name: 'Lebanon', flag: '🇱🇧', dialCode: '961' },
  { iso2: 'LT', name: 'Lithuania', flag: '🇱🇹', dialCode: '370' },
  { iso2: 'LU', name: 'Luxembourg', flag: '🇱🇺', dialCode: '352' },
  { iso2: 'MY', name: 'Malaysia', flag: '🇲🇾', dialCode: '60' },
  { iso2: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '52' },
  { iso2: 'MA', name: 'Morocco', flag: '🇲🇦', dialCode: '212' },
  { iso2: 'NL', name: 'Netherlands', flag: '🇳🇱', dialCode: '31' },
  { iso2: 'NZ', name: 'New Zealand', flag: '🇳🇿', dialCode: '64' },
  { iso2: 'NG', name: 'Nigeria', flag: '🇳🇬', dialCode: '234' },
  { iso2: 'NO', name: 'Norway', flag: '🇳🇴', dialCode: '47' },
  { iso2: 'OM', name: 'Oman', flag: '🇴🇲', dialCode: '968' },
  { iso2: 'PK', name: 'Pakistan', flag: '🇵🇰', dialCode: '92' },
  { iso2: 'PS', name: 'Palestine', flag: '🇵🇸', dialCode: '970' },
  { iso2: 'PE', name: 'Peru', flag: '🇵🇪', dialCode: '51' },
  { iso2: 'PH', name: 'Philippines', flag: '🇵🇭', dialCode: '63' },
  { iso2: 'PL', name: 'Poland', flag: '🇵🇱', dialCode: '48' },
  { iso2: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '351' },
  { iso2: 'QA', name: 'Qatar', flag: '🇶🇦', dialCode: '974' },
  { iso2: 'RO', name: 'Romania', flag: '🇷🇴', dialCode: '40' },
  { iso2: 'RU', name: 'Russia', flag: '🇷🇺', dialCode: '7' },
  { iso2: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', dialCode: '966' },
  { iso2: 'RS', name: 'Serbia', flag: '🇷🇸', dialCode: '381' },
  { iso2: 'SG', name: 'Singapore', flag: '🇸🇬', dialCode: '65' },
  { iso2: 'SK', name: 'Slovakia', flag: '🇸🇰', dialCode: '421' },
  { iso2: 'SI', name: 'Slovenia', flag: '🇸🇮', dialCode: '386' },
  { iso2: 'ZA', name: 'South Africa', flag: '🇿🇦', dialCode: '27' },
  { iso2: 'KR', name: 'South Korea', flag: '🇰🇷', dialCode: '82' },
  { iso2: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '34' },
  { iso2: 'LK', name: 'Sri Lanka', flag: '🇱🇰', dialCode: '94' },
  { iso2: 'SE', name: 'Sweden', flag: '🇸🇪', dialCode: '46' },
  { iso2: 'CH', name: 'Switzerland', flag: '🇨🇭', dialCode: '41' },
  { iso2: 'TW', name: 'Taiwan', flag: '🇹🇼', dialCode: '886' },
  { iso2: 'TH', name: 'Thailand', flag: '🇹🇭', dialCode: '66' },
  { iso2: 'TR', name: 'Turkey', flag: '🇹🇷', dialCode: '90' },
  { iso2: 'UA', name: 'Ukraine', flag: '🇺🇦', dialCode: '380' },
  { iso2: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', dialCode: '971' },
  { iso2: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '44' },
  { iso2: 'US', name: 'United States', flag: '🇺🇸', dialCode: '1' },
  { iso2: 'UY', name: 'Uruguay', flag: '🇺🇾', dialCode: '598' },
  { iso2: 'VE', name: 'Venezuela', flag: '🇻🇪', dialCode: '58' },
  { iso2: 'VN', name: 'Vietnam', flag: '🇻🇳', dialCode: '84' },
];

export const DEFAULT_COUNTRY_ISO2 = 'IL';

export function findCountryByIso2(iso2: string): CountryDialingOption | undefined {
  return COUNTRY_DIALING_CODES.find((c) => c.iso2 === iso2);
}

export function getDefaultCountry(): CountryDialingOption {
  return findCountryByIso2(DEFAULT_COUNTRY_ISO2) || COUNTRY_DIALING_CODES[0];
}
