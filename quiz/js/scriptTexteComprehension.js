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
    new Question("Je m'appelle Docteur Watson, et je suis un bon ami du célèbre détective Sherlock Holmes. L'année dernière, deux jours après Noël, je suis allé chez lui. Je voulais lui souhaiter Joyeux Noël. Quand je suis arrivé, je l'ai trouvé dans le salon. Il était près de la fenêtre avec des journaux à côté de lui. Il y avait un vieux chapeau sur une chaise près de lui, et il avait une loupe dans sa main.('Sherlock Holmes and The Blue Diamond')</br><br><br>  Le narrateur est ......  ", ["Moi", "Docteur Watson", " Sherlock Holme.","Il y pas du narrateur"],"Docteur Watson" ),
    new Question("Je m'appelle Docteur Watson, et je suis un bon ami du célèbre détective Sherlock Holmes. L'année dernière, deux jours après Noël, je suis allé chez lui. Je voulais lui souhaiter Joyeux Noël. Quand je suis arrivé, je l'ai trouvé dans le salon. Il était près de la fenêtre avec des journaux à côté de lui. Il y avait un vieux chapeau sur une chaise près de lui, et il avait une loupe dans sa main.('Sherlock Holmes and The Blue Diamond')<br><br><br/>  L'histoire se passe ......", ["Le jour de mon anniversaire "," Trois semaines aprés le nouvelle an  ", "Deux jour  après Noël ", "Trois semaines avant Noël " ], "Deux jour  après Noël"),

    new Question("Je m'appelle Docteur Watson, et je suis un bon ami du célèbre détective Sherlock Holmes. L'année dernière, deux jours après Noël, je suis allé chez lui. Je voulais lui souhaiter Joyeux Noël. Quand je suis arrivé, je l'ai trouvé dans le salon. Il était près de la fenêtre avec des journaux à côté de lui. Il y avait un vieux chapeau sur une chaise près de lui, et il avait une loupe dans sa main.('Sherlock Holmes and The Blue Diamond')<br><br><br/> Il avait .......  sur la chaise", ["Un nouveau chapeau "," Une loupe  ", "Un vieux chapeau ", "Un nouveau chapeau" ], "Un vieux chapeau"),
    new Question("Je m'appelle Docteur Watson, et je suis un bon ami du célèbre détective Sherlock Holmes. L'année dernière, deux jours après Noël, je suis allé chez lui. Je voulais lui souhaiter Joyeux Noël. Quand je suis arrivé, je l'ai trouvé dans le salon. Il était près de la fenêtre avec des journaux à côté de lui. Il y avait un vieux chapeau sur une chaise près de lui, et il avait une loupe dans sa main .('Sherlock Holmes and The Blue Diamond')</br> </br></br> Holmes est ...... ", ["Dans la chambre","Dans la salle de bain"," Dans le salon"," Dans la cuisine "], "dans le salon"),

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
