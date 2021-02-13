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
    new Question("Je m'appelle Docteur Watson, et je suis un bon ami du célèbre détective Sherlock Holmes. L'année dernière, deux jours après Noël, je suis allé chez lui. Je voulais lui souhaiter Joyeux Noël. Quand je suis arrivé, je l'ai trouvé dans le salon. Il était près de la fenêtre avec des journaux à côté de lui. Il y avait un vieux chapeau sur une chaise près de lui, et il avait une loupe dans sa main.('Sherlock Holmes and The Blue Diamond')</br><br><br>  Le narrateur est ......  ", ["Moi", "Docteur Watson", " Sherlock Holme.","Il y pas du narrateur"],"Docteur Watson" ),
    new Question("Je m'appelle Docteur Watson, et je suis un bon ami du célèbre détective Sherlock Holmes. L'année dernière, deux jours après Noël, je suis allé chez lui. Je voulais lui souhaiter Joyeux Noël. Quand je suis arrivé, je l'ai trouvé dans le salon. Il était près de la fenêtre avec des journaux à côté de lui. Il y avait un vieux chapeau sur une chaise près de lui, et il avait une loupe dans sa main.('Sherlock Holmes and The Blue Diamond')<br><br><br/>  L'histoire se passe ......", ["Le jour de mon anniversaire "," Trois semaines aprés le nouvelle an  ", "Deux jour  après Noël ", "Trois semaines avant Noël " ], "Deux jour  après Noël"),

    new Question("Je m'appelle Docteur Watson, et je suis un bon ami du célèbre détective Sherlock Holmes. L'année dernière, deux jours après Noël, je suis allé chez lui. Je voulais lui souhaiter Joyeux Noël. Quand je suis arrivé, je l'ai trouvé dans le salon. Il était près de la fenêtre avec des journaux à côté de lui. Il y avait un vieux chapeau sur une chaise près de lui, et il avait une loupe dans sa main.('Sherlock Holmes and The Blue Diamond')<br><br><br/> Il avait .......  sur la chaise", ["Un nouveau chapeau "," Une loupe  ", "Un vieux chapeau ", "Un nouveau chapeau" ], "Un vieux chapeau"),
    new Question("Je m'appelle Docteur Watson, et je suis un bon ami du célèbre détective Sherlock Holmes. L'année dernière, deux jours après Noël, je suis allé chez lui. Je voulais lui souhaiter Joyeux Noël. Quand je suis arrivé, je l'ai trouvé dans le salon. Il était près de la fenêtre avec des journaux à côté de lui. Il y avait un vieux chapeau sur une chaise près de lui, et il avait une loupe dans sa main .('Sherlock Holmes and The Blue Diamond')</br> </br></br> Holmes est ...... ", ["Dans la chambre","Dans la salle de bain"," Dans le salon"," Dans la cuisine "], "dans le salon"),

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
         /* enregistement du score utilisateur */
        enregistrerResultat("scoreComprehension",quiz.score);
        endQuizHTML = `
      <h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
      <a href ="../index.html"> Retour à la page d'accueil </p>`;
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