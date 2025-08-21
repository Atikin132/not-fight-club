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
const enemy = document.querySelector('[data-enemy]');
const attackBtn = document.querySelector('[data-attack-button]');
const fightLog = document.querySelector('[data-fight-log]');

let playerName = '';

function showScreen(screenKey = 'home') {
  const screenId = screenKey === 'home' ? 'main' : screenKey;

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  document.querySelector('.page-title').textContent = pageTitles[screenId];
}

function updateName(name) {
  document.querySelectorAll('.profile-name, .profile-name-settings, .player-name')
    .forEach(el => el.textContent = name);
  playerName = name;
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














const enemysArray = [
  {
    name: 'Spider',
    imageUrl: './assets/img/enemy/spider_100.png',
    health: 100
  },
  {
    name: 'Spacemarine',
    imageUrl: './assets/img/enemy/Spacemarine.png',
    health: 120
  },
  {
    name: 'Snow troll',
    imageUrl: './assets/img/enemy/SnowTroll.png',
    health: 150
  }
];

let enemyNameForAttackBtn = '';
let enemyHealthForAttackBtn = 0;

const initEnemy = () => {
  const randomNumber = Math.floor(Math.random() * enemysArray.length);

  const enemyName = document.createElement('p');
  enemyName.classList.add('enemy-name');
  enemyName.textContent = enemysArray[randomNumber].name;

  const enemyImg = document.createElement('img');
  enemyImg.src = enemysArray[randomNumber].imageUrl;
  enemyImg.alt = 'Enemy';
  enemyImg.classList.add('enemy-img');

  const healthContainer = document.createElement('div');
  healthContainer.classList.add('health-container');

  const progress = document.createElement('progress');
  progress.classList.add('enemy-health-bar');
  progress.value = enemysArray[randomNumber].health;
  progress.max = enemysArray[randomNumber].health;

  const healthTextP = document.createElement('p');
  const span = document.createElement('span');
  span.classList.add('lives-left');
  span.textContent = enemysArray[randomNumber].health;

  enemyNameForAttackBtn = enemysArray[randomNumber].name;
  enemyHealthForAttackBtn = enemysArray[randomNumber].health;

  healthTextP.appendChild(span);
  healthTextP.appendChild(document.createTextNode(`/${enemysArray[randomNumber].health}`));

  healthContainer.appendChild(progress);
  healthContainer.appendChild(healthTextP);

  enemy.appendChild(enemyName);
  enemy.appendChild(enemyImg);
  enemy.appendChild(healthContainer);
}

const defenseOption = document.querySelectorAll('[data-defence-option]');
const attackOption = document.querySelectorAll('input[name="attackOption"]');

let selectedQueue = [];

attackOption.forEach(radio => {
  radio.addEventListener('change', () => {
    if (selectedQueue.length === 2 && checkRadio()) {
      attackBtn.style.opacity = '1';
      attackBtn.style.cursor = 'pointer';
    }
  });
});

const checkRadio = () => document.querySelector('input[name="attackOption"]:checked');

defenseOption.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      selectedQueue.push(checkbox);

      if (selectedQueue.length > 2) {
        const first = selectedQueue.shift();
        first.checked = false;
      }
      if (selectedQueue.length === 2 && checkRadio()) {
        attackBtn.style.opacity = '1';
        attackBtn.style.cursor = 'pointer';
      }
    } else {
      selectedQueue = selectedQueue.filter(cb => cb !== checkbox);
      attackBtn.style.opacity = '0.5';
      attackBtn.style.cursor = 'not-allowed';
    }
  });
});

const attackDefenseArray = ['Head', 'Neck', 'Body', 'Belly', 'Legs'];

const playerHealthBar = document.querySelector('.player-health-bar');
const playerLivesLeft = document.querySelector('.player-lives-left');

let turnCount = 1;

const normalAttackPower = 10;
const critAttackPower = 15;

