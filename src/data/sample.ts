import type { InviteConfig } from '@/types';

export const SAMPLE_INVITE: InviteConfig = {
  version: 1,
  inviteType: 'date',
  language: 'en',
  senderName: 'Alex',
  recipientName: 'Jordan',
  recipientGender: 'private',
  theme: 'cruise',
  introTone: 'light',
  introCards: [
    {
      id: '1',
      promptKey: 'intro_card_1',
      answer: 'Adventure awaits!',
    },
    {
      id: '2',
      promptKey: 'intro_card_2',
      answer: "Life is short, let's make it memorable",
    },
  ],
  activityIds: ['coffee', 'sunset-walk', 'restaurant'],
  dateSlots: [
    {
      id: '1',
      date: '2026-06-20',
      time: '19:00',
    },
    {
      id: '2',
      date: '2026-06-21',
      time: '18:30',
    },
    {
      id: '3',
      date: '2026-06-22',
      time: '20:00',
    },
  ],
  whatsappNumber: '+1234567890',
};
