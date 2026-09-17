(function () {
  const questions = [
    new window.QuizCore.Question("Je m'appelle Docteur Watson, et je suis un bon ami du célèbre détective Sherlock Holmes. L'année dernière, deux jours après Noël, je suis allé chez lui. Je voulais lui souhaiter Joyeux Noël. Quand je suis arrivé, je l'ai trouvé dans le salon. Il était près de la fenêtre avec des journaux à côté de lui. Il y avait un vieux chapeau sur une chaise près de lui, et il avait une loupe dans sa main.('Sherlock Holmes and The Blue Diamond')</br><br><br> Le narrateur est ......", ["Moi", "Docteur Watson", "Sherlock Holmes", "Il n'y a pas de narrateur"], "Docteur Watson"),
    new window.QuizCore.Question("Je m'appelle Docteur Watson, et je suis un bon ami du célèbre détective Sherlock Holmes. L'année dernière, deux jours après Noël, je suis allé chez lui. Je voulais lui souhaiter Joyeux Noël. Quand je suis arrivé, je l'ai trouvé dans le salon. Il était près de la fenêtre avec des journaux à côté de lui. Il y avait un vieux chapeau sur une chaise près de lui, et il avait une loupe dans sa main.('Sherlock Holmes and The Blue Diamond')<br><br><br/> L'histoire se passe ......", ["Le jour de mon anniversaire", "Trois semaines après le Nouvel An", "Deux jours après Noël", "Trois semaines avant Noël"], "Deux jours après Noël"),
    new window.QuizCore.Question("Je m'appelle Docteur Watson, et je suis un bon ami du célèbre détective Sherlock Holmes. L'année dernière, deux jours après Noël, je suis allé chez lui. Je voulais lui souhaiter Joyeux Noël. Quand je suis arrivé, je l'ai trouvé dans le salon. Il était près de la fenêtre avec des journaux à côté de lui. Il y avait un vieux chapeau sur une chaise près de lui, et il avait une loupe dans sa main.('Sherlock Holmes and The Blue Diamond')<br><br><br/> Il avait ....... sur la chaise", ["Un nouveau chapeau", "Une loupe", "Un vieux chapeau", "Un nouveau chapeau"], "Un vieux chapeau"),
    new window.QuizCore.Question("Je m'appelle Docteur Watson, et je suis un bon ami du célèbre détective Sherlock Holmes. L'année dernière, deux jours après Noël, je suis allé chez lui. Je voulais lui souhaiter Joyeux Noël. Quand je suis arrivé, je l'ai trouvé dans le salon. Il était près de la fenêtre avec des journaux à côté de lui. Il y avait un vieux chapeau sur une chaise près de lui, et il avait une loupe dans sa main.('Sherlock Holmes and The Blue Diamond')</br> </br></br> Holmes est ......", ["Dans la chambre", "Dans la salle de bain", "Dans le salon", "Dans la cuisine"], "Dans le salon"),
  ];

  window.QuizCore.createQuizPage({
    questions,
    rootId: 'quiz',
    resultCookieName: 'scoreComprehension',
    finalView: (currentQuiz) => `
      <h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${currentQuiz.score} / ${currentQuiz.questions.length}</h3>
      <a href="../index.html"> Retour à la page d'accueil </a>
    `,
  });
}());