attackBtn.addEventListener('click', () => {
  if (getComputedStyle(attackBtn).cursor !== 'not-allowed') {
    const turnCountPre = document.createElement('pre');
    turnCountPre.textContent = `=======   Turn: ${turnCount}   =======`;
    fightLog.appendChild(turnCountPre);

    const playerAttackZone = checkRadio().value;
    const playerDefense1 = selectedQueue[0].value;
    const playerDefense2 = selectedQueue[1].value;

    switch (enemyNameForAttackBtn) {
      case 'Spider':
        const randomNumberSpiderAttack1 = Math.floor(Math.random() * attackDefenseArray.length);
        let randomNumberSpiderAttack2 = Math.floor(Math.random() * attackDefenseArray.length);
        while (randomNumberSpiderAttack2 === randomNumberSpiderAttack1) {
          randomNumberSpiderAttack2 = Math.floor(Math.random() * attackDefenseArray.length);
        }
        const randomNumberSpiderDefense = Math.floor(Math.random() * attackDefenseArray.length);
        const spiderAttackZone1 = attackDefenseArray[randomNumberSpiderAttack1];
        const spiderAttackZone2 = attackDefenseArray[randomNumberSpiderAttack2];
        const spiderDefense = attackDefenseArray[randomNumberSpiderDefense];

        const attackPlayerPower = critOrNormalAttack();
        if (attackPlayerPower === 15) {
          enemy.querySelector('.enemy-health-bar').value = enemy.querySelector('.enemy-health-bar').value - attackPlayerPower;
          enemy.querySelector('.lives-left').textContent = enemy.querySelector('.enemy-health-bar').value;
          if (playerAttackZone === spiderDefense) {
            critAttackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPlayerPower);
          }
          else {
            attackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPlayerPower);
          }
        }
        else if (playerAttackZone !== spiderDefense) {
          enemy.querySelector('.enemy-health-bar').value = enemy.querySelector('.enemy-health-bar').value - attackPlayerPower;
          enemy.querySelector('.lives-left').textContent = enemy.querySelector('.enemy-health-bar').value;
          attackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPlayerPower);
        }
        else {
          defenseLog(playerName, enemyNameForAttackBtn, playerAttackZone)
        }
        const spiderAttackPower1 = critOrNormalAttack();
        const spiderAttackPower2 = critOrNormalAttack();
        spiderAttack(spiderAttackPower1, spiderAttackZone1, playerDefense1, playerDefense2, enemyNameForAttackBtn)
        spiderAttack(spiderAttackPower2, spiderAttackZone2, playerDefense1, playerDefense2, enemyNameForAttackBtn)

        // if (spiderAttackPower1 === 15) {
        //   playerHealthBar.value = playerHealthBar.value - spiderAttackPower1;
        //   playerLivesLeft.textContent = playerHealthBar.value;
        //   if (spiderAttackZone1 === playerDefense1 || spiderAttackZone1 === playerDefense2) {
        //     critAttackLog(enemyNameForAttackBtn, playerName, spiderAttackZone1, spiderAttackPower1);
        //   }
        //   else {
        //     attackLog(enemyNameForAttackBtn, playerName, spiderAttackZone1, spiderAttackPower1);
        //   }
        // }
        // else if (spiderAttackZone1 !== playerDefense1 && spiderAttackZone1 !== playerDefense2) {
        //   playerHealthBar.value = playerHealthBar.value - spiderAttackPower1;
        //   playerLivesLeft.textContent = playerHealthBar.value;
        //   attackLog(enemyNameForAttackBtn, playerName, spiderAttackZone1, spiderAttackPower1);
        // }
        // else {
        //   defenseLog(enemyNameForAttackBtn, playerName, spiderAttackZone1);
        // }


        // if (spiderAttackPower2 === 15) {
        //   playerHealthBar.value = playerHealthBar.value - spiderAttackPower2;
        //   playerLivesLeft.textContent = playerHealthBar.value;
        //   if (spiderAttackZone2 === playerDefense1 || spiderAttackZone2 === playerDefense2) {
        //     critAttackLog(enemyNameForAttackBtn, playerName, spiderAttackZone2, spiderAttackPower2);
        //   }
        //   else {
        //     attackLog(enemyNameForAttackBtn, playerName, spiderAttackZone2, spiderAttackPower2);
        //   }
        // }
        // else if (spiderAttackZone2 !== playerDefense1 && spiderAttackZone2 !== playerDefense2) {
        //   playerHealthBar.value = playerHealthBar.value - spiderAttackPower2;
        //   playerLivesLeft.textContent = playerHealthBar.value;
        //   attackLog(enemyNameForAttackBtn, playerName, spiderAttackZone2, spiderAttackPower2);
        // }
        // else {
        //   defenseLog(enemyNameForAttackBtn, playerName, spiderAttackZone2);
        // }


        // if (spiderAttackZone1 !== playerDefense1 && spiderAttackZone1 !== playerDefense2) {
        //   const attackPower = critOrNormalAttack();
        //   playerHealthBar.value = playerHealthBar.value - attackPower;
        //   playerLivesLeft.textContent = playerHealthBar.value;
        //   attackLog(enemyNameForAttackBtn, playerName, spiderAttackZone1, attackPower);
        // } else {
        //   defenseLog(enemyNameForAttackBtn, playerName, spiderAttackZone1);
        // }
        // if (spiderAttackZone2 !== playerDefense1 && spiderAttackZone2 !== playerDefense2) {
        //   const attackPower = critOrNormalAttack();
        //   playerHealthBar.value = playerHealthBar.value - attackPower;
        //   playerLivesLeft.textContent = playerHealthBar.value;
        //   attackLog(enemyNameForAttackBtn, playerName, spiderAttackZone2, attackPower);
        // }
        // else {
        //   defenseLog(enemyNameForAttackBtn, playerName, spiderAttackZone2);
        // }
        if (enemy.querySelector('.enemy-health-bar').value <= 0 && playerHealthBar.value <= 0) {
          alert('Draw!!!');
          attackBtn.style.opacity = '0.5';
          attackBtn.style.cursor = 'not-allowed';
        }
        if (enemy.querySelector('.enemy-health-bar').value <= 0) {
          alert('You win!!!');
          attackBtn.style.opacity = '0.5';
          attackBtn.style.cursor = 'not-allowed';
        }
        if (playerHealthBar.value <= 0) {
          alert('You lose!!!');
          attackBtn.style.opacity = '0.5';
          attackBtn.style.cursor = 'not-allowed';
        }
        break;
      case 'Spacemarine':
        const randomNumberSpacemarineAttack = Math.floor(Math.random() * attackDefenseArray.length);
        const randomNumberSpacemarineDefense1 = Math.floor(Math.random() * attackDefenseArray.length);
        let randomNumberSpacemarineDefense2 = Math.floor(Math.random() * attackDefenseArray.length);
        while (randomNumberSpacemarineDefense2 === randomNumberSpacemarineDefense1) {
          randomNumberSpacemarineDefense2 = Math.floor(Math.random() * attackDefenseArray.length);
        }
        const spacemarineAttackZone = attackDefenseArray[randomNumberSpacemarineAttack];
        const spacemarineDefenseZone1 = attackDefenseArray[randomNumberSpacemarineDefense1];
        const spacemarineDefenseZone2 = attackDefenseArray[randomNumberSpacemarineDefense2];
        if (playerAttackZone !== spacemarineDefenseZone1 && playerAttackZone !== spacemarineDefenseZone2) {
          const attackPower = critOrNormalAttack();
          enemy.querySelector('.enemy-health-bar').value = enemy.querySelector('.enemy-health-bar').value - attackPower;
          enemy.querySelector('.lives-left').textContent = enemy.querySelector('.enemy-health-bar').value;
          attackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPower);
        }
        else {
          defenseLog(playerName, enemyNameForAttackBtn, playerAttackZone)
        }
        if (spacemarineAttackZone !== playerDefense1 && spacemarineAttackZone !== playerDefense2) {
          const attackPower = critOrNormalAttack();
          playerHealthBar.value = playerHealthBar.value - attackPower;
          playerLivesLeft.textContent = playerHealthBar.value;
          attackLog(enemyNameForAttackBtn, playerName, spacemarineAttackZone, attackPower);
        } else {
          defenseLog(enemyNameForAttackBtn, playerName, spacemarineAttackZone);
        }

        if (enemy.querySelector('.enemy-health-bar').value === 0) {
          alert('You win!!!');
          attackBtn.style.opacity = '0.5';
          attackBtn.style.cursor = 'not-allowed';
        }
        break;
      case 'Snow troll':
        const randomNumberSnowTrollAttack = Math.floor(Math.random() * attackDefenseArray.length);
        const randomNumberSnowTrollDefense1 = Math.floor(Math.random() * attackDefenseArray.length);
        let randomNumberSnowTrollDefense2 = Math.floor(Math.random() * attackDefenseArray.length);
        let randomNumberSnowTrollDefense3 = Math.floor(Math.random() * attackDefenseArray.length);

        while (randomNumberSnowTrollDefense2 === randomNumberSnowTrollDefense1) {
          randomNumberSnowTrollDefense2 = Math.floor(Math.random() * attackDefenseArray.length);
        }
        console.log("randomNumberSnowTrollDefense1" + randomNumberSnowTrollDefense1);

        console.log("randomNumberSnowTrollDefense2" + randomNumberSnowTrollDefense2);
        console.log("randomNumberSnowTrollDefense3" + randomNumberSnowTrollDefense3);


        while (randomNumberSnowTrollDefense3 === randomNumberSnowTrollDefense1 || randomNumberSnowTrollDefense3 === randomNumberSnowTrollDefense2) {
          randomNumberSnowTrollDefense3 = Math.floor(Math.random() * attackDefenseArray.length);
        }

        const snowTrollAttackZone = attackDefenseArray[randomNumberSnowTrollAttack];
        const snowTrollDefenseZone1 = attackDefenseArray[randomNumberSnowTrollDefense1];
        const snowTrollDefenseZone2 = attackDefenseArray[randomNumberSnowTrollDefense2];
        const snowTrollDefenseZone3 = attackDefenseArray[randomNumberSnowTrollDefense3];

        if (playerAttackZone !== snowTrollDefenseZone1 && playerAttackZone !== snowTrollDefenseZone2 && playerAttackZone !== snowTrollDefenseZone3) {
          const attackPower = critOrNormalAttack();
          enemy.querySelector('.enemy-health-bar').value = enemy.querySelector('.enemy-health-bar').value - attackPower;
          enemy.querySelector('.lives-left').textContent = enemy.querySelector('.enemy-health-bar').value;
          attackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPower);
        }
        else {
          defenseLog(playerName, enemyNameForAttackBtn, playerAttackZone)
        }
        if (snowTrollAttackZone !== playerDefense1 && snowTrollAttackZone !== playerDefense2) {
          const attackPower = critOrNormalAttack();
          playerHealthBar.value = playerHealthBar.value - attackPower;
          playerLivesLeft.textContent = playerHealthBar.value;
          attackLog(enemyNameForAttackBtn, playerName, snowTrollAttackZone, attackPower);
        } else {
          defenseLog(enemyNameForAttackBtn, playerName, snowTrollAttackZone);
        }

        if (enemy.querySelector('.enemy-health-bar').value === 0) {
          alert('You win!!!');
          attackBtn.style.opacity = '0.5';
          attackBtn.style.cursor = 'not-allowed';
        }
        break;
    }

    turnCount++;
  }
})

