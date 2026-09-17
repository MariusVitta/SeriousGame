(function () {
  const questions = [
    new window.QuizCore.Question("VOS DÉPLACEMENTS PRENNENT DE PLUS EN PLUS DE TEMPS DANS VOTRE ACTIVITÉ, VOUS VOUS DITES  ?", ["C’est normal, il faut bien se rendre chez les personnes que l’on aide", "Je vais diminuer ma pause déjeuner, je gagnerai du temps", "Je vais voir avec mon employeur comment mieux organiser mes déplacements"], "Je vais voir avec mon employeur comment mieux organiser mes déplacements", "Inexact Mon activité est organisée en lien avec mon ou mes employeur(s) pour des déplacements en sécurité : planification de mes déplacements, de mes horaires, de ma pause déjeuner."),
    new window.QuizCore.Question("COMMENT PROCÉDEZ-VOUS POUR DÉPOUSSIÉRER LES SOLS ?", ["Je dépoussière les sols du fond de la pièce vers l’entrée avec un balai humide", "J’utilise un balai avec une pelle", "J’utilise une serviette de bain humide avec une bassine"], "Je dépoussière les sols du fond de la pièce vers l’entrée avec un balai humide"),
    new window.QuizCore.Question("AVANT DE COMMENCER VOTRE TRAVAIL, QUE FAITES-VOUS AU NIVEAU DE VOTRE TENUE VESTIMENTAIRE ?", ["J’adopte une tenue adaptée à mon travail", "Je vérifie que mes vêtements de ville ne sont pas sales", "Rien de particulier, je ne me change pas pour travailler"], "J’adopte une tenue adaptée à mon travail"),
    new window.QuizCore.Question("LA PERSONNE CHEZ QUI VOUS INTERVENEZ FUME EN VOTRE PRÉSENCE ET CELA VOUS GÊNE, QUE POUVEZ-VOUS FAIRE ?", ["J’ouvre la fenêtre pour aérer la pièce avant et pendant mon intervention.", "Je travaille vite pour respirer le moins de fumée possible", "Je ne fais rien, je supporte la fumée"], "J’ouvre la fenêtre pour aérer la pièce avant et pendant mon intervention."),
    new window.QuizCore.Question("VOUS ACCOMPAGNEZ À TABLE UNE PERSONNE QUI A DES DIFFICULTÉS POUR SE DÉPLACER DANS UNE PIÈCE ENCOMBRÉE, QUE FAITES-VOUS ?", ["Je l’aide comme je peux à contourner les obstacles qui gênent la circulation", "J’organise la pièce au mieux pour faciliter l’accès à la table", "Rien de particulier, je la laisse se déplacer seule et je lui propose de porter un casque"], "J’organise la pièce au mieux pour faciliter l’accès à la table"),
    new window.QuizCore.Question("VOUS UTILISEZ DES OBJETS TRANCHANTS ET COUPANTS, QUE VÉRIFIEZ-VOUS AU NIVEAU DE VOS VACCINATIONS ?", ["Je vérifie que je suis à jour de mes vaccinations contre la grippe et la tuberculose", "Je vérifie que je suis à jour de mes vaccinations contre le tétanos et l’hépatite B", "Je vérifie que je suis à jour de mes vaccinations contre la fièvre jaune et le paludisme"], "Je vérifie que je suis à jour de mes vaccinations contre le tétanos et l’hépatite B"),
    new window.QuizCore.Question("VOUS RÉCHAUFFEZ LE REPAS AU MICRO-ONDE, COMMENT VOUS ORGANISEZ-VOUS ?", ["J’utilise des plats et des assiettes adaptés à ce mode de cuisson", "Je fais chauffer le repas dans un récipient en métal", "Je fais chauffer le repas plus longtemps que le temps recommandé pour être sûr qu’il soit bien chaud"], "J’utilise des plats et des assiettes adaptés à ce mode de cuisson"),
    new window.QuizCore.Question("VOUS CUISINEZ DANS UNE PIÈCE ENCOMBRÉE, COMMENT VOUS ORGANISEZ-VOUS ?", ["Je mets de la musique pour éviter d’y penser", "J’enjambe les obstacles qui gênent ma circulation dans la cuisine", "Je limite mes déplacements et je choisis un plan de travail, par exemple la table de cuisine que je vais désencombrer avant de cuisiner"], "Je limite mes déplacements et je choisis un plan de travail, par exemple la table de cuisine que je vais désencombrer avant de cuisiner"),
    new window.QuizCore.Question("LA PERSONNE QUE VOUS AIDEZ VOUS DEMANDE D’UTILISER UN ASPIRATEUR DONT LE FIL EST DÉNUDÉ, QUE FAITES-VOUS ?", ["Je le répare avec un rouleau de scotch", "Je ne l’utilise pas", "Rien de particulier, je fais mon travail"], "Je ne l’utilise pas"),
    new window.QuizCore.Question("VOUS AIDEZ UNE PERSONNE À S’HABILLER ET À SE CHAUSSER, COMMENT VOUS ORGANISEZ-VOUS ?", ["Je prépare les vêtements et chaussures à l’avance que je pose près de la personne", "Je lui demande ce qu’elle veut porter et je vais chercher les affaires au fur et à mesure", "Je lui demande si elle ne préfère pas rester en pyjama aujourd’hui et lire un bon bouquin"], "Je prépare les vêtements et chaussures à l’avance que je pose près de la personne"),
    new window.QuizCore.Question("VOUS ÊTES AU CONTACT DE LINGE SALE ET DE PROTECTIONS SOUILLÉES, COMMENT VOUS PROTÉGEZ-VOUS ?", ["Je fais attention à ne pas me sali", "Je porte une blouse et des gants", "Je porte des vêtements de ville que je peux nettoyer facilement"], "Je porte une blouse et des gants"),
    new window.QuizCore.Question("POUR FAIRE LE MÉNAGE, VOUS PORTEZ ?", ["Une blouse et des gants de ménage à manchettes", "Un petit tablier pour protéger mes vêtements", "Rien de particulier, je travaille en tenue de ville"], "Une blouse et des gants de ménage à manchettes"),
    new window.QuizCore.Question("LA SALLE DE BAIN EST ENCOMBRÉE, VOUS RISQUEZ DE TOMBER, QUE POUVEZ-VOUS FAIRE ?", ["Je pousse tout ce qui gêne mes déplacements et j’ôte les petits tapis pour éviter de tomber", "Je fais quelques mouvements d’assouplissement pour me préparer à enjamber les obstacles", "Je porte des vêtements confortables et larges qui ne seront pas déchirés en cas de chute"], "Je pousse tout ce qui gêne mes déplacements et j’ôte les petits tapis pour éviter de tomber")
  ];

  window.QuizCore.createQuizPage({
    questions,
    rootId: 'quiz',
    finalView: (currentQuiz) => {
      if (currentQuiz.score >= 2) {
        return `
          <h1>Quiz terminé !</h1>
          <h3> Votre score est de : ${currentQuiz.score} / ${currentQuiz.questions.length}</h3>
          <h2>Votre score vous permet d'être un aide domicile.</h2>
          <a href="https://www.shiva.fr/formulaire-recrutement?gclid=CjwKCAiAr6-ABhAfEiwADO4sfXoGd7MVDTGSXRl6HcE4w-OpB9px8vfvfTLszq2nrxIrdQ5j1hlg4RoCiEgQAvD_BwE">Rejoignez nos équipes d’aides à domicile</a>
          <br>
          <a href="index.html">Retour à la page d'accueil</a>
        `;
      }

      return `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${currentQuiz.score} / ${currentQuiz.questions.length}</h3>
        <a href="index.html"> Retour à la page d'accueil </a>
      `;
    },
  });
}());
