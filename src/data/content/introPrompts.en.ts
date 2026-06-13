import type { IntroTone } from "@/types";

export interface TonedIntroPrompt {
  id: string;
  tone: IntroTone;
  prompt: string;
  answers: string[];
}

export const INTRO_PROMPTS_EN: TonedIntroPrompt[] = [
  // PLAYFUL
  {
    id: "playful-1",
    tone: "playful",
    prompt: "In my free time I like to...",
    answers: [
      "reconsider decisions I made five minutes ago",
      "pretend I know what I'm doing",
      "argue with recipe instructions",
      "plan elaborate adventures I'll probably skip",
    ],
  },
  {
    id: "playful-2",
    tone: "playful",
    prompt: "My most unnecessary talent is...",
    answers: [
      "recognizing songs instantly and singing the lyrics incorrectly",
      "finding the one wobbly table in any restaurant",
      "forgetting names but remembering what people ordered",
      "overthinking simple decisions",
    ],
  },
  {
    id: "playful-3",
    tone: "playful",
    prompt: "A green flag about me...",
    answers: [
      "I laugh at my own jokes before finishing them",
      "I share food (sometimes)",
      "I'm extremely competitive about board games only",
      "I say thank you to ATMs",
    ],
  },
  {
    id: "playful-4",
    tone: "playful",
    prompt: "On this date you can expect...",
    answers: [
      "questionable dance moves if the right song plays",
      "at least three bad puns",
      "strong opinions about pizza toppings",
      "enthusiasm about things that don't matter",
    ],
  },
  {
    id: "playful-5",
    tone: "playful",
    prompt: "An important safety notice...",
    answers: [
      "excessive fun may lead to a second date",
      "I tell stories that go nowhere",
      "my sense of direction is decorative",
      "I might suggest getting dessert twice",
    ],
  },
  {
    id: "playful-6",
    tone: "playful",
    prompt: "My controversial opinion is...",
    answers: [
      "pineapple belongs on pizza (fight me)",
      "breakfast foods work at any time",
      "naps are underrated",
      "small talk is actually fine",
    ],
  },
  {
    id: "playful-7",
    tone: "playful",
    prompt: "My ideal evening includes...",
    answers: [
      "good food and zero plans",
      "laughing about nothing in particular",
      "staying out late accidentally",
      "deciding everything as we go",
    ],
  },
  {
    id: "playful-8",
    tone: "playful",
    prompt: "I can probably beat you at...",
    answers: [
      "forgetting why I walked into a room",
      "finding typos after hitting send",
      "overthinking everything",
      "convincing myself I don't need a jacket",
    ],
  },
  {
    id: "playful-9",
    tone: "playful",
    prompt: "Something you should know in advance...",
    answers: [
      "I get competitive about guessing movie endings",
      "I have strong opinions about coffee",
      "I might rearrange the restaurant table",
      "I collect fun facts no one asked for",
    ],
  },
  {
    id: "playful-10",
    tone: "playful",
    prompt: "My relationship with desserts is...",
    answers: [
      "complicated (I always want yours)",
      "I said I wasn't hungry but I changed my mind",
      "dessert stomach is a separate organ",
      "yes even if I'm full",
    ],
  },
  {
    id: "playful-11",
    tone: "playful",
    prompt: "The fastest way to make me happy is...",
    answers: [
      "surprise snacks",
      "a well-timed meme",
      "spontaneous plans that actually happen",
      "laughing at my mediocre jokes",
    ],
  },
  {
    id: "playful-12",
    tone: "playful",
    prompt: "My greatest weakness is...",
    answers: [
      "desserts I claimed I didn't want to order",
      "saying 'one more episode' at midnight",
      "starting new hobbies I won't finish",
      "buying books faster than I read them",
    ],
  },

  // FLIRTY
  {
    id: "flirty-1",
    tone: "flirty",
    prompt: "In my free time I like to...",
    answers: [
      "create excellent excuses to text interesting people",
      "practice my charming smile in the mirror",
      "curate playlists for moments like this",
      "daydream about spontaneous adventures",
    ],
  },
  {
    id: "flirty-2",
    tone: "flirty",
    prompt: "My most unnecessary talent is...",
    answers: [
      "making ordinary moments feel special",
      "finding reasons to stay out just a bit longer",
      "remembering small details about you",
      "suggesting the perfect second location",
    ],
  },
  {
    id: "flirty-3",
    tone: "flirty",
    prompt: "A green flag about me...",
    answers: [
      "I plan dates that don't feel like interviews",
      "I'm genuinely curious about you",
      "I know how to build anticipation",
      "I'm comfortable with comfortable silences",
    ],
  },
  {
    id: "flirty-4",
    tone: "flirty",
    prompt: "On this date you can expect...",
    answers: [
      "eye contact that lingers just right",
      "genuine compliments at unexpected moments",
      "me to suggest we skip the group chat",
      "conversation that flows easily",
    ],
  },
  {
    id: "flirty-5",
    tone: "flirty",
    prompt: "An important safety notice...",
    answers: [
      "this might become your new favorite evening",
      "curfews may be accidentally ignored",
      "you might catch me looking at you",
      "plans tend to extend themselves around me",
    ],
  },
  {
    id: "flirty-6",
    tone: "flirty",
    prompt: "My controversial opinion is...",
    answers: [
      "the best dates don't follow a script",
      "chemistry matters more than the location",
      "a little mystery goes a long way",
      "good conversation beats good coffee",
    ],
  },
  {
    id: "flirty-7",
    tone: "flirty",
    prompt: "My ideal evening includes...",
    answers: [
      "getting lost in conversation",
      "somewhere we can actually hear each other",
      "moments that feel like a movie scene",
      "losing track of time completely",
    ],
  },
  {
    id: "flirty-8",
    tone: "flirty",
    prompt: "I can probably beat you at...",
    answers: [
      "making you forget we just met",
      "finding the most romantic spot in any place",
      "keeping you guessing what happens next",
      "suggesting the perfect song for this moment",
    ],
  },
  {
    id: "flirty-9",
    tone: "flirty",
    prompt: "Something you should know in advance...",
    answers: [
      "I take 'getting to know you' seriously",
      "I'm good at reading between the lines",
      "I might steal a bite of your dessert",
      "I notice when you smile at my texts",
    ],
  },
  {
    id: "flirty-10",
    tone: "flirty",
    prompt: "My relationship with desserts is...",
    answers: [
      "sharing is caring (and kind of romantic)",
      "I order it hoping you'll want a taste",
      "the second-best part of a date",
      "a good excuse to sit closer",
    ],
  },
  {
    id: "flirty-11",
    tone: "flirty",
    prompt: "The fastest way to make me happy is...",
    answers: [
      "laugh at my attempts to be smooth",
      "suggest staying a little longer",
      "text me first sometimes",
      "be genuinely yourself",
    ],
  },
  {
    id: "flirty-12",
    tone: "flirty",
    prompt: "My greatest weakness is...",
    answers: [
      "a well-timed smile",
      "someone who challenges me intellectually",
      "making plans I'm actually excited about",
      "good banter that goes somewhere",
    ],
  },

  // ABSURD
  {
    id: "absurd-1",
    tone: "absurd",
    prompt: "In my free time I like to...",
    answers: [
      "rank cheeses by their potential as stress balls",
      "practice explaining memes to imaginary grandparents",
      "convince plants I'm a good person",
      "debate whether a hotdog is a sandwich (it is)",
    ],
  },
  {
    id: "absurd-2",
    tone: "absurd",
    prompt: "My most unnecessary talent is...",
    answers: [
      "identifying birds by their level of judgment",
      "making animal sounds that confuse actual animals",
      "remembering ad jingles from 2003",
      "walking into rooms and forgetting my entire existence",
    ],
  },
  {
    id: "absurd-3",
    tone: "absurd",
    prompt: "A green flag about me...",
    answers: [
      "I've never been banned from a library",
      "my houseplants are only mostly dead",
      "I believe in the power of afternoon naps",
      "I once won a staring contest with a cat",
    ],
  },
  {
    id: "absurd-4",
    tone: "absurd",
    prompt: "On this date you can expect...",
    answers: [
      "unsolicited fun facts about spoons",
      "me questioning why fish don't have arms",
      "elaborate theories about pigeons",
      "at least one weird sound effect",
    ],
  },
  {
    id: "absurd-5",
    tone: "absurd",
    prompt: "An important safety notice...",
    answers: [
      "I might suggest befriending local wildlife",
      "my jokes require no understanding of humor",
      "I name inanimate objects without warning",
      "side effects include confusion and laughter",
    ],
  },
  {
    id: "absurd-6",
    tone: "absurd",
    prompt: "My controversial opinion is...",
    answers: [
      "soup is just wet food and that's okay",
      "socks are optional and often overrated",
      "the moon is suspicious",
      "breakfast is a social construct",
    ],
  },
  {
    id: "absurd-7",
    tone: "absurd",
    prompt: "My ideal evening includes...",
    answers: [
      "philosophical debates about cartoon logic",
      "inventing backstories for strangers",
      "ranking things that don't need ranking",
      "getting unreasonably invested in board games",
    ],
  },
  {
    id: "absurd-8",
    tone: "absurd",
    prompt: "I can probably beat you at...",
    answers: [
      "making up fake definitions for real words",
      "forgetting the entire plot while watching movies",
      "starting sentences without knowing how they end",
      "losing things I'm currently holding",
    ],
  },
  {
    id: "absurd-9",
    tone: "absurd",
    prompt: "Something you should know in advance...",
    answers: [
      "I have strong opinions about cloud shapes",
      "I apologize to furniture when I bump into it",
      "I believe pigeons are judging us",
      "I narrate my life in different accents",
    ],
  },
  {
    id: "absurd-10",
    tone: "absurd",
    prompt: "My relationship with desserts is...",
    answers: [
      "they're small friends you can eat",
      "spiritually, I am a chocolate cake",
      "I respect them from a professional distance",
      "complicated but delicious",
    ],
  },
  {
    id: "absurd-11",
    tone: "absurd",
    prompt: "The fastest way to make me happy is...",
    answers: [
      "show me a picture of a weird-looking fish",
      "agree that birds are weird dinosaurs",
      "send me unhinged memes at 3am",
      "appreciate my questionable taste in humor",
    ],
  },
  {
    id: "absurd-12",
    tone: "absurd",
    prompt: "My greatest weakness is...",
    answers: [
      "getting emotionally attached to background characters",
      "buying things because they have cute packaging",
      "refusing to accept that I need a jacket",
      "starting projects at midnight",
    ],
  },
];
