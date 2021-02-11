//noPressEnter(document.body);
    function entierAleatoire(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var resultat = 0;
    function creerCalcul(){
      
      var operateurs = ["+", "-", "*", "/"];
      var choixOP = operateurs[Math.floor(Math.random()*operateurs.length)]
      var nombre1 = -1,nombre2 = -1;
      if (choixOP == "/") {
        nombre1 = entierAleatoire(0,100);
        nombre2 = entierAleatoire(1,100);
        while (nombre1 < 2 * nombre2 ) {
          nombre2 = entierAleatoire(1,100);
        }
      } 
      else{
        nombre1 = entierAleatoire(0,100);
        nombre2 = entierAleatoire(0,100);
      }
      switch(choixOP){
        case "/": resultat = nombre1 / nombre2; break;
        case "*": resultat = nombre1 * nombre2; break;
        case "-": resultat = nombre1 - nombre2; break;
        default : resultat = nombre1 + nombre2;
      }
      
      document.getElementById('question').innerHTML=nombre1 + choixOP + nombre2;
      document.getElementById('resultat').innerHTML = "";
    }
    
    var btn = document.getElementById('bouton');
    var res;
    /* changement du score */
    var score = 0; 
    
    /* var compteur nombre de questions */
    var cpt = 1;

    btn.onclick = function() {
      if (btn.value === 'Valider') {
        res = document.getElementById('resultatBarre').value; 
        if(cpt == 4){
          document.getElementById('bouton').disabled = true;
          document.getElementById('fin').innerHTML = "<a href=\"../index.html\">retourner au menu principal</a>"; 
        }
        if(res == resultat){
          document.getElementById('resultat').innerHTML = "Bonne réponse";
          score += 1;
          document.getElementById('score').innerHTML = score;
          creerCalcul();
        }
        else{
          document.getElementById('resultat').innerHTML = "mauvaise réponse";
          creerCalcul();
        }
        cpt++;
      }
    }
    creerCalcul();