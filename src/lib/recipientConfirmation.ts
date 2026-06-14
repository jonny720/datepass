import type { ArrivalPreference, Language, DateSlot, InviteType, RecipientGender, ThemeId } from '@/types';
import { getInviteTypeConfig } from '@/config/inviteTypes';
import { heByGender } from '@/lib/hebrewGender';

/**
 * Parameters for building the recipient confirmation message
 */
export interface RecipientConfirmationParams {
  creatorPhone?: string;
  inviteType?: InviteType;
  theme?: ThemeId;
  language: Language;
  activityName: string;
  selectedSlot?: DateSlot;
  coordinateLater: boolean;
  arrivalPreference?: ArrivalPreference | null;
  recipientGender?: RecipientGender | null;
  personalNote?: string;
  noteHeader?: string;
  foundEasterEgg?: boolean;
  rideAnswer?: string | null;
  spontaneityAnswer?: string | null;
  boundariesAnswer?: string | null;
}

/**
 * Format a date in a natural, localized way
 */
function formatDate(dateStr: string, language: Language): string {
  try {
    const date = new Date(dateStr + 'T00:00:00');
    
    if (language === 'he') {
      // Hebrew format: "5 ביוני 2026"
      const day = date.getDate();
      const months = [
        'בינואר', 'בפברואר', 'במרץ', 'באפריל', 'במאי', 'ביוני',
        'ביולי', 'באוגוסט', 'בספטמבר', 'באוקטובר', 'בנובמבר', 'בדצמבר'
      ];
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } else {
      // English format: "5 Jun 2026"
      const day = date.getDate();
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    }
  } catch {
    return dateStr;
  }
}

/**
 * Build the recipient confirmation message text
 */
export function buildRecipientConfirmationMessage(params: RecipientConfirmationParams): string {
  const { inviteType = 'date', theme, language, activityName, selectedSlot, coordinateLater, arrivalPreference, recipientGender, personalNote, noteHeader, foundEasterEgg, rideAnswer, spontaneityAnswer, boundariesAnswer } = params;
  const typeConfig = getInviteTypeConfig(inviteType);
  const intro = theme === 'power-play'
    ? {
        en: 'I accepted the private terms 🔒',
        he: 'אישרתי את התנאים הפרטיים 🔒',
      }
    : typeConfig.confirmationIntro;
  
  if (language === 'he') {
    let message = `${intro.he}\n\n`;
    message += `בחרתי: ${activityName}\n`;
    
    if (coordinateLater) {
      message += 'בוא נתאם את המועד בוואטסאפ.';
    } else if (selectedSlot) {
      const formattedDate = formatDate(selectedSlot.date, language);
      message += `המועד שמתאים לי: ${formattedDate} בשעה ${selectedSlot.time}`;
    }

    if (arrivalPreference) {
      message += `\nאיך אני מגיעה: ${
        arrivalPreference === 'pickup'
          ? heByGender(recipientGender, {
              male: 'אני צריך איסוף',
              female: 'אני צריכה איסוף',
              private: 'צריך לתאם איסוף',
            })
          : heByGender(recipientGender, {
              male: 'אני אגיע בעצמי',
              female: 'אני אגיע בעצמי',
              private: 'אגיע באופן עצמאי',
            })
      }`;
    }

    if (rideAnswer) {
      message += `\nטרמפ: ${rideAnswer}`;
    }

    if (spontaneityAnswer) {
      message += `\nספונטניות: ${spontaneityAnswer}`;
    }

    if (boundariesAnswer) {
      message += `\nגבולות: ${boundariesAnswer}`;
    }
    
    // Append personal note if provided
    if (personalNote && personalNote.trim()) {
      message += `\n\n${noteHeader || 'הודעה ממני:'}\n${personalNote.trim()}`;
    }
    
    // Add Easter egg message if found
    if (foundEasterEgg) {
      message += '\n\n🥚 גם מצאתי את הביצה הסודית!';
    }
    
    return message;
  } else {
    let message = `${intro.en}\n\n`;
    message += `My choice: ${activityName}\n`;
    
    if (coordinateLater) {
      message += 'Let\'s coordinate the time on WhatsApp.';
    } else if (selectedSlot) {
      const formattedDate = formatDate(selectedSlot.date, language);
      message += `Preferred time: ${formattedDate} at ${selectedSlot.time}`;
    }

    if (arrivalPreference) {
      message += `\nGetting there: ${
        arrivalPreference === 'pickup' ? 'I need pickup' : 'I’ll come by myself'
      }`;
    }

    if (rideAnswer) {
      message += `\nRide: ${rideAnswer}`;
    }

    if (spontaneityAnswer) {
      message += `\nSpontaneity: ${spontaneityAnswer}`;
    }

    if (boundariesAnswer) {
      message += `\nBoundaries: ${boundariesAnswer}`;
    }
    
    // Append personal note if provided
    if (personalNote && personalNote.trim()) {
      message += `\n\n${noteHeader || 'My note:'}\n${personalNote.trim()}`;
    }
    
    // Add Easter egg message if found
    if (foundEasterEgg) {
      message += '\n\n🥚 I also found the secret egg!';
    }
    
    return message;
  }
}

/**
 * Normalize a phone number for WhatsApp (remove formatting, keep digits and country code)
 */
function normalizePhoneNumber(phone: string): string {
  // Remove spaces, hyphens, parentheses
  let normalized = phone.replace(/[\s\-()]/g, '');
  
  // Remove leading + if present (WhatsApp API expects no +)
  if (normalized.startsWith('+')) {
    normalized = normalized.substring(1);
  }
  
  return normalized;
}

/**
 * Build the WhatsApp URL for recipient confirmation
 * 
 * Uses the WhatsApp API send endpoint with phone parameter for reliable
 * direct chat opening on iPhone and other mobile devices.
 * 
 * @param params - Confirmation parameters including creator phone
 * @returns WhatsApp URL with pre-filled message, or null if no valid phone
 */
export function buildRecipientConfirmationWhatsAppUrl(params: RecipientConfirmationParams): string | null {
  const message = buildRecipientConfirmationMessage(params);
  const encodedMessage = encodeURIComponent(message);
  
  if (params.creatorPhone) {
    const normalizedPhone = normalizePhoneNumber(params.creatorPhone);
    // Use WhatsApp API with phone parameter for direct chat
    // More reliable on iPhone than wa.me format
    return `https://api.whatsapp.com/send?phone=${normalizedPhone}&text=${encodedMessage}`;
  }
  
  // No phone number provided - return null instead of generic fallback
  // Caller should handle this case by showing copy/share options
  return null;
}
