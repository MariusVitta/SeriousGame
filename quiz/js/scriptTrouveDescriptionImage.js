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
    new Question("<img src='../img/image1.jpg' /><br/> Selectionne la phrase  qui décrit images 1 ", ["La femme est en train de cuisiner.", "Le chef est en train de hacher du persil.", " Le chef est en train de cuisiner avec le persil.","La femme Le chef est en train de hacher du persil. "],"Le chef est en train de hacher du persil." ),
    new Question("<img src='../img/image2.jpg' /><br/> Selectionne la phrase qui décrit images 2", ["La femme salue son bosse ","La femme salue son collègue ", "La femme salue son mari ", "Deux collègue se rencontre"], "Deux collègue se rencontre"),
    new Question("<img src='../img/image3.jpg' /><br/> Selectionne  la phrase qui décrit images 3", ["Des jeunes sont  en train de reviser","Cest une reunion de travail","Une  famille est réunie "," Des jeune sont dans une a une conférence "], "Une reunion de travail"),

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
