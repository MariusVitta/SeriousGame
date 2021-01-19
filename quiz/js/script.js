class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}
let questions = [
  new Question("Quelle est l'orthographe exacte ?", ["satelite", "sattelite", "satellite", "sattellite"], "satellite"),
  new Question("Complétez avec la bonne conjugaison : La souris est mang__ par le chat.", ["manger","mangée", "mangé", "mangés"], "mangée"),
  new Question("Quel est le synonyme de subtiliser ?", ["voler","remplacer", "réparer", "fabriquer"], "voler"),
  new Question("Qu'est-ce qu'un ornithorynque ?", ["un reptile","un oiseau", "un poisson", "un mammifère"], "un mammifère")
  new Question("Cherchez l'intrus.", ["fourmi", "cigale", "araignée", "sauterelle"], "araignée"),
  new Question("Combien de lettres contient le mot le plus long en français ?", ["21","23", "25", "27"], "25"),
  new Question("Quelle est l'erreur dans cette phrase : Maître corbeau sur un arbre perché tenais en son bec un fromage.", ["corbeauX","tenaiT", "perchER", "sonT"], "tenaiT"),
  new Question("Lequel de ces mots est un palindrome ?", ["rêver","oiseau", "Laval", "radar"], "radar")
];

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

const display = {
  elementShown: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuiz: function() {
    endQuizHTML = `
      <h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
      <a href ="index.html"> Retour à la page d'accueil </p>`;
    this.elementShown("quiz", endQuizHTML);
  },
  question: function() {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function() {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function() {
        quiz.guess(guess);
        quizApp();
      }
    }
    // affichage choix + prise en compte du choix
    for(let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function() {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
  },
};

// Game logic
quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choices();
    display.progress();
  } 
}
// Create Quiz
let quiz = new Quiz(questions);
quizApp();
