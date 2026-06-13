import type { TranslationDictionary } from './types';

export const he: TranslationDictionary = {
  // Navigation
  app_title: 'DatePass',
  app_description: 'צור הזמנות דייט מקוריות',
  app_start_over: 'להתחיל מחדש',
  app_start_over_title: 'להתחיל מחדש?',
  app_start_over_description: 'הפעולה תמחק את ההזמנה שבנית עד עכשיו.',
  app_start_over_confirm: 'להתחיל מחדש',
  app_start_over_cancel: 'ביטול',
  app_not_found_title: 'הדף לא נמצא',
  app_not_found_subtitle: 'הדף שחיפשת לא קיים.',
  app_go_home: 'חזרה לדף הבית',

  // Landing
  landing_title: 'DatePass',
  landing_subtitle: 'צור הזמנות דייט מקוריות',
  landing_create_button: 'צור הזמנה',
  landing_tagline: 'הפכו אולי לדייט',

  // Creator flow - Step 1: Welcome
  creator_welcome_title: 'צרו הזמנה',
  creator_welcome_subtitle: 'בחרו שפה כדי להתחיל',
  creator_choose_language: 'שפה',

  // Creator flow - Step 2: Names
  creator_names_title: 'למי ההזמנה?',
  creator_names_subtitle: '',
  creator_your_name: 'השם שלך',
  creator_recipient_name: 'השם שלו/ה',
  creator_name_required: 'צריך שם',
  creator_name_placeholder_sender: 'השם שלך',
  creator_name_placeholder_recipient: 'השם שלו/ה',

  // Creator flow - Step 3: Theme
  creator_theme_title: 'בחרו נושא',
  creator_theme_subtitle: '',
  creator_theme_cruise: 'כרטיס שיוט',
  creator_theme_cruise_desc: 'משעשע והרפתקני',
  creator_theme_secret_mission: 'משימה חשאית',
  creator_theme_secret_mission_desc: 'מסתורי ומסקרן',
  creator_theme_nature: 'בריחה לטבע',
  creator_theme_nature_desc: 'שקט וחיצוני',
  creator_theme_party: 'אווירת מסיבה',
  creator_theme_party_desc: 'אנרגטי וכיפי',
  creator_theme_after_dark: 'אחרי החשכה',
  creator_theme_after_dark_desc: 'מתגרה ומסתורי',

  // Creator flow - Step 4: Tone
  creator_tone_title: 'בחרו טון',
  creator_tone_subtitle: 'זה מגדיר את הסגנון של הכרטיסים',
  creator_tone_playful: 'משעשע',
  creator_tone_playful_desc: 'כיפי וקליל',
  creator_tone_flirty: 'פלרטוטי',
  creator_tone_flirty_desc: 'מקסים ורומנטי',
  creator_tone_absurd: 'אבסורדי',
  creator_tone_absurd_desc: 'משונה ובלתי צפוי',

  // Creator flow - Step 5: Intro Cards
  creator_cards_title: 'ספרו על עצמכם',
  creator_cards_subtitle: 'בחרו 3 שאלות וכתבו תשובות',
  creator_cards_instruction: 'בחרו בדיוק 3',
  creator_cards_regenerate: 'הראו שאלות אחרות',
  creator_cards_char_limit: 'תווים מקסימום',
  creator_cards_empty_state: 'בחרו 3 פרומפטים כדי להמשיך',

  // Creator flow - Step 6: Activities
  creator_activities_title: 'מה תרצו לעשות?',
  creator_activities_subtitle: 'בחרו 1-4 פעילויות',
  creator_activities_min_max: 'בחרו בין 1 ל-4 פעילויות',
  creator_activities_empty_state: 'בחרו לפחות פעילות אחת',

  // Creator flow - Step 7: Date Slots
  creator_slots_title: 'מתי נוח לכם?',
  creator_slots_subtitle: 'אופציונלי – עד 3 זמנים',
  creator_slots_date: 'תאריך',
  creator_slots_time: 'שעה',
  creator_slots_add: 'הוסיפו עוד',
  creator_slots_remove: 'הסירו',
  creator_slots_skip: 'דלגו',
  creator_slots_empty_state: '',

  // Creator flow - Step 8: WhatsApp
  creator_whatsapp_title: 'לאן לשלוח את התשובה?',
  creator_whatsapp_subtitle: 'הוסיפו מספר וואטסאפ כדי שהאישור ייפתח ישירות בשיחה איתכם.',
  creator_whatsapp_label: 'מספר וואטסאפ',
  creator_whatsapp_placeholder: '972501234567',
  creator_whatsapp_helper: 'יש להזין מספר מלא עם קידומת מדינה.',
  creator_whatsapp_validation_error: 'יש להזין מספר וואטסאפ מלא עם קידומת מדינה, לדוגמה 972501234567.',
  creator_whatsapp_skip: 'דלגו',
  creator_whatsapp_privacy_note: 'המספר יהיה מוטמע בקישור השיתוף.',
  creator_whatsapp_no_auto_send: 'שום דבר לא נשלח אוטומטית.',

  // Creator flow - Step 8: Review
  creator_review_title: 'ההזמנה שלך מוכנה',
  creator_review_subtitle: 'עכשיו נשאר רק לשלוח לפני שמתחילים לחשוב יותר מדי.',
  creator_review_ticket_status: 'מוכן למשלוח',
  creator_review_ticket_passenger: 'נוסעת',
  creator_review_ticket_host: 'מארח',
  creator_review_ticket_theme: 'נושא',
  creator_review_ticket_duration: 'משך',
  creator_review_ticket_duration_value: 'ערב אחד',
  creator_review_summary_cards: 'כרטיסי היכרות',
  creator_review_summary_activities: 'רעיונות לדייט',
  creator_review_summary_slots: 'מועדים מוצעים',
  creator_review_summary_coordinate: 'נתאם אחר כך',
  creator_review_share_button: 'שליחת ההזמנה',
  creator_review_whatsapp_button: 'WhatsApp',
  creator_review_copy_button: 'העתקת קישור',
  creator_review_copied: 'הועתק',
  creator_review_preview_button: 'צפייה בחווייה המלאה',
  creator_review_edit_button: 'עריכת ההזמנה',
  creator_review_reset_button: 'להתחיל מחדש',

  // Activities
  activity_coffee: 'קפה',
  activity_coffee_subtitle: 'אווירת קפה נעימה',
  activity_drinks: 'משקאות',
  activity_drinks_subtitle: 'קוקטיילים בערב',
  activity_restaurant: 'מסעדה',
  activity_restaurant_subtitle: 'ארוחת ערב ביחד',
  activity_sunset_walk: 'טיול בשקיעה',
  activity_sunset_walk_subtitle: 'הליכה בשעת הזהב',
  activity_movie: 'סרט',
  activity_movie_subtitle: 'קולנוע או בבית',
  activity_competitive: 'תחרותי',
  activity_competitive_subtitle: 'משחקים או ספורט',
  activity_creative: 'יצירתי',
  activity_creative_subtitle: 'אומנות, מוזיקה או יצירה',
  activity_surprise_me: 'הפתיעו אותי',
  activity_surprise_me_subtitle: 'אתם בוחרים!',

  // Recipient flow
  recipient_title: 'הזמנה לדייט',
  recipient_invitation_from: 'הזמנה מ',
  recipient_intro_section: 'עליי',
  recipient_activities_section: 'מה נוכל לעשות',
  recipient_when_section: 'מתי',
  recipient_contact_section: 'יצירת קשר',
  recipient_no_slots_message: 'בואו נמצא זמן שמתאים לשנינו',

  // Recipient Screen 1: Arrival
  recipient_arrival_for: 'עבור',
  recipient_arrival_from: 'מאת',
  recipient_arrival_open_button: 'פתיחת ההזמנה',
  recipient_cruise_destination: 'יעד: מסווג',
  recipient_cruise_duration: 'משך צפוי: ערב אחד',
  recipient_cruise_fun_probability: 'הסתברות לכיף: גבוהה באופן חשוד',
  recipient_mission_classification: 'סיווג: סודי ביותר',
  recipient_mission_risk: 'רמת סיכון: שווה את זה',
  recipient_mission_success_rate: 'שיעור הצלחה: יקבע בשטח',

  // Recipient Screen 2: Intro Cards
  recipient_cards_eyebrow: 'לפני שממשיכים...',
  recipient_cards_title: 'כמה דברים שכדאי שתדעי',
  recipient_cards_subtitle: 'מידע חשוב. כנראה.',
  recipient_cards_continue: 'טוב, אפשר להמשיך',
  recipient_cards_fallback_prompt: 'שאלה עליי',

  // Recipient Screen 3: Main Question
  recipient_question_title: 'אז מה דעתך?',
  recipient_question_subtitle: 'רוצה לצאת לדייט הזה?',
  recipient_question_yes: 'כן, בואו נעשה את זה!',
  recipient_question_no: 'לא כרגע',
  recipient_question_maybe_later: 'אולי בפעם אחרת',
  recipient_question_no_escape_1: 'בטוחה?',
  recipient_question_no_escape_2: 'כמעט',
  recipient_question_no_escape_3: 'ניסיון יפה',
  recipient_question_no_escape_4: 'עדיין מנסה?',
  recipient_question_no_escape_5: 'עקשנית, אה?',
  recipient_question_no_escape_6: 'טוב, עכשיו באמת אפשר ללחוץ',
  recipient_question_decline_serious: 'לא תודה, ברצינות',
  recipient_question_notification: 'יקבל את התשובה',

  // Recipient Screen 4: Activity Choice
  recipient_activity_title: 'מה נשמע טוב?',
  recipient_activity_subtitle: 'בחרו מה שמתאים לכם',
  recipient_activity_choose_one: 'בחרו פעילות',

  // Recipient Screen 5: Slot Choice
  recipient_slot_title: 'מתי מתאים לך?',
  recipient_slot_subtitle: 'בחרו את הזמן המועדף',
  recipient_slot_coordinate_whatsapp: 'תיאום בווטסאפ',
  recipient_slot_choose_one: 'בחרו זמן',

  // Recipient Screen 6: Confirmation
  recipient_confirmation_title: 'מושלם!',
  recipient_confirmation_subtitle: 'הנה מה שסיכמנו',
  recipient_confirmation_activity: 'פעילות',
  recipient_confirmation_when: 'מתי',
  recipient_confirmation_coordinate: 'נתאם ביננו',
  recipient_confirmation_score_disclaimer: 'ממציאים לחלוטין, אבל נשמע טוב',
  recipient_confirmation_whatsapp_send: 'שליחת אישור בוואטסאפ',
  recipient_confirmation_copy: 'העתקת הסיכום',
  recipient_confirmation_copied: 'הועתק',
  recipient_confirmation_share: 'שיתוף האישור',
  recipient_confirmation_no_whatsapp_message: 'העתיקו את האישור ושלחו אותו למי שהזמין אתכם.',
  recipient_confirmation_create_own: 'צרו הזמנה משלכם',

  // Decline screen
  recipient_decline_title: 'הכול בסדר',
  recipient_decline_subtitle: 'לפחות האפקטים היו מגניבים',
  recipient_decline_notification: 'יקבל הודעה',

  // Invalid link
  invalid_link_title: 'קישור לא תקין',
  invalid_link_message: 'נראה שהקישור לא עובד.',
  invalid_link_button: 'חזרה לדף הבית',
  invalid_link_explanation: 'הקישור עשוי להיות לא שלם או שפג תוקפו. בקשו הזמנה חדשה.',

  // Common actions
  back: 'חזור',
  next: 'הבא',
  cancel: 'ביטול',
  confirm: 'אישור',
  skip: 'דלג',
  optional: 'אופציונלי',
  continue: 'המשך',
  done: 'סיום',
  close: 'סגור',

  // Common messages
  loading: 'טוען...',
  error_generic: 'משהו השתבש',
  error_network: 'בדקו את החיבור',
  success: 'הצלחה!',
};