function attackLog(attacker, defender, attackZone, damage) {
  const attack = document.createElement('p');
  if (damage === 10) {
    attack.innerHTML = `<strong style="color: darkblue;">${attacker}</strong> attacked <strong style="color: darkblue;">${defender}</strong> to <strong style="color: darkblue;">${attackZone}</strong> and deal <strong>${damage} damage.</strong>`;
  }
  else {
    const damageElement = document.createElement("strong");
    damageElement.textContent = `${damage} damage.`;
    damageElement.style.color = 'darkred';
    attack.innerHTML = `<strong style="color: darkblue;">${attacker}</strong> attacked <strong style="color: darkblue;">${defender}</strong> to <strong style="color: darkblue;">${attackZone}</strong> and crit `;
    attack.appendChild(damageElement);
  }
  fightLog.appendChild(attack);
  fightLog.scrollTop = fightLog.scrollHeight;
}

function defenseLog(attacker, defender, attackZone) {
  const attack = document.createElement('p');
  attack.innerHTML = `<strong style="color: darkblue;">${attacker}</strong> attacked <strong style="color: darkblue;">${defender}</strong> to <strong style="color: darkblue;">${attackZone}</strong> but ${defender} was able to protect his ${attackZone}.`;
  fightLog.appendChild(attack);
  fightLog.scrollTop = fightLog.scrollHeight;
}

