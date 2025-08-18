const pageTitles = {
  main: 'Main',
  battle: 'Battle',
  profile: 'Character',
  settings: 'Settings'
};

const registerForm = document.querySelector('.register-form');
const inputRegister = document.querySelector('[data-input-register]');
const profileNameSettings = document.querySelector('[data-profile-name-settings]');
const editButton = document.querySelector('[data-edit-button]');
const inputNameSettings = document.querySelector('[data-input-name-settings]');
const formNameSettings = document.querySelector('[data-form-name-settings]');
const imgProfile = document.querySelector('[data-img-profile]');
const editCharacter = document.querySelector('[data-edit-character]');
const сharacterСontainer = document.querySelector('[data-character-container]');
const charactersForm = document.querySelector('[data-characters-form]');
const cross = document.querySelector('[data-cross-form]');
const formOverlay = document.querySelector('[data-form-overlay]');
const characterFormContainer1 = document.querySelector('[data-character-form-container1]');
const imgForm1 = document.querySelector('[data-img-form1]');
const confirmCharacter1 = document.querySelector('[data-confirm-character1]');
const characterFormContainer2 = document.querySelector('[data-character-form-container2]');
const imgForm2 = document.querySelector('[data-img-form2]');
const confirmCharacter2 = document.querySelector('[data-confirm-character2]');
const characterFormContainer3 = document.querySelector('[data-character-form-container3]');
const imgForm3 = document.querySelector('[data-img-form3]');
const confirmCharacter3 = document.querySelector('[data-confirm-character3]');
const characterFormContainer4 = document.querySelector('[data-character-form-container4]');
const imgForm4 = document.querySelector('[data-img-form4]');
const confirmCharacter4 = document.querySelector('[data-confirm-character4]');


function showScreen(screenKey = 'home') {
  const screenId = screenKey === 'home' ? 'main' : screenKey;

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  document.querySelector('.page-title').textContent = pageTitles[screenId];
}

function updateName(name) {
  document.querySelectorAll('.profile-name, .profile-name-settings, .player-name')
    .forEach(el => el.textContent = name);
}

function updateCharacter(imageUrl) {
  document.querySelectorAll('.character-img')
    .forEach(el => el.src = imageUrl);
}

function editNickName() {
  inputNameSettings.setCustomValidity('');

  if (editButton.textContent !== 'Save') {
    inputNameSettings.setCustomValidity('');
    profileNameSettings.textContent = '';
    inputNameSettings.style.display = 'inline';
    editButton.textContent = 'Save';
  }
  else {
    if (inputNameSettings.value.trim() !== '') {
      updateName(inputNameSettings.value);
      localStorage.setItem('characterName', inputNameSettings.value.trim());
      editButton.textContent = 'Edit';
      inputNameSettings.style.display = 'none';
      profileNameSettings.textContent = inputNameSettings.value.toString();
    } else {
      inputNameSettings.setCustomValidity('The field must not be empty');

      if (!formNameSettings.checkValidity()) {
        inputNameSettings.reportValidity();
        return;
      }
    }
  }
}

inputNameSettings.addEventListener('input', () => {
  inputNameSettings.setCustomValidity('');
});

function init() {
  const name = localStorage.getItem('characterName');

  if (name) {
    updateName(name);
    updateCharacter(localStorage.getItem('characterImage'));
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
    localStorage.setItem('characterImage', './assets/img/character/default.jpg');
    updateName(name);
    updateCharacter('./assets/img/character/default.jpg');
    showScreen('home');
  }
});


сharacterСontainer.addEventListener('mouseenter', () => {
  imgProfile.style.opacity = '0.5';
  editCharacter.style.display = 'block';
});

сharacterСontainer.addEventListener('mouseleave', () => {
  imgProfile.style.opacity = '1';
  editCharacter.style.display = 'none';
});

editCharacter.addEventListener('click', () => {
  charactersForm.classList.toggle('hidden');
  formOverlay.style.display = 'block';
})

cross.addEventListener('click', () => {
  charactersForm.classList.toggle('hidden');
  formOverlay.style.display = 'none';
})

formOverlay.addEventListener('click', () => {
  charactersForm.classList.toggle('hidden');
  formOverlay.style.display = 'none';
})

characterFormContainer1.addEventListener('mouseenter', () => {
  imgForm1.style.opacity = '0.5';
  confirmCharacter1.style.display = 'block';
});

characterFormContainer1.addEventListener('mouseleave', () => {
  imgForm1.style.opacity = '1';
  confirmCharacter1.style.display = 'none';
});
characterFormContainer2.addEventListener('mouseenter', () => {
  imgForm2.style.opacity = '0.5';
  confirmCharacter2.style.display = 'block';
});

characterFormContainer2.addEventListener('mouseleave', () => {
  imgForm2.style.opacity = '1';
  confirmCharacter2.style.display = 'none';
});
characterFormContainer3.addEventListener('mouseenter', () => {
  imgForm3.style.opacity = '0.5';
  confirmCharacter3.style.display = 'block';
});

characterFormContainer3.addEventListener('mouseleave', () => {
  imgForm3.style.opacity = '1';
  confirmCharacter3.style.display = 'none';
});
characterFormContainer4.addEventListener('mouseenter', () => {
  imgForm4.style.opacity = '0.5';
  confirmCharacter4.style.display = 'block';
});

characterFormContainer4.addEventListener('mouseleave', () => {
  imgForm4.style.opacity = '1';
  confirmCharacter4.style.display = 'none';
});

confirmCharacter1.addEventListener('click', () => {
  charactersForm.classList.toggle('hidden');
  formOverlay.style.display = 'none';
  localStorage.setItem('characterImage', './assets/img/character/default.jpg');
  updateCharacter('./assets/img/character/default.jpg');
})
confirmCharacter2.addEventListener('click', () => {
  charactersForm.classList.toggle('hidden');
  formOverlay.style.display = 'none';
  localStorage.setItem('characterImage', './assets/img/character/avatar1.png');
  updateCharacter('./assets/img/character/avatar1.png');
})
confirmCharacter3.addEventListener('click', () => {
  charactersForm.classList.toggle('hidden');
  formOverlay.style.display = 'none';
  localStorage.setItem('characterImage', './assets/img/character/avatar2.jpg');
  updateCharacter('./assets/img/character/avatar2.jpg');
})
confirmCharacter4.addEventListener('click', () => {
  charactersForm.classList.toggle('hidden');
  formOverlay.style.display = 'none';
  localStorage.setItem('characterImage', './assets/img/character/avatar3.jpg');
  updateCharacter('./assets/img/character/avatar3.jpg');
})

init();
