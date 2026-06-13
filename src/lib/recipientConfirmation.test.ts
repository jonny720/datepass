import { describe, expect, it } from 'vitest';
import { buildRecipientConfirmationMessage } from './recipientConfirmation';

describe('buildRecipientConfirmationMessage', () => {
  it('includes pickup preference in English', () => {
    const message = buildRecipientConfirmationMessage({
      language: 'en',
      activityName: 'Coffee',
      coordinateLater: true,
      arrivalPreference: 'pickup',
    });

    expect(message).toContain('Getting there: I need pickup');
  });

  it('includes self-arrival preference in Hebrew', () => {
    const message = buildRecipientConfirmationMessage({
      language: 'he',
      activityName: 'קפה',
      coordinateLater: true,
      arrivalPreference: 'self',
      recipientGender: 'female',
    });

    expect(message).toContain('איך אני מגיעה: אני אגיע בעצמי');
  });
});
