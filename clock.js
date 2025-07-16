// HORLOGE 
let cadre = document.getElementById('cadre');
let chiffre = [];
const kanji = ['十二','一','二','三','四','五','六','七','八','九','十','十一'];

for (let i = 0; i < 12; i++) {
    let span = document.createElement('span');
    span.classList.add(`chiffre${i}`, 'chiffre');
    span.textContent = kanji[i];
    cadre.appendChild(span);
    chiffre[i] = span;
}

function positionChiffre() {
    let largeur = cadre.offsetWidth;
    let bordure = 15;
    let fontSize = chiffre[0].offsetHeight || 40;
    let rayon = (largeur / 2) - bordure - (fontSize / 2);
    for (let i = 0; i < 12; i++) {
        let angle = i * 30;
        chiffre[i].style.transform =
            `translate(-50%, -50%) rotate(${angle}deg) translateY(-${rayon}px) rotate(${-angle}deg)`;
    }
}
positionChiffre();
window.addEventListener('resize', positionChiffre);

// ANIMATION AIGUILLES
function updateAiguilles() {
  let now = new Date();
  let heures = now.getHours() % 12;
  let minutes = now.getMinutes();
  let secondes = now.getSeconds();

  let angleHeures = heures * 30 + minutes * 0.5;
  let angleMinutes = minutes * 6 + secondes * 0.1;
  let angleSecondes = secondes * 6;

  document.getElementById('heure').style.transform = `rotate(${angleHeures}deg)`;
  document.getElementById('minute').style.transform = `rotate(${angleMinutes}deg)`;
  document.getElementById('seconde').style.transform = `rotate(${angleSecondes}deg)`;
}


updateAiguilles();
setInterval(updateAiguilles, 1000);

// MINUTEUR
const heureCible = document.getElementById('heureCible');
const minuteCible = document.getElementById('minuteCible');
const startAlarmBtn = document.getElementById('startAlarmBtn');
const alarmSound = document.getElementById('alarmSound');
const alarmStatus = document.getElementById('alarmStatus');

let alarmActive = false;

startAlarmBtn.addEventListener('click', () => {
  let h = parseInt(heureCible.value);
  let m = parseInt(minuteCible.value);

  if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
    alert("Entrez une heure valide (ex: 14h30)");
    return;
  }

  alarmActive = true;
  alarmStatus.textContent = `Alarme réglée à ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
});

setInterval(() => {
  if (!alarmActive) return;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();

  const targetHour = parseInt(heureCible.value);
  const targetMinute = parseInt(minuteCible.value);

  if (currentHour === targetHour && currentMinute === targetMinute && currentSecond === 0) {
    alarmActive = false;
    alarmStatus.textContent = "Alarme déclenchée !";
    alarmSound.play();
  }
}, 1000);
