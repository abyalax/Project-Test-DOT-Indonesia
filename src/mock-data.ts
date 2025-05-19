export const mockReponse = {
  response_code: 0,
  results: [
    {
      type: "multiple",
      difficulty: "medium",
      category: "Animals",
      question: "Which of the following is true when alligators are behaving territorially?",
      correct_answer: "They bellow while showing their tail and neck",
      incorrect_answers: [
        "Open their jaws while making a clicking noise",
        "They run full force at the threat",
        "Slap their tails on the ground"
      ]
    },
    {
      type: "multiple",
      difficulty: "hard",
      category: "Entertainment: Books",
      question: "Which classic horror character killed Elizabeth Lavenza?",
      correct_answer: "Frankenstein's Monster",
      incorrect_answers: [
        "Count Dracula",
        "Werewolf",
        "The Creature from the Black Lagoon"
      ]
    },
    {
      type: "multiple",
      difficulty: "medium",
      category: "Mythology",
      question: "Hel was the daughter of which Norse Mythological figure?",
      correct_answer: "Loki",
      incorrect_answers: [
        "Thor",
        "Odin",
        "Balder"
      ]
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Animals",
      question: "How many legs do butterflies have?",
      correct_answer: "6",
      incorrect_answers: [
        "2",
        "4",
        "0"
      ]
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Entertainment: Television",
      question: "In DuckTales, what is the name of the city where all the main characters live?",
      correct_answer: "Duckburg",
      incorrect_answers: [
        "Duckwing",
        "Tailspin",
        "Wingford"
      ]
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Entertainment: Film",
      question: "7-Eleven stores were temporarily converted into Kwik E-marts to promote the release of what movie?",
      correct_answer: "The Simpsons Movie",
      incorrect_answers: [
        "Spider-Man 3",
        "Shrek the Third",
        "Ratatouille"
      ]
    },
    {
      type: "multiple",
      difficulty: "medium",
      category: "Science & Nature",
      question: "Deuterium is an isotope of which element?",
      correct_answer: "Hydrogen",
      incorrect_answers: [
        "Nitrogen",
        "Helium",
        "Neon"
      ]
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Vehicles",
      question: "What country was the Trabant 601 manufactured in?",
      correct_answer: "East Germany",
      incorrect_answers: [
        "Soviet Union",
        "Hungary",
        "France"
      ]
    },
    {
      type: "boolean",
      difficulty: "easy",
      category: "Entertainment: Japanese Anime & Manga",
      question: 'In the "Melancholy of Haruhi Suzumiya" series, the narrator goes by the nickname Kyon.',
      correct_answer: "True",
      incorrect_answers: [
        "False"
      ]
    },
    {
      type: "boolean",
      difficulty: "hard",
      category: "Science & Nature",
      question: "The value of one Calorie is different than the value of one calorie.",
      correct_answer: "True",
      incorrect_answers: [
        "False"
      ]
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Entertainment: Video Games",
      question: "What was the name of the cancelled sequel of Team Fortress?",
      correct_answer: "Team Fortress 2: Brotherhood of Arms",
      incorrect_answers: [
        "Team Fortress 2: Desert Mercenaries",
        "Team Fortress 2: Operation Gear Grinder",
        "Team Fortress 2: Return to Classic"
      ]
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Entertainment: Video Games",
      question: "Who is able to grab the survivors with his tongue in Left 4 Dead?",
      correct_answer: "Smoker",
      incorrect_answers: [
        "Jockey",
        "Hunter",
        "Boomer"
      ]
    }
  ]
}

interface MockReview {
  image?: string
  name: string
  email: string
  time: string
  review: string
}

export const mockReview: MockReview[] = [
  {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    name: "John Doe",
    email: "johndoe@gmail.com",
    time: "2 days ago",
    review: "At first I thought it was just another trivia site, but the experience is way better than I expected. Great questions, quick interface, and just the right amount of challenge."
  },
  {
    image: "https://images.unsplash.com/photo-1603415526960-f9e41872b3c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    name: "Maria Gonzalez",
    email: "mariagonzalez@gmail.com",
    time: "1 week ago",
    review: "This quiz is my go-to whenever I need a quick mental refresh. It’s surprisingly fun and makes learning feel effortless."
  },
  {
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    name: "Alex Tan",
    email: "alextan@gmail.com",
    time: "3 hours ago",
    review: "I love the variety of questions—it never gets boring! It really feels like a mini brain workout that I actually enjoy."
  },
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    name: "Sophie Laurent",
    email: "sophielaurent@gmail.com",
    time: "5 days ago",
    review: "Such a clean and smooth experience. The quiz loads fast, looks great, and actually challenges you in a fun way."
  },
  {
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80",
    name: "Daniel Kim",
    email: "danielkim@gmail.com",
    time: "Yesterday",
    review: "I shared this with my friends and now we’re all competing for high scores. It’s turned into a daily ritual for us!"
  }
]
