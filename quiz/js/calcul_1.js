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
	if(testExistence(cname))
		concatCookie(cname,cvalue);
}

function entierAleatoire(min, max){
    	return Math.floor(Math.random() * (max - min + 1)) + min;
}
var resultat = 0;
function creerCalcul(){
  
	var operateurs = ["+", "-", "*", "/"];
	var choixOP = operateurs[Math.floor(Math.random()*operateurs.length)]
	var nombre1 = -1,nombre2 = -1;
	if (choixOP == "/") {
		nombre1 = entierAleatoire(0,10);
		nombre2 = entierAleatoire(1,10);
		while (nombre1 < 2 * nombre2 ) {
		nombre2 = entierAleatoire(1,10);
		}
	} 
	else{
		nombre1 = entierAleatoire(0,10);
		nombre2 = entierAleatoire(0,10);
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
      /* enregistement du score utilisateur */
		enregistrerResultat("scoreCalcul",score);	
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