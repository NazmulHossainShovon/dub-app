import React from 'react';
import {
  POPULAR_LANGUAGES,
  getVoiceId,
  isGenderSupportedForLanguage,
} from '@/lib/voice-mapping';

interface LanguageVoiceSelectionProps {
  selectedLanguage: string;
  selectedGender: 'male' | 'female';
  isUploading: boolean;
  isPending: boolean;
  handleLanguageChange: (languageCode: string) => void;
  setSelectedGender: (gender: 'male' | 'female') => void;
}

const LanguageVoiceSelection: React.FC<LanguageVoiceSelectionProps> = ({
  selectedLanguage,
  selectedGender,
  isUploading,
  isPending,
  handleLanguageChange,
  setSelectedGender,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Language
        </label>
        <select
          value={selectedLanguage}
          onChange={e => handleLanguageChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isUploading || isPending}
        >
          {POPULAR_LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Output Voice Type
        </label>
        <div className="flex space-x-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={selectedGender === 'female'}
              onChange={e =>
                setSelectedGender(e.target.value as 'male' | 'female')
              }
              disabled={
                !isGenderSupportedForLanguage(selectedLanguage, 'female') ||
                isUploading ||
                isPending
              }
              className="mr-2"
            />
            <span
              className={
                !isGenderSupportedForLanguage(selectedLanguage, 'female')
                  ? 'text-gray-400'
                  : ''
              }
            >
              Female
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={selectedGender === 'male'}
              onChange={e =>
                setSelectedGender(e.target.value as 'male' | 'female')
              }
              disabled={
                !isGenderSupportedForLanguage(selectedLanguage, 'male') ||
                isUploading ||
                isPending
              }
              className="mr-2"
            />
            <span
              className={
                !isGenderSupportedForLanguage(selectedLanguage, 'male')
                  ? 'text-gray-400'
                  : ''
              }
            >
              Male
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LanguageVoiceSelection;
