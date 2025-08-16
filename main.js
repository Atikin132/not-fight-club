const pageTitles = {
  main: 'Main',
  battle: 'Battle',
  profile: 'Character',
  settings: 'Settings'
};

const registerForm = document.querySelector('.register-form');
const fightBtn = document.querySelector('.fight-button');
const inputRegister = document.querySelector('[data-input-register]')

function showScreen(screenKey = 'home') {
  const screenId = screenKey === 'home' ? 'main' : screenKey;

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  document.querySelector('.page-title').textContent = pageTitles[screenId];

  console.log("showScreen - " + location.hash)
}

function updateName(name) {
  document.querySelectorAll('.profile-name, .profile-name-settings, .player-name')
    .forEach(el => el.textContent = name);
}

function init() {
  const name = localStorage.getItem('characterName');

  if (name) {
    updateName(name);
    showScreen('home');
  } else {
    document.querySelector('header').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    showScreen('register');
  }
}

registerForm.addEventListener('submit', () => {
  const name = inputRegister.value.trim();
  if (name) {
    localStorage.setItem('characterName', name);
    updateName(name);
    showScreen('home');
  }
});

init();
