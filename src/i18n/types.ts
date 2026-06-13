import type { Language } from '@/types';

export interface TranslationDictionary {
  // Navigation
  app_title: string;
  app_description: string;
  app_start_over: string;
  app_start_over_title: string;
  app_start_over_description: string;
  app_start_over_confirm: string;
  app_start_over_cancel: string;
  app_not_found_title: string;
  app_not_found_subtitle: string;
  app_go_home: string;

  // Landing
  landing_title: string;
  landing_subtitle: string;
  landing_create_button: string;
  landing_tagline: string;

  // Creator flow - Step 1: Welcome
  creator_welcome_title: string;
  creator_welcome_subtitle: string;
  creator_choose_language: string;

  // Creator flow - Step 2: Names
  creator_names_title: string;
  creator_names_subtitle: string;
  creator_your_name: string;
  creator_recipient_name: string;
  creator_name_required: string;
  creator_name_placeholder_sender: string;
  creator_name_placeholder_recipient: string;

  // Creator flow - Step 3: Theme
  creator_theme_title: string;
  creator_theme_subtitle: string;
  creator_theme_cruise: string;
  creator_theme_cruise_desc: string;
  creator_theme_secret_mission: string;
  creator_theme_secret_mission_desc: string;
  creator_theme_nature: string;
  creator_theme_nature_desc: string;
  creator_theme_party: string;
  creator_theme_party_desc: string;
  creator_theme_after_dark: string;
  creator_theme_after_dark_desc: string;

  // Creator flow - Step 4: Tone
  creator_tone_title: string;
  creator_tone_subtitle: string;
  creator_tone_playful: string;
  creator_tone_playful_desc: string;
  creator_tone_flirty: string;
  creator_tone_flirty_desc: string;
  creator_tone_absurd: string;
  creator_tone_absurd_desc: string;

  // Creator flow - Step 5: Intro Cards
  creator_cards_title: string;
  creator_cards_subtitle: string;
  creator_cards_instruction: string;
  creator_cards_regenerate: string;
  creator_cards_char_limit: string;
  creator_cards_empty_state: string;

  // Creator flow - Step 6: Activities
  creator_activities_title: string;
  creator_activities_subtitle: string;
  creator_activities_min_max: string;
  creator_activities_empty_state: string;

  // Creator flow - Step 7: Date Slots
  creator_slots_title: string;
  creator_slots_subtitle: string;
  creator_slots_date: string;
  creator_slots_time: string;
  creator_slots_add: string;
  creator_slots_remove: string;
  creator_slots_skip: string;
  creator_slots_empty_state: string;

  // Creator flow - Step 8: WhatsApp
  creator_whatsapp_title: string;
  creator_whatsapp_subtitle: string;
  creator_whatsapp_label: string;
  creator_whatsapp_placeholder: string;
  creator_whatsapp_helper: string;
  creator_whatsapp_validation_error: string;
  creator_whatsapp_skip: string;
  creator_whatsapp_privacy_note: string;
  creator_whatsapp_no_auto_send: string;

  // Creator flow - Step 8: Review
  creator_review_title: string;
  creator_review_subtitle: string;
  creator_review_ticket_status: string;
  creator_review_ticket_passenger: string;
  creator_review_ticket_host: string;
  creator_review_ticket_theme: string;
  creator_review_ticket_duration: string;
  creator_review_ticket_duration_value: string;
  creator_review_summary_cards: string;
  creator_review_summary_activities: string;
  creator_review_summary_slots: string;
  creator_review_summary_coordinate: string;
  creator_review_share_button: string;
  creator_review_whatsapp_button: string;
  creator_review_copy_button: string;
  creator_review_copied: string;
  creator_review_preview_button: string;
  creator_review_edit_button: string;
  creator_review_reset_button: string;

  // Activities
  activity_coffee: string;
  activity_coffee_subtitle: string;
  activity_drinks: string;
  activity_drinks_subtitle: string;
  activity_restaurant: string;
  activity_restaurant_subtitle: string;
  activity_sunset_walk: string;
  activity_sunset_walk_subtitle: string;
  activity_movie: string;
  activity_movie_subtitle: string;
  activity_competitive: string;
  activity_competitive_subtitle: string;
  activity_creative: string;
  activity_creative_subtitle: string;
  activity_surprise_me: string;
  activity_surprise_me_subtitle: string;

  // Recipient flow
  recipient_title: string;
  recipient_invitation_from: string;
  recipient_intro_section: string;
  recipient_activities_section: string;
  recipient_when_section: string;
  recipient_contact_section: string;
  recipient_no_slots_message: string;

  // Recipient Screen 1: Arrival
  recipient_arrival_for: string;
  recipient_arrival_from: string;
  recipient_arrival_open_button: string;
  recipient_cruise_destination: string;
  recipient_cruise_duration: string;
  recipient_cruise_fun_probability: string;
  recipient_mission_classification: string;
  recipient_mission_risk: string;
  recipient_mission_success_rate: string;

  // Recipient Screen 2: Intro Cards
  recipient_cards_eyebrow: string;
  recipient_cards_title: string;
  recipient_cards_subtitle: string;
  recipient_cards_continue: string;
  recipient_cards_fallback_prompt: string;

  // Recipient Screen 3: Main Question
  recipient_question_title: string;
  recipient_question_subtitle: string;
  recipient_question_yes: string;
  recipient_question_no: string;
  recipient_question_maybe_later: string;
  recipient_question_no_escape_1: string;
  recipient_question_no_escape_2: string;
  recipient_question_no_escape_3: string;
  recipient_question_no_escape_4: string;
  recipient_question_no_escape_5: string;
  recipient_question_no_escape_6: string;
  recipient_question_decline_serious: string;
  recipient_question_notification: string;
  // Recipient Screen 4: Activity Choice
  recipient_activity_title: string;
  recipient_activity_subtitle: string;
  recipient_activity_choose_one: string;

  // Recipient Screen 5: Slot Choice
  recipient_slot_title: string;
  recipient_slot_subtitle: string;
  recipient_slot_coordinate_whatsapp: string;
  recipient_slot_choose_one: string;

  // Recipient Screen 6: Confirmation
  recipient_confirmation_title: string;
  recipient_confirmation_subtitle: string;
  recipient_confirmation_activity: string;
  recipient_confirmation_when: string;
  recipient_confirmation_coordinate: string;
  recipient_confirmation_score_disclaimer: string;
  recipient_confirmation_whatsapp_send: string;
  recipient_confirmation_copy: string;
  recipient_confirmation_copied: string;
  recipient_confirmation_share: string;
  recipient_confirmation_no_whatsapp_message: string;
  recipient_confirmation_create_own: string;

  // Decline screen
  recipient_decline_title: string;
  recipient_decline_subtitle: string;
  recipient_decline_notification: string;

  // Invalid link
  invalid_link_title: string;
  invalid_link_message: string;
  invalid_link_button: string;
  invalid_link_explanation: string;

  // Common actions
  back: string;
  next: string;
  cancel: string;
  confirm: string;
  skip: string;
  optional: string;
  continue: string;
  done: string;
  close: string;

  // Common messages
  loading: string;
  error_generic: string;
  error_network: string;
  success: string;
}

export type TranslationKey = keyof TranslationDictionary;

export type Translations = Record<Language, TranslationDictionary>;