function critAttackLog(attacker, defender, attackZone, damage) {
  const attack = document.createElement('p');
  attack.innerHTML = `<strong style="color: darkblue;">${attacker}</strong> attacked <strong style="color: darkblue;">${defender}</strong> to <strong style="color: darkblue;">${attackZone}</strong> ${defender} tried to block but ${attacker} was very lucky and crit his oppenent for <strong style="color: darkred;">15 damage.</strong>`;
  fightLog.appendChild(attack);
  fightLog.scrollTop = fightLog.scrollHeight;
}

const critOrNormalAttack = () => {
  return Math.random() < 0.5 ? critAttackPower : normalAttackPower;
}

function spiderAttack(spiderAttackPower, spiderAttackZone, playerDefense1, playerDefense2, enemyNameForAttackBtn){
  if (spiderAttackPower === 15) {
    playerHealthBar.value = playerHealthBar.value - spiderAttackPower;
    playerLivesLeft.textContent = playerHealthBar.value;
    if (spiderAttackZone === playerDefense1 || spiderAttackZone === playerDefense2) {
      critAttackLog(enemyNameForAttackBtn, playerName, spiderAttackZone, spiderAttackPower);
    }
    else {
      attackLog(enemyNameForAttackBtn, playerName, spiderAttackZone, spiderAttackPower);
    }
  }
  else if (spiderAttackZone !== playerDefense1 && spiderAttackZone !== playerDefense2) {
    playerHealthBar.value = playerHealthBar.value - spiderAttackPower;
    playerLivesLeft.textContent = playerHealthBar.value;
    attackLog(enemyNameForAttackBtn, playerName, spiderAttackZone, spiderAttackPower);
  }
  else {
    defenseLog(enemyNameForAttackBtn, playerName, spiderAttackZone);
  }
}




init();
initEnemy();

