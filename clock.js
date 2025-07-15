let cadre = document.getElementById('cadre');
let chiffre = [];
const kanji = ['十二','一','二','三','四','五','六','七','八','九','十','十一'];

// Génération dynamique des chiffres en cercle
for (let i = 0; i < 12; i++) {
    let span = document.createElement('span');
    span.classList.add(`chiffre${i}`, 'chiffre');
    span.textContent = kanji[i];
    cadre.appendChild(span);
    chiffre[i] = span;
}

function positionChiffre() {
    // Calcule la distance au centre dynamiquement selon la taille du cadran
    let largeur = cadre.offsetWidth;
    let bordure = 15;
    let fontSize = chiffre[0].offsetHeight || 40; // sécurité si non rendu
    let rayon = (largeur / 2) - bordure - (fontSize / 2);

    for (let i = 0; i < chiffre.length; i++) {
        let angle = i * 30;
        // Correction spécifique pour le 11 si besoin :
        
        chiffre[i].style.transform =
            `translate(-50%, -50%) rotate(${angle}deg) translateY(-200px) rotate(${-angle}deg)`;
    }
}
positionChiffre();
window.addEventListener('resize', positionChiffre); // Responsive

// Animation des aiguilles
let aiguilleHeure = document.getElementById('heure');
let aiguilleMinute = document.getElementById('minute');
let aiguilleSeconde = document.getElementById('seconde');

function updateAiguilles() {
    let now = new Date();
    let heures = now.getHours() % 12;
    let minutes = now.getMinutes();
    let secondes = now.getSeconds();

    let angleHeures = heures * 30 + minutes * 0.5 + 180;
    let angleMinutes = minutes * 6 + secondes * 0.1 + 180;
    let angleSecondes = secondes * 6 + 180;

    aiguilleHeure.style.transform =
      `translate(-50%, 0) rotate(${angleHeures}deg)`;
    aiguilleMinute.style.transform =
      `translate(-50%, 0) rotate(${angleMinutes}deg)`;
    aiguilleSeconde.style.transform =
      `translate(-50%, 0) rotate(${angleSecondes}deg)`;
}

updateAiguilles();
setInterval(updateAiguilles, 1000); 
