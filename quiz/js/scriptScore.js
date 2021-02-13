//export {enregistrerResultat};

/** setter sur un cookie en particulier
 * 
 * @param { cookie que l'on veut créer/mettre à jour sa valeur} cname 
 * @param {valeur à affecter au cookie} cvalue 
 */
function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/;" ;
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
    var nouvelleValeur = document.cookie.split('; ').find(row => row.startsWith(cname)).split('=')[1];;
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
        setCookie(cname,cvalue)
    if(testExistence(cname))
        concatCookie(cname,cvalue)
}

/** tester si la valeur du cookie n'est pas vie et non null
 * 
 * @param {nom du cookie} cname 
 */
function cookieNotEmptyAndNotNull(cname){
    return (document.cookie.split('; ').find(row => row.startsWith(cname)) != "" && document.cookie.split('; ').find(row => row.startsWith(cname)) != null);
}

/** tester si la valeur passer en paramètre est non vide et non null
 * 
 * @param {chaine de caractère} tab 
 */
function scoreNotEmptyAndNotNull(tab){
    return (tab != "" && tab != null);
}

/** obtenir la valeu du cookie
 * 
 * @param {nom du cookie} cname 
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * fonction qui sert à initialiser le nom utilisateur et à afficher le tableau de valeur
 */
function checkCookie() {
    //reset("nom");
    var nom = getCookie("nom");
    /** on définit le nom de l'utilisateur */
    if(nom == ""){
        nom = prompt("Entrez votre nom:", "");
        if (nom != "" && nom != null) {
            //nom =  nom.toUpperCase;
            setCookie("nom",nom );
            afficherElement("nom",nom);
        }
    }
    afficherElement("nom",nom);

    /* variable qui contiennent le score utilisateur */
    if(cookieNotEmptyAndNotNull("scoreCalcul"))
        var scoreCalcul = document.cookie.split('; ').find(row => row.startsWith("scoreCalcul")).split('=')[1];
    if(cookieNotEmptyAndNotNull("scoreComprehension"))
        var scoreComprehension = document.cookie.split('; ').find(row => row.startsWith("scoreComprehension")).split('=')[1];
    if(cookieNotEmptyAndNotNull("scoreQCM"))
        var scoreQCM = document.cookie.split('; ').find(row => row.startsWith("scoreQCM")).split('=')[1];
    var tableauScoreCalcul ="", tableauScoreComprehension="",tableauScoreQCM="";
    /*
        reset("scoreCalcul");
        reset("scoreComprehension");
        reset("scoreQCM");
        reset("nom");
    */
    if (scoreCalcul != "" || scoreComprehension != "" || scoreQCM != "") {
        if(scoreNotEmptyAndNotNull(scoreCalcul))
            tableauScoreCalcul = scoreCalcul.split('/');
        if(scoreNotEmptyAndNotNull(scoreComprehension))
            tableauScoreComprehension = scoreComprehension.split('/');
        if(scoreNotEmptyAndNotNull(scoreQCM))
            tableauScoreQCM = scoreQCM.split('/');

        var lignes = "";
        var numeroPartie = 1;
        for(let i = 0,j =0,k=0; i < tableauScoreCalcul.length || j < tableauScoreComprehension.length || k < tableauScoreQCM.length; i++,j++,k++,numeroPartie++){
            lignes += `
                <tr>
                    <td> ${numeroPartie} </td>
                    <td> ${tableauScoreCalcul[i] != undefined ? tableauScoreCalcul[i] :"" } </td>
                    <td>${tableauScoreComprehension[j]!= undefined ? tableauScoreComprehension[j] :"" } </td>
                    <td>${tableauScoreQCM[k]!= undefined ? tableauScoreQCM[k] :"" }</td>
                </tr>
            `;
        }
        
        table = `
        <thead>
            <tr>
                <th> Partie N° </th>
                <th> Calcul </th>
                <th>comprenhension </th>
                <th>QCM </th>
            </tr>
        </thead>
        <tbody>
            ${lignes}
        </tbody> 
        `;

        afficherElement("table",table);
    } else {
        table = `
        <thead>
            <tr>
                <th> Partie N° </th>
                <th> Calcul </th>
                <th>comprenhension </th>
                <th>QCM </th>
            </tr>
        </thead> 
        `;
        afficherElement("table",table);
    }
}

/** fonction d'affichage des données dans le html
 * 
 * @param {balise id dans laquelle on veut inserer les données} id 
 * @param {données à inserer} text 
 */
function afficherElement(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
}

 // au chargement de la fenetre on lance l'affichage du tableau
window.onload= checkCookie();
