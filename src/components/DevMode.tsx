import { useState } from 'react';
import type { InviteConfig, RecipientResponse } from '@/types';

// Import all recipient screens
import { ArrivalScreen } from './recipient/screens/ArrivalScreen';
import { IntroCardsScreen } from './recipient/screens/IntroCardsScreen';
import { MainQuestionScreen } from './recipient/screens/MainQuestionScreen';
import { ArrivalPreferenceScreen } from './recipient/screens/ArrivalPreferenceScreen';
import { ActivityChoiceScreen } from './recipient/screens/ActivityChoiceScreen';
import { SlotChoiceScreen } from './recipient/screens/SlotChoiceScreen';
import { ConfirmationScreen } from './recipient/screens/ConfirmationScreen';
import { DeclineScreen } from './recipient/screens/DeclineScreen';

// Mock configuration
const mockConfigCruise: InviteConfig = {
  version: 1,
  inviteType: 'date',
  language: 'en',
  senderName: 'Alex',
  recipientName: 'Jordan',
  recipientGender: 'private',
  theme: 'cruise',
  introTone: 'light',
  introCards: [
    { id: '1', promptKey: 'First thing you should know', answer: 'I make the best pancakes' },
    { id: '2', promptKey: 'My ideal weekend includes', answer: 'Coffee, books, and good company' },
    { id: '3', promptKey: 'Fun fact about me', answer: 'I can solve a Rubiks cube in under 2 minutes' },
  ],
  activityIds: ['coffee', 'sunset-walk'],
  dateSlots: [
    { id: '1', date: '2026-06-20', time: '18:00' },
    { id: '2', date: '2026-06-21', time: '19:00' },
  ],
  whatsappNumber: '+1234567890',
};

const mockConfigMission: InviteConfig = {
  ...mockConfigCruise,
  theme: 'secret_mission',
  senderName: 'Agent Smith',
  recipientName: 'Agent Jones',
};

const mockResponse: RecipientResponse = {
  step: 7,
  recipientGender: 'female',
  wantsDate: true,
  arrivalPreference: 'pickup',
  selectedActivity: 'coffee',
  selectedCustomOption: null,
  selectedSlot: mockConfigCruise.dateSlots[0],
  rideAnswer: null,
  spontaneityAnswer: null,
  prefersWhatsappCoordination: false,
  personalNote: '',
  foundEasterEgg: false,
  foundStamp: false,
  foundDuck: false,
};

const screens = [
  { id: 'arrival', label: 'Arrival Screen' },
  { id: 'intro', label: 'Intro Cards Screen' },
  { id: 'question', label: 'Main Question Screen' },
  { id: 'arrivalPreference', label: 'Arrival Preference Screen' },
  { id: 'activity', label: 'Activity Choice Screen' },
  { id: 'slots', label: 'Slot Choice Screen' },
  { id: 'confirmation', label: 'Confirmation Screen' },
  { id: 'decline', label: 'Decline Screen' },
];

export function DevMode() {
  const [selectedScreen, setSelectedScreen] = useState<string>('arrival');
  const [theme, setTheme] = useState<'cruise' | 'secret_mission'>('cruise');

  const config = theme === 'cruise' ? mockConfigCruise : mockConfigMission;

  // Mock Easter egg state for DevMode
  const mockEasterEggState = {
    targetScreen: 'arrival' as const,
    hasBeenRevealed: false,
    markAsRevealed: () => console.log('Easter egg revealed'),
    shouldShowOnScreen: () => false, // Don't show in DevMode
  };

  const renderScreen = () => {
    const noop = () => console.log('Action triggered');

    switch (selectedScreen) {
      case 'arrival':
        return <ArrivalScreen config={config} onNext={noop} easterEggState={mockEasterEggState} stampState={mockEasterEggState} />;
      case 'intro':
        return <IntroCardsScreen config={config} onNext={noop} easterEggState={mockEasterEggState} duckState={mockEasterEggState} />;
      case 'question':
        return (
          <MainQuestionScreen
            config={config}
            onYes={noop}
            onNo={noop}
            onDecline={noop}
          />
        );
      case 'arrivalPreference':
        return (
          <ArrivalPreferenceScreen
            config={config}
            onSelect={(preference) => console.log('Selected arrival preference:', preference)}
            easterEggState={mockEasterEggState}
          />
        );
      case 'activity':
        return (
          <ActivityChoiceScreen
            config={config}
            onSelect={(activityId) => console.log('Selected:', activityId)}
            easterEggState={mockEasterEggState}
          />
        );
      case 'slots':
        return (
          <SlotChoiceScreen
            config={config}
            onSelectSlot={(slot) => console.log('Selected slot:', slot)}
            onCoordinateWhatsapp={noop}
            easterEggState={mockEasterEggState}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationScreen
            config={config}
            response={mockResponse}
            onCreateOwn={noop}
            easterEggState={mockEasterEggState}
          />
        );
      case 'decline':
        return <DeclineScreen config={config} onCreateOwn={noop} />;
      default:
        return <div>Unknown screen</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200">
      {/* Dev Controls */}
      <div className="fixed left-0 right-0 top-0 z-50 border-b-2 border-orange-500 bg-orange-50 p-3 shadow-lg">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-bold text-orange-900">
              Screen
            </label>
            <select
              value={selectedScreen}
              onChange={(e) => setSelectedScreen(e.target.value)}
              className="w-full rounded-lg border-2 border-orange-300 bg-white px-3 py-2 text-sm font-medium"
            >
              {screens.map((screen) => (
                <option key={screen.id} value={screen.id}>
                  {screen.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="mb-1 block text-xs font-bold text-orange-900">
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'cruise' | 'secret_mission')}
              className="w-full rounded-lg border-2 border-orange-300 bg-white px-3 py-2 text-sm font-medium"
            >
              <option value="cruise">Cruise</option>
              <option value="secret_mission">Secret Mission</option>
            </select>
          </div>

          <div className="flex-shrink-0">
            <label className="mb-1 block text-xs font-bold text-orange-900">
              Dev Mode
            </label>
            <div className="rounded-lg bg-orange-600 px-3 py-2 text-sm font-bold text-white">
              DEV
            </div>
          </div>
        </div>
      </div>

      {/* Screen Display */}
      <div className="pt-24">{renderScreen()}</div>
    </div>
  );
}
