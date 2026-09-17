(function () {
  const questions = [
    new window.QuizCore.Question("Quelle est l'orthographe exacte ?", ["satelite", "sattelite", "satellite", "sattellite"], "satellite"),
    new window.QuizCore.Question("Quel est le synonyme de subtiliser ?", ["voler", "remplacer", "réparer", "fabriquer"], "voler"),
    new window.QuizCore.Question("Qu'est-ce qu'un ornithorynque ?", ["un reptile", "un oiseau", "un poisson", "un mammifère"], "un mammifère"),
    new window.QuizCore.Question("Combien de lettres contient le mot le plus long en français ?", ["21", "23", "25", "27"], "25")
  ];

  window.QuizCore.createQuizPage({
    questions,
    rootId: 'quiz',
    resultCookieName: 'scoreQCM',
    finalView: (currentQuiz) => `
      <h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${currentQuiz.score} / ${currentQuiz.questions.length}</h3>
      <a href="../index.html"> Retour à la page d'accueil </a>
    `,
  });
}());