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
    id: "light-1",
    tone: "light",
    prompt: "In my free time I like to...",
    answers: [
      "reconsider decisions I made five minutes ago",
      "pretend I know what I'm doing",
      "argue with recipe instructions",
      "plan elaborate adventures I'll probably skip",
    ],
  },
  {
    id: "light-2",
    tone: "light",
    prompt: "My most unnecessary talent is...",
    answers: [
      "recognizing songs instantly and singing the lyrics incorrectly",
      "finding the one wobbly table in any restaurant",
      "forgetting names but remembering what people ordered",
      "overthinking simple decisions",
    ],
  },
  {
    id: "light-3",
    tone: "light",
    prompt: "A green flag about me...",
    answers: [
      "I laugh at my own jokes before finishing them",
      "I share food (sometimes)",
      "I'm extremely competitive about board games only",
      "I say thank you to ATMs",
    ],
  },
  {
    id: "light-4",
    tone: "light",
    prompt: "On this date you can expect...",
    answers: [
      "questionable dance moves if the right song plays",
      "at least three bad puns",
      "strong opinions about pizza toppings",
      "enthusiasm about things that don't matter",
    ],
  },
  {
    id: "light-5",
    tone: "light",
    prompt: "An important safety notice...",
    answers: [
      "excessive fun may lead to a second date",
      "I tell stories that go nowhere",
      "my sense of direction is decorative",
      "I might suggest getting dessert twice",
    ],
  },
  {
    id: "light-6",
    tone: "light",
    prompt: "My controversial opinion is...",
    answers: [
      "pineapple belongs on pizza (fight me)",
      "breakfast foods work at any time",
      "naps are underrated",
      "small talk is actually fine",
    ],
  },
  {
    id: "light-7",
    tone: "light",
    prompt: "My ideal evening includes...",
    answers: [
      "good food and zero plans",
      "laughing about nothing in particular",
      "staying out late accidentally",
      "deciding everything as we go",
    ],
  },
  {
    id: "light-8",
    tone: "light",
    prompt: "I can probably beat you at...",
    answers: [
      "forgetting why I walked into a room",
      "finding typos after hitting send",
      "overthinking everything",
      "convincing myself I don't need a jacket",
    ],
  },
  {
    id: "light-9",
    tone: "light",
    prompt: "Something you should know in advance...",
    answers: [
      "I get competitive about guessing movie endings",
      "I have strong opinions about coffee",
      "I might rearrange the restaurant table",
      "I collect fun facts no one asked for",
    ],
  },
  {
    id: "light-10",
    tone: "light",
    prompt: "My relationship with desserts is...",
    answers: [
      "complicated (I always want yours)",
      "I said I wasn't hungry but I changed my mind",
      "dessert stomach is a separate organ",
      "yes even if I'm full",
    ],
  },
  {
    id: "light-11",
    tone: "light",
    prompt: "The fastest way to make me happy is...",
    answers: [
      "surprise snacks",
      "a well-timed meme",
      "spontaneous plans that actually happen",
      "laughing at my mediocre jokes",
    ],
  },
  {
    id: "light-12",
    tone: "light",
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

  // ROMANTIC
  {
    id: "romantic-1",
    tone: "romantic",
    prompt: "What I value most...",
    answers: [
      "deep conversations that last until sunrise",
      "meaningful connections over casual ones",
      "someone who notices the small things",
      "genuine laughter and quiet moments",
    ],
  },
  {
    id: "romantic-2",
    tone: "romantic",
    prompt: "A perfect evening includes...",
    answers: [
      "good food, better company, and no rush to leave",
      "stargazing and talking about everything",
      "finding a quiet spot away from the noise",
      "creating memories worth remembering",
    ],
  },
  {
    id: "romantic-3",
    tone: "romantic",
    prompt: "I'm looking for someone who...",
    answers: [
      "appreciates the beauty in ordinary moments",
      "values quality time together",
      "can be both adventurous and thoughtful",
      "makes me want to be a better person",
    ],
  },
  {
    id: "romantic-4",
    tone: "romantic",
    prompt: "What excites me about this...",
    answers: [
      "the possibility of something real",
      "getting to know someone worth knowing",
      "seeing where genuine connection leads",
      "finding someone who just gets it",
    ],
  },
  {
    id: "romantic-5",
    tone: "romantic",
    prompt: "You'll know we click if...",
    answers: [
      "conversations feel effortless",
      "silence is comfortable, not awkward",
      "we lose track of time together",
      "everything just feels right",
    ],
  },
  {
    id: "romantic-6",
    tone: "romantic",
    prompt: "I believe in...",
    answers: [
      "taking chances on people who matter",
      "chemistry that's impossible to fake",
      "connections that feel meant to be",
      "love at second sight (first is too cliché)",
    ],
  },

  // BOLD
  {
    id: "bold-1",
    tone: "bold",
    prompt: "Fair warning...",
    answers: [
      "I say what I mean and mean what I say",
      "I'm not here to play games",
      "I know what I want",
      "I don't do boring dates",
    ],
  },
  {
    id: "bold-2",
    tone: "bold",
    prompt: "What you should know...",
    answers: [
      "I'm direct, sometimes too direct",
      "I value honesty over everything",
      "I take initiative",
      "I don't waste time on maybes",
    ],
  },
  {
    id: "bold-3",
    tone: "bold",
    prompt: "I'm attracted to...",
    answers: [
      "confidence without arrogance",
      "people who know their worth",
      "decisiveness and clarity",
      "someone who can match my energy",
    ],
  },
  {
    id: "bold-4",
    tone: "bold",
    prompt: "On this date...",
    answers: [
      "let's skip the small talk",
      "expect real conversations",
      "we're either clicking or we're not",
      "no pretending to be someone we're not",
    ],
  },
  {
    id: "bold-5",
    tone: "bold",
    prompt: "What sets me apart...",
    answers: [
      "I'm unapologetically myself",
      "I don't settle for comfortable",
      "I make decisions and stick to them",
      "I chase what I want",
    ],
  },
  {
    id: "bold-6",
    tone: "bold",
    prompt: "Looking for someone who...",
    answers: [
      "isn't afraid of intensity",
      "can handle honesty",
      "knows what they want too",
      "doesn't need validation from everyone",
    ],
  },

  // DRY
  {
    id: "dry-1",
    tone: "dry",
    prompt: "My sense of humor...",
    answers: [
      "exists, allegedly",
      "is an acquired taste (allegedly)",
      "requires a certain appreciation for deadpan",
      "has been described as 'interesting'",
    ],
  },
  {
    id: "dry-2",
    tone: "dry",
    prompt: "About me...",
    answers: [
      "I've been told I'm funny. I have my doubts.",
      "I promise to be moderately entertaining",
      "I'm either hilarious or unbearable. No middle ground.",
      "I excel at stating the obvious",
    ],
  },
  {
    id: "dry-3",
    tone: "dry",
    prompt: "A skill I have...",
    answers: [
      "making observations no one asked for",
      "finding the irony in everything",
      "delivering bad news with a straight face",
      "ruining moments with perfect timing",
    ],
  },
  {
    id: "dry-4",
    tone: "dry",
    prompt: "What to expect...",
    answers: [
      "sarcasm, but make it subtle",
      "commentary that may or may not land",
      "jokes delivered so dry they seem serious",
      "an impressive collection of raised eyebrows",
    ],
  },
  {
    id: "dry-5",
    tone: "dry",
    prompt: "Looking for someone who...",
    answers: [
      "can detect sarcasm without tone indicators",
      "appreciates understatement",
      "laughs at things that aren't traditionally funny",
      "gets it, or at least pretends to",
    ],
  },
  {
    id: "dry-6",
    tone: "dry",
    prompt: "I'm great at...",
    answers: [
      "making awkward situations more awkward",
      "delivering punchlines three days later",
      "communicating entirely through eyebrow movements",
      "pretending to be less funny than I am",
    ],
  },
];
