import type { Language, DateSlot } from '@/types';

/**
 * Parameters for building the recipient confirmation message
 */
export interface RecipientConfirmationParams {
  creatorPhone?: string;
  language: Language;
  activityName: string;
  selectedSlot?: DateSlot;
  coordinateLater: boolean;
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
  const { language, activityName, selectedSlot, coordinateLater } = params;
  
  if (language === 'he') {
    let message = 'אישרתי את ההזמנה 😌\n\n';
    message += `בחרתי: ${activityName}\n`;
    
    if (coordinateLater) {
      message += 'בוא נתאם את המועד בוואטסאפ.';
    } else if (selectedSlot) {
      const formattedDate = formatDate(selectedSlot.date, language);
      message += `המועד שמתאים לי: ${formattedDate} בשעה ${selectedSlot.time}`;
    }
    
    return message;
  } else {
    let message = 'I accepted the invitation 😌\n\n';
    message += `My choice: ${activityName}\n`;
    
    if (coordinateLater) {
      message += 'Let\'s coordinate the time on WhatsApp.';
    } else if (selectedSlot) {
      const formattedDate = formatDate(selectedSlot.date, language);
      message += `Preferred time: ${formattedDate} at ${selectedSlot.time}`;
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
 */
export function buildRecipientConfirmationWhatsAppUrl(params: RecipientConfirmationParams): string {
  const message = buildRecipientConfirmationMessage(params);
  const encodedMessage = encodeURIComponent(message);
  
  if (params.creatorPhone) {
    const normalizedPhone = normalizePhoneNumber(params.creatorPhone);
    return `https://wa.me/${normalizedPhone}?text=${encodedMessage}`;
  } else {
    return `https://wa.me/?text=${encodedMessage}`;
  }
}
