/** setter sur un cookie en particulier
 * 
 * @param { cookie que l'on veut créer/mettre à jour sa valeur} cname 
 * @param {valeur à affecter au cookie} cvalue 
 * 
 * le "path=/;" sert à ce que les cookies soient accessible sur toutes les pages
 */
function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";path=/;";
}

  /** fonction de réinitialisation d'un cookie
  * 
  * @param { cookie à reinitialiser} cname 
  */
function reset(cname) {
  document.cookie = cname +"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

  /** fonction qui sert à concatener une nouvelle valeur à un cookie, les valeurs sont séparées par des slash
  * 
  * @param {nom du cookie donc on veut ajouter une valeur} cname 
  * @param {valeur à concatener} concatValue 
  * 
  *  exemple: 
  *      document.cookie = "scoreQCM=5";
  *      concatCookie("scoreQCM",7);
  *      document.cookie  == "scoreQCM=5/7"
  */
function concatCookie(cname,concatValue){
  var nouvelleValeur = document.cookie.split('; ').find(row => row.startsWith(cname)).split('=')[1];
  nouvelleValeur += "/" + concatValue;
  reset(cname);
  setCookie(cname,nouvelleValeur);
}

  /** tester l'existence d'un cookie
  * 
  * @param {nom du cookie} cname 
  */
function testExistence(cname){
  return (document.cookie.split(';').some((item) => item.trim().startsWith(cname +'=')));
}

  /** enregistrer le resultat d'un jeu
  * 
  * @param {nom du cookie} cname 
  * @param {valeur du cookie} cvalue 
  */
function enregistrerResultat(cname,cvalue){
  if(!testExistence(cname))
      setCookie(cname,cvalue);
  else
      concatCookie(cname,cvalue);
}

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
  new Question("Quelle est l'orthographe exacte ?", ["acétylsalycilique", "acétilsalicylique", "acétilsalycilique", "acétylsalicylique"], "acétylsalicylique"),
  new Question("Qu'est-ce qu'un lagopède ?", ["un rongeur","un oiseau", "un batracien", "un insecte"], "un oiseau"),
  new Question("Complétez la phrase : Je voulais que tu lui __ bonjour avant de prendre ton repas.", ["aies dit","dises", "eusses dit", "disasses"], "eusses dit"),
  new Question("Comment s'écrit le nombre 894 ?", ["Huit cent quatre-vingt-quatorze","Huit cents quatre-vingt-quatorze", "Huit cent quatre-vingt quatorze", "Huit cents quatre-vingt quatorze"], "Trois cent soixante-seize mille huit cent quatre-vingt-quatorze")
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
     /* enregistement du score utilisateur */
    enregistrerResultat("scoreQCM",quiz.score);
    endQuizHTML = `
      <h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
      <a href ="../index.html"> Retour à la page d'accueil </p>`;
    this.elementShown("fin", endQuizHTML);
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