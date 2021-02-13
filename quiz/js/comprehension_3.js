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
    new Question("On peut dire qu’il y a eu deux forts mouvements littéraires nationalistes au Brésil. Le premier a été le Romantisme et le deuxième, le Modernisme. Les deux ont eu, pour œuvre principale, des histoires indigènes : pour la première , Iracema et pour la seconde Macunaíma.<br>En 1929, pendant le mouvement Moderniste brésilien, la littérature a vu naître une œuvre qui a réuni des légendes, des superstitions, des proverbes et des modes de langage tissés ensemble pour esquisser un tableau du Brésil et du Brésilien. Écrite par Mário de Andrade, Macunaíma, est aussi une vive critique contre l’immoralité nationale en mettant en scène un personnage qui accumule des défauts symboles de la culture nationale. Néanmoins, il n’a pas que des défaillances de caractère, il est porteur également de vertus. Avec sa phrase la plus célèbre « Ah, quelle paresse ! », voici donc l'anti héros Macunaíma. L'oeuvre a été qualifiée par son auteur de rhapsodie,comme en musique, étant donné qu'elle présente une remarquable variété de motifs populaires. Ainsi, elle se rapproche de la geste de l’épopée médiévale dont les héros, comme ceux de Rabelais, sont en quelque sorte surhumains. En tant que représentant du multiculturalisme Macunaíma est né indien, mais il est noir puis devient blanc et ses yeux sont bleus. Ainsi, son âme n’a pas qu’une origine : elle est un mélange.<br>En 1970 Joaquim Pedro de Andrade a adapté au cinéma ce chef-d’œuvre de Mário de Andrade. Le film renouvelle l'esthétique du Cinéma Novo en mélangeant la parodie des 'chanchadas' (comédies populaires des années 1950) et l'expérimentation de l'avant-garde tropicaliste (parodie à son tour du kitsch et de l'optical art). <br>'Le héros sans aucun caractère', ANDRADE, Mário de. Macunaíma</br><br><br>  Selon le texte le Brésil est un pays culturellement", ["Très riche", "Moyen", "Pauvre","On ne peut pas savoir"],"Très riche" ),
    new Question("On peut dire qu’il y a eu deux forts mouvements littéraires nationalistes au Brésil. Le premier a été le Romantisme et le deuxième, le Modernisme. Les deux ont eu, pour œuvre principale, des histoires indigènes : pour la première , Iracema et pour la seconde Macunaíma.<br>En 1929, pendant le mouvement Moderniste brésilien, la littérature a vu naître une œuvre qui a réuni des légendes, des superstitions, des proverbes et des modes de langage tissés ensemble pour esquisser un tableau du Brésil et du Brésilien. Écrite par Mário de Andrade, Macunaíma, est aussi une vive critique contre l’immoralité nationale en mettant en scène un personnage qui accumule des défauts symboles de la culture nationale. Néanmoins, il n’a pas que des défaillances de caractère, il est porteur également de vertus. Avec sa phrase la plus célèbre « Ah, quelle paresse ! », voici donc l'anti héros Macunaíma. L'oeuvre a été qualifiée par son auteur de rhapsodie,comme en musique, étant donné qu'elle présente une remarquable variété de motifs populaires. Ainsi, elle se rapproche de la geste de l’épopée médiévale dont les héros, comme ceux de Rabelais, sont en quelque sorte surhumains. En tant que représentant du multiculturalisme Macunaíma est né indien, mais il est noir puis devient blanc et ses yeux sont bleus. Ainsi, son âme n’a pas qu’une origine : elle est un mélange.<br>En 1970 Joaquim Pedro de Andrade a adapté au cinéma ce chef-d’œuvre de Mário de Andrade. Le film renouvelle l'esthétique du Cinéma Novo en mélangeant la parodie des 'chanchadas' (comédies populaires des années 1950) et l'expérimentation de l'avant-garde tropicaliste (parodie à son tour du kitsch et de l'optical art). <br>'Le héros sans aucun caractère', ANDRADE, Mário de. Macunaíma</br><br><br>  A quel parti politique appartient le Brésil ?", ["Capitalisme", "Libéralisme", "Nationalisme","On ne peut pas savoir"],"On ne peut pas savoir" ),
    new Question("On peut dire qu’il y a eu deux forts mouvements littéraires nationalistes au Brésil. Le premier a été le Romantisme et le deuxième, le Modernisme. Les deux ont eu, pour œuvre principale, des histoires indigènes : pour la première , Iracema et pour la seconde Macunaíma.<br>En 1929, pendant le mouvement Moderniste brésilien, la littérature a vu naître une œuvre qui a réuni des légendes, des superstitions, des proverbes et des modes de langage tissés ensemble pour esquisser un tableau du Brésil et du Brésilien. Écrite par Mário de Andrade, Macunaíma, est aussi une vive critique contre l’immoralité nationale en mettant en scène un personnage qui accumule des défauts symboles de la culture nationale. Néanmoins, il n’a pas que des défaillances de caractère, il est porteur également de vertus. Avec sa phrase la plus célèbre « Ah, quelle paresse ! », voici donc l'anti héros Macunaíma. L'oeuvre a été qualifiée par son auteur de rhapsodie,comme en musique, étant donné qu'elle présente une remarquable variété de motifs populaires. Ainsi, elle se rapproche de la geste de l’épopée médiévale dont les héros, comme ceux de Rabelais, sont en quelque sorte surhumains. En tant que représentant du multiculturalisme Macunaíma est né indien, mais il est noir puis devient blanc et ses yeux sont bleus. Ainsi, son âme n’a pas qu’une origine : elle est un mélange.<br>En 1970 Joaquim Pedro de Andrade a adapté au cinéma ce chef-d’œuvre de Mário de Andrade. Le film renouvelle l'esthétique du Cinéma Novo en mélangeant la parodie des 'chanchadas' (comédies populaires des années 1950) et l'expérimentation de l'avant-garde tropicaliste (parodie à son tour du kitsch et de l'optical art). <br>'Le héros sans aucun caractère', ANDRADE, Mário de. Macunaíma</br><br><br>  Pourquoi l'auteur a-t-il appelé son oeuvre une 'rhapsodie' ?", ["Parce qu'il était écrivain", "Parce qu'il était musicien", "Parce qu'il était fan de Queen","On ne peut pas savoir"],"On ne peut pas savoir" ),
    new Question("On peut dire qu’il y a eu deux forts mouvements littéraires nationalistes au Brésil. Le premier a été le Romantisme et le deuxième, le Modernisme. Les deux ont eu, pour œuvre principale, des histoires indigènes : pour la première , Iracema et pour la seconde Macunaíma.<br>En 1929, pendant le mouvement Moderniste brésilien, la littérature a vu naître une œuvre qui a réuni des légendes, des superstitions, des proverbes et des modes de langage tissés ensemble pour esquisser un tableau du Brésil et du Brésilien. Écrite par Mário de Andrade, Macunaíma, est aussi une vive critique contre l’immoralité nationale en mettant en scène un personnage qui accumule des défauts symboles de la culture nationale. Néanmoins, il n’a pas que des défaillances de caractère, il est porteur également de vertus. Avec sa phrase la plus célèbre « Ah, quelle paresse ! », voici donc l'anti héros Macunaíma. L'oeuvre a été qualifiée par son auteur de rhapsodie,comme en musique, étant donné qu'elle présente une remarquable variété de motifs populaires. Ainsi, elle se rapproche de la geste de l’épopée médiévale dont les héros, comme ceux de Rabelais, sont en quelque sorte surhumains. En tant que représentant du multiculturalisme Macunaíma est né indien, mais il est noir puis devient blanc et ses yeux sont bleus. Ainsi, son âme n’a pas qu’une origine : elle est un mélange.<br>En 1970 Joaquim Pedro de Andrade a adapté au cinéma ce chef-d’œuvre de Mário de Andrade. Le film renouvelle l'esthétique du Cinéma Novo en mélangeant la parodie des 'chanchadas' (comédies populaires des années 1950) et l'expérimentation de l'avant-garde tropicaliste (parodie à son tour du kitsch et de l'optical art). <br>'Le héros sans aucun caractère', ANDRADE, Mário de. Macunaíma</br><br><br>  Que peut-on dire de l'auteur ?", ["Il aime son pays", "Il aime sa famille", "Il aime travailler","Il aime voyager"],"Il aime travailler" )

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