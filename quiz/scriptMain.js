class TypeQuiz {
  constructor(text) {
    this.text = text;
    this.currentQuestionIndex = 0;
  }
 
  getCurrentQuestion() {
    return this.text[this.currentQuestionIndex++];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
}

let questions = [
  new TypeQuiz("jeu de calcul"),
  new TypeQuiz("QCM"),
  new TypeQuiz("1 image/ 5 mots")
  new TypeQuiz("texte à trou")
];

const display = {
  elementShown: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  
  choices: function() {
    let choices = quiz.getCurrentQuestion();

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
};
  // Create Quiz
let quiz = new TypeQuiz(questions);
display.choices();
