(function () {
 const CookieStorage = window.QuizCore ? window.QuizCore.CookieStorage : {
   setCookie: (name, value) => { document.cookie = `${name}=${encodeURIComponent(value)};path=/;`; },
   getCookie: (name) => {
     const match = document.cookie.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${name}=`));
     return match ? decodeURIComponent(match.split('=')[1]) : '';
   },
 };

 function afficherElement(id, text) {
   const element = document.getElementById(id);
   if (element) {
     element.innerHTML = text;
   }
 }

 function calculTotal() {
   const tableau = document.getElementById('table');
   if (!tableau || tableau.rows.length === 0) {
     return;
   }

   let totalCalcul = 0;
   let totalComprehension = 0;
   let totalQCM = 0;

   for (let i = 1; i < tableau.rows.length; i += 1) {
     const colonneCalcul = tableau.rows[i].cells.item(tableau.rows[0].cells.length - 3);
     const colonneComprehension = tableau.rows[i].cells.item(tableau.rows[0].cells.length - 2);
     const colonneQCM = tableau.rows[i].cells.item(tableau.rows[0].cells.length - 1);

     totalCalcul += colonneCalcul && colonneCalcul.innerText ? parseInt(colonneCalcul.innerText, 10) || 0 : 0;
     totalComprehension += colonneComprehension && colonneComprehension.innerText ? parseInt(colonneComprehension.innerText, 10) || 0 : 0;
     totalQCM += colonneQCM && colonneQCM.innerText ? parseInt(colonneQCM.innerText, 10) || 0 : 0;
   }

   tableau.rows[tableau.rows.length - 1].cells.item(tableau.rows[0].cells.length - 3).innerHTML = totalCalcul;
   tableau.rows[tableau.rows.length - 1].cells.item(tableau.rows[0].cells.length - 2).innerHTML = totalComprehension;
   tableau.rows[tableau.rows.length - 1].cells.item(tableau.rows[0].cells.length - 1).innerHTML = totalQCM;
 }

 function checkCookie() {
   let nom = CookieStorage.getCookie('nom');

   if (nom === '') {
     nom = prompt('Entrez votre nom:', '') || '';
     if (nom !== '') {
       CookieStorage.setCookie('nom', nom);
     }
   }

   afficherElement('nom', nom);

   const scoreCalcul = CookieStorage.getCookie('scoreCalcul');
   const scoreComprehension = CookieStorage.getCookie('scoreComprehension');
   const scoreQCM = CookieStorage.getCookie('scoreQCM');

   const tableauScoreCalcul = scoreCalcul ? scoreCalcul.split('/') : [];
   const tableauScoreComprehension = scoreComprehension ? scoreComprehension.split('/') : [];
   const tableauScoreQCM = scoreQCM ? scoreQCM.split('/') : [];

   if (tableauScoreCalcul.length === 0 && tableauScoreComprehension.length === 0 && tableauScoreQCM.length === 0) {
     afficherElement('table', `
       <thead>
         <tr>
           <th> Partie N° </th>
           <th> Calcul </th>
           <th>comprenhension </th>
           <th>QCM </th>
         </tr>
       </thead>
     `);
     return;
   }

   const lignes = [];
   const maxLength = Math.max(tableauScoreCalcul.length, tableauScoreComprehension.length, tableauScoreQCM.length);

   for (let i = 0; i < maxLength; i += 1) {
     lignes.push(`
       <tr>
         <td>${i + 1}</td>
         <td>${tableauScoreCalcul[i] || ''}</td>
         <td>${tableauScoreComprehension[i] || ''}</td>
         <td>${tableauScoreQCM[i] || ''}</td>
       </tr>
     `);
   }

   lignes.push(`
     <tr style="border-style: double;">
       <td>Total</td>
       <td></td>
       <td></td>
       <td></td>
     </tr>
   `);

   afficherElement('table', `
     <thead>
       <tr>
         <th> Partie N° </th>
         <th> Calcul </th>
         <th>comprenhension </th>
         <th>QCM </th>
       </tr>
     </thead>
     <tbody>${lignes.join('')}</tbody>
   `);
   calculTotal();
 }

 window.onload = checkCookie;
}());
