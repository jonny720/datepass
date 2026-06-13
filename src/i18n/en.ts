import type { TranslationDictionary } from './types';

export const en: TranslationDictionary = {
  // Navigation
  app_title: 'DatePass',
  app_description: 'Create playful date invitations',
  app_start_over: 'Start over',
  app_start_over_title: 'Start over?',
  app_start_over_description: 'This will clear the invitation you are currently creating.',
  app_start_over_confirm: 'Start over',
  app_start_over_cancel: 'Cancel',
  app_not_found_title: 'Page not found',
  app_not_found_subtitle: "The page you're looking for doesn't exist.",
  app_go_home: 'Go to Home',

  // Landing
  landing_title: 'DatePass',
  landing_subtitle: 'Create playful date invitations',
  landing_create_button: 'Create Invitation',
  landing_tagline: 'Turn a maybe into a date',

  // Creator flow - Step 1: Welcome
  creator_welcome_title: 'Create an invitation',
  creator_welcome_subtitle: 'Pick your language to start',
  creator_choose_language: 'Language',

  // Creator flow - Step 2: Names
  creator_names_title: 'Who\'s this for?',
  creator_names_subtitle: '',
  creator_your_name: 'Your name',
  creator_recipient_name: 'Their name',
  creator_name_required: 'Name required',
  creator_name_placeholder_sender: 'Your name',
  creator_name_placeholder_recipient: 'Their name',

  // Creator flow - Step 3: Theme
  creator_theme_title: 'Pick a theme',
  creator_theme_subtitle: '',
  creator_theme_cruise: 'Cruise Ticket',
  creator_theme_cruise_desc: 'Playful and adventurous',
  creator_theme_secret_mission: 'Secret Mission',
  creator_theme_secret_mission_desc: 'Mysterious and intriguing',
  creator_theme_nature: 'Nature Escape',
  creator_theme_nature_desc: 'Calm and outdoorsy',
  creator_theme_party: 'Party Vibe',
  creator_theme_party_desc: 'Energetic and fun',
  creator_theme_after_dark: 'After Dark',
  creator_theme_after_dark_desc: 'Daring and mysterious',

  // Creator flow - Step 4: Tone
  creator_tone_title: 'Choose your tone',
  creator_tone_subtitle: 'This sets the vibe for your intro cards',
  creator_tone_playful: 'Playful',
  creator_tone_playful_desc: 'Fun and lighthearted',
  creator_tone_flirty: 'Flirty',
  creator_tone_flirty_desc: 'Charming and romantic',
  creator_tone_absurd: 'Absurd',
  creator_tone_absurd_desc: 'Quirky and unexpected',

  // Creator flow - Step 5: Intro Cards
  creator_cards_title: 'Tell them about yourself',
  creator_cards_subtitle: 'Pick 3 prompts and write your answers',
  creator_cards_instruction: 'Pick exactly 3',
  creator_cards_regenerate: 'Show different prompts',
  creator_cards_char_limit: 'chars',
  creator_cards_empty_state: 'Pick 3 prompts to continue',

  // Creator flow - Step 6: Activities
  creator_activities_title: 'What would you like to do?',
  creator_activities_subtitle: 'Choose 1-4 activities',
  creator_activities_min_max: 'Select between 1 and 4 activities',
  creator_activities_empty_state: 'Pick at least one activity',

  // Creator flow - Step 7: Date Slots
  creator_slots_title: 'When works for you?',
  creator_slots_subtitle: 'Optional – add up to 3 time options',
  creator_slots_date: 'Date',
  creator_slots_time: 'Time',
  creator_slots_add: 'Add another',
  creator_slots_remove: 'Remove',
  creator_slots_skip: 'Skip',
  creator_slots_empty_state: '',

  // Creator flow - Step 8: WhatsApp
  creator_whatsapp_title: 'Where should the answer go?',
  creator_whatsapp_subtitle: 'Add your WhatsApp number so the confirmation opens directly in your chat.',
  creator_whatsapp_label: 'WhatsApp number',
  creator_whatsapp_placeholder: '972501234567',
  creator_whatsapp_helper: 'Use your full international number, including country code.',
  creator_whatsapp_validation_error: 'Enter a full international WhatsApp number, for example 972501234567.',
  creator_whatsapp_skip: 'Skip',
  creator_whatsapp_privacy_note: 'Your number will be embedded in the shareable link.',
  creator_whatsapp_no_auto_send: 'Nothing is sent automatically.',

  // Creator flow - Step 8: Review
  creator_review_title: 'Your invitation is ready',
  creator_review_subtitle: 'Now send it before you start overthinking it.',
  creator_review_ticket_status: 'READY TO SEND',
  creator_review_ticket_passenger: 'Passenger',
  creator_review_ticket_host: 'Host',
  creator_review_ticket_theme: 'Theme',
  creator_review_ticket_duration: 'Duration',
  creator_review_ticket_duration_value: 'One evening',
  creator_review_summary_cards: 'personal cards',
  creator_review_summary_activities: 'date ideas',
  creator_review_summary_slots: 'suggested times',
  creator_review_summary_coordinate: 'Coordinate later',
  creator_review_share_button: 'Share invitation',
  creator_review_whatsapp_button: 'WhatsApp',
  creator_review_copy_button: 'Copy link',
  creator_review_copied: 'Copied',
  creator_review_preview_button: 'Preview full experience',
  creator_review_edit_button: 'Edit invitation',
  creator_review_reset_button: 'Start over',

  // Activities
  activity_coffee: 'Coffee',
  activity_coffee_subtitle: 'Cozy café vibes',
  activity_drinks: 'Drinks',
  activity_drinks_subtitle: 'Evening cocktails',
  activity_restaurant: 'Restaurant',
  activity_restaurant_subtitle: 'Dinner together',
  activity_sunset_walk: 'Sunset Walk',
  activity_sunset_walk_subtitle: 'Stroll at golden hour',
  activity_movie: 'Movie',
  activity_movie_subtitle: 'Cinema or streaming',
  activity_competitive: 'Competitive',
  activity_competitive_subtitle: 'Game night or sports',
  activity_creative: 'Creative',
  activity_creative_subtitle: 'Art, music, or crafts',
  activity_surprise_me: 'Surprise Me',
  activity_surprise_me_subtitle: 'You choose!',

  // Recipient flow
  recipient_title: 'Date Invitation',
  recipient_invitation_from: 'Invitation from',
  recipient_intro_section: 'About me',
  recipient_activities_section: 'What we could do',
  recipient_when_section: 'When',
  recipient_contact_section: 'Get in touch',
  recipient_no_slots_message: 'Let\'s find a time that works for both of us',

  // Recipient Screen 1: Arrival
  recipient_arrival_for: 'For',
  recipient_arrival_from: 'From',
  recipient_arrival_open_button: 'Open Invitation',
  recipient_cruise_destination: 'Destination: Classified',
  recipient_cruise_duration: 'Expected Duration: One Evening',
  recipient_cruise_fun_probability: 'Probability of Having Fun: Suspiciously High',
  recipient_mission_classification: 'Classification: Top Secret',
  recipient_mission_risk: 'Risk Level: Worth It',
  recipient_mission_success_rate: 'Success Rate: To Be Determined',

  // Recipient Screen 2: Intro Cards
  recipient_cards_eyebrow: 'Before we continue...',
  recipient_cards_title: 'A few things you should probably know',
  recipient_cards_subtitle: 'Important information. Probably.',
  recipient_cards_continue: 'Okay, continue',
  recipient_cards_fallback_prompt: 'A question about me',

  // Recipient Screen 3: Main Question
  recipient_question_title: 'So, what do you think?',
  recipient_question_subtitle: 'Would you like to go on this date?',
  recipient_question_yes: 'Yes, let\'s do it!',
  recipient_question_no: 'Not right now',
  recipient_question_maybe_later: 'Maybe another time',
  recipient_question_no_escape_1: 'Are you sure?',
  recipient_question_no_escape_2: 'Almost',
  recipient_question_no_escape_3: 'Nice try',
  recipient_question_no_escape_4: 'Still trying?',
  recipient_question_no_escape_5: 'Persistent, huh?',
  recipient_question_no_escape_6: 'Fine, you can click me now',
  recipient_question_decline_serious: 'No thanks, seriously',
  recipient_question_notification: 'will get your answer',

  // Recipient Screen 4: Activity Choice
  recipient_activity_title: 'What sounds good?',
  recipient_activity_subtitle: 'Pick what you\'d enjoy',
  recipient_activity_choose_one: 'Choose an activity',

  // Recipient Screen 5: Slot Choice
  recipient_slot_title: 'When works for you?',
  recipient_slot_subtitle: 'Pick your preferred time',
  recipient_slot_coordinate_whatsapp: 'Coordinate on WhatsApp',
  recipient_slot_choose_one: 'Choose a time',

  // Recipient Screen 6: Confirmation
  recipient_confirmation_title: 'Perfect!',
  recipient_confirmation_subtitle: 'Here\'s what we agreed on',
  recipient_confirmation_activity: 'Activity',
  recipient_confirmation_when: 'When',
  recipient_confirmation_coordinate: 'We\'ll coordinate',
  recipient_confirmation_score_disclaimer: 'Totally made up, but sounds good',
  recipient_confirmation_whatsapp_send: 'Send confirmation on WhatsApp',
  recipient_confirmation_copy: 'Copy confirmation',
  recipient_confirmation_copied: 'Copied',
  recipient_confirmation_share: 'Share confirmation',
  recipient_confirmation_no_whatsapp_message: 'Copy the confirmation and send it to the person who invited you.',
  recipient_confirmation_create_own: 'Create your own invitation',

  // Decline screen
  recipient_decline_title: 'All good',
  recipient_decline_subtitle: 'At least the effects were cool',
  recipient_decline_notification: 'will know',

  // Invalid link
  invalid_link_title: 'Invalid Link',
  invalid_link_message: 'This invitation link doesn\'t seem to work.',
  invalid_link_button: 'Go to Home',
  invalid_link_explanation: 'The link might be incomplete or expired. Ask for a new invitation.',

  // Common actions
  back: 'Back',
  next: 'Next',
  cancel: 'Cancel',
  confirm: 'Confirm',
  skip: 'Skip',
  optional: 'Optional',
  continue: 'Continue',
  done: 'Done',
  close: 'Close',

  // Common messages
  loading: 'Loading...',
  error_generic: 'Something went wrong',
  error_network: 'Check your connection',
  success: 'Success!',
};
