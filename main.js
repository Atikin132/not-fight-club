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
const characterFormContainer = document.querySelectorAll('[data-character-form-container]');
const enemy = document.querySelector('[data-enemy]');
const attackBtn = document.querySelector('[data-attack-button]');
const fightLog = document.querySelector('[data-fight-log]');
const wins = document.querySelector('[data-wins]');
const loses = document.querySelector('[data-loses]');
const playerHealthBar = document.querySelector('.player-health-bar');
const playerLivesLeft = document.querySelector('.player-lives-left');

let saveLogArray = [];

let playerName = '';

let isBattleInterrupted = 'false';

playerHealthBar.value = 150;

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
  isBattleInterrupted = localStorage.getItem('isBattleInterrupted');

  if (name) {
    updateName(name);
    updateCharacter(localStorage.getItem('characterImage'));
    showScreen('home');
    wins.textContent = localStorage.getItem('wins');
    loses.textContent = localStorage.getItem('loses');
  } else {
    document.querySelector('header').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    showScreen('register');
  }
  if (isBattleInterrupted === 'true') {
    playerHealthBar.value = localStorage.getItem('playerHealth');
    playerLivesLeft.textContent = playerHealthBar.value;
    saveLogArray = JSON.parse(localStorage.getItem('saveLogArray'));
    saveLogArray.forEach((string) => {
      const temp = document.createElement('div');
      temp.innerHTML = string;
      fightLog.appendChild(temp);
    });
  }
}

registerForm.addEventListener('submit', () => {
  const name = inputRegister.value.trim();
  if (name) {
    localStorage.setItem('characterName', name);
    localStorage.setItem('characterImage', './assets/img/character/default.jpg');
    localStorage.setItem('wins', '0');
    localStorage.setItem('loses', '0');
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

characterFormContainer.forEach(container => {
  container.addEventListener('mouseenter', () => {
    container.querySelector('.character-img-form').style.opacity = '0.5';
    container.querySelector('.confirm-character').style.display = 'block';
  });

  container.addEventListener('mouseleave', () => {
    container.querySelector('.character-img-form').style.opacity = '1';
    container.querySelector('.confirm-character').style.display = 'none';
  });

  container.querySelector('.confirm-character').addEventListener('click', () => {
    charactersForm.classList.toggle('hidden');
    formOverlay.style.display = 'none';
    const imageUrl = container.querySelector('.character-img-form').src;
    const relativePath = imageUrl.replace(/^.*\/assets/, './assets');
    localStorage.setItem('characterImage', relativePath);
    updateCharacter(relativePath);
  });
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
let randomNumber = 0;

const initEnemy = () => {
  if (isBattleInterrupted === 'true') {
    randomNumber = localStorage.getItem('randomNumberEnemy');
  }
  else {
    randomNumber = Math.floor(Math.random() * enemysArray.length);
    localStorage.setItem('randomNumberEnemy', randomNumber);
  }

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

  if (isBattleInterrupted === 'true') {
    progress.value = localStorage.getItem('enemyHealth');
  }
  else {
    progress.value = enemysArray[randomNumber].health;
  }
  progress.max = enemysArray[randomNumber].health;

  const healthTextP = document.createElement('p');
  const span = document.createElement('span');
  span.classList.add('lives-left');
  span.textContent = progress.value;

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

let turnCount = 1;

const normalAttackPower = 10;
const critAttackPower = 15;

attackBtn.addEventListener('click', () => {
  if (getComputedStyle(attackBtn).cursor !== 'not-allowed') {
    const turnCountPre = document.createElement('pre');
    turnCount = Number(localStorage.getItem('turnCount')) + 1;
    turnCountPre.textContent = `=======   Turn: ${turnCount}   =======`;
    fightLog.appendChild(turnCountPre);
    saveLogArray.push(turnCountPre.outerHTML);

    isBattleInterrupted = 'true';
    localStorage.setItem('isBattleInterrupted', isBattleInterrupted);

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

        const attackPlayerPowerSpider = critOrNormalAttack();
        if (attackPlayerPowerSpider === 15) {
          enemy.querySelector('.enemy-health-bar').value = enemy.querySelector('.enemy-health-bar').value - attackPlayerPowerSpider;
          enemy.querySelector('.lives-left').textContent = enemy.querySelector('.enemy-health-bar').value;
          if (playerAttackZone === spiderDefense) {
            critAttackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPlayerPowerSpider);
          }
          else {
            attackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPlayerPowerSpider);
          }
        }
        else if (playerAttackZone !== spiderDefense) {
          enemy.querySelector('.enemy-health-bar').value = enemy.querySelector('.enemy-health-bar').value - attackPlayerPowerSpider;
          enemy.querySelector('.lives-left').textContent = enemy.querySelector('.enemy-health-bar').value;
          attackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPlayerPowerSpider);
        }
        else {
          defenseLog(playerName, enemyNameForAttackBtn, playerAttackZone);
        }
        const spiderAttackPower1 = critOrNormalAttack();
        const spiderAttackPower2 = critOrNormalAttack();
        enemyAttack(spiderAttackPower1, spiderAttackZone1, playerDefense1, playerDefense2, enemyNameForAttackBtn);
        enemyAttack(spiderAttackPower2, spiderAttackZone2, playerDefense1, playerDefense2, enemyNameForAttackBtn);

        localStorage.setItem('playerHealth', playerHealthBar.value);
        localStorage.setItem('enemyHealth', enemy.querySelector('.enemy-health-bar').value);
        localStorage.setItem('saveLogArray', JSON.stringify(saveLogArray));

        winLoseDraw();
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

        const attackPlayerPowerSpacemarine = critOrNormalAttack();

        if (attackPlayerPowerSpacemarine === 15) {
          enemy.querySelector('.enemy-health-bar').value = enemy.querySelector('.enemy-health-bar').value - attackPlayerPowerSpacemarine;
          enemy.querySelector('.lives-left').textContent = enemy.querySelector('.enemy-health-bar').value;
          if (playerAttackZone === spacemarineDefenseZone1 || playerAttackZone === spacemarineDefenseZone2) {
            critAttackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPlayerPowerSpacemarine);
          }
          else {
            attackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPlayerPowerSpacemarine);
          }
        }
        else if (playerAttackZone !== spacemarineDefenseZone1 && playerAttackZone !== spacemarineDefenseZone2) {
          enemy.querySelector('.enemy-health-bar').value = enemy.querySelector('.enemy-health-bar').value - attackPlayerPowerSpacemarine;
          enemy.querySelector('.lives-left').textContent = enemy.querySelector('.enemy-health-bar').value;
          attackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPlayerPowerSpacemarine);
        }
        else {
          defenseLog(playerName, enemyNameForAttackBtn, playerAttackZone);
        }

        const spacemarineAttackPower = critOrNormalAttack();
        enemyAttack(spacemarineAttackPower, spacemarineAttackZone, playerDefense1, playerDefense2, enemyNameForAttackBtn);

        localStorage.setItem('playerHealth', playerHealthBar.value);
        localStorage.setItem('enemyHealth', enemy.querySelector('.enemy-health-bar').value);
        localStorage.setItem('saveLogArray', JSON.stringify(saveLogArray));

        winLoseDraw();
        break;

      case 'Snow troll':
        const randomNumberSnowTrollAttack = Math.floor(Math.random() * attackDefenseArray.length);
        const randomNumberSnowTrollDefense1 = Math.floor(Math.random() * attackDefenseArray.length);
        let randomNumberSnowTrollDefense2 = Math.floor(Math.random() * attackDefenseArray.length);
        let randomNumberSnowTrollDefense3 = Math.floor(Math.random() * attackDefenseArray.length);

        while (randomNumberSnowTrollDefense2 === randomNumberSnowTrollDefense1) {
          randomNumberSnowTrollDefense2 = Math.floor(Math.random() * attackDefenseArray.length);
        }
        while (randomNumberSnowTrollDefense3 === randomNumberSnowTrollDefense1 || randomNumberSnowTrollDefense3 === randomNumberSnowTrollDefense2) {
          randomNumberSnowTrollDefense3 = Math.floor(Math.random() * attackDefenseArray.length);
        }

        const snowTrollAttackZone = attackDefenseArray[randomNumberSnowTrollAttack];
        const snowTrollDefenseZone1 = attackDefenseArray[randomNumberSnowTrollDefense1];
        const snowTrollDefenseZone2 = attackDefenseArray[randomNumberSnowTrollDefense2];
        const snowTrollDefenseZone3 = attackDefenseArray[randomNumberSnowTrollDefense3];

        const attackPlayerPowerSnowTroll = critOrNormalAttack();

        if (attackPlayerPowerSnowTroll === 15) {
          enemy.querySelector('.enemy-health-bar').value = enemy.querySelector('.enemy-health-bar').value - attackPlayerPowerSnowTroll;
          enemy.querySelector('.lives-left').textContent = enemy.querySelector('.enemy-health-bar').value;
          if (playerAttackZone === snowTrollDefenseZone1 || playerAttackZone === snowTrollDefenseZone2 || playerAttackZone === snowTrollDefenseZone3) {
            critAttackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPlayerPowerSnowTroll);
          }
          else {
            attackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPlayerPowerSnowTroll);
          }
        }
        else if (playerAttackZone !== snowTrollDefenseZone1 && playerAttackZone !== snowTrollDefenseZone2 && playerAttackZone !== snowTrollDefenseZone3) {
          enemy.querySelector('.enemy-health-bar').value = enemy.querySelector('.enemy-health-bar').value - attackPlayerPowerSnowTroll;
          enemy.querySelector('.lives-left').textContent = enemy.querySelector('.enemy-health-bar').value;
          attackLog(playerName, enemyNameForAttackBtn, playerAttackZone, attackPlayerPowerSnowTroll);
        }
        else {
          defenseLog(playerName, enemyNameForAttackBtn, playerAttackZone);
        }

        const snowTrollAttackPower = critOrNormalAttack();
        enemyAttack(snowTrollAttackPower, snowTrollAttackZone, playerDefense1, playerDefense2, enemyNameForAttackBtn);

        localStorage.setItem('playerHealth', playerHealthBar.value);
        localStorage.setItem('enemyHealth', enemy.querySelector('.enemy-health-bar').value);
        localStorage.setItem('saveLogArray', JSON.stringify(saveLogArray));

        winLoseDraw();
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
    const damageElement = document.createElement('strong');
    damageElement.textContent = `${damage} damage.`;
    damageElement.style.color = 'darkred';
    attack.innerHTML = `<strong style="color: darkblue;">${attacker}</strong> attacked <strong style="color: darkblue;">${defender}</strong> to <strong style="color: darkblue;">${attackZone}</strong> and crit `;
    attack.appendChild(damageElement);
  }
  fightLog.appendChild(attack);
  fightLog.scrollTop = fightLog.scrollHeight;
  saveLogArray.push(attack.outerHTML);
}

function defenseLog(attacker, defender, attackZone) {
  const attack = document.createElement('p');
  attack.innerHTML = `<strong style="color: darkblue;">${attacker}</strong> attacked <strong style="color: darkblue;">${defender}</strong> to <strong style="color: darkblue;">${attackZone}</strong> but ${defender} was able to protect his ${attackZone}.`;
  fightLog.appendChild(attack);
  fightLog.scrollTop = fightLog.scrollHeight;
  saveLogArray.push(attack.outerHTML);

}

function critAttackLog(attacker, defender, attackZone, damage) {
  const attack = document.createElement('p');
  attack.innerHTML = `<strong style="color: darkblue;">${attacker}</strong> attacked <strong style="color: darkblue;">${defender}</strong> to <strong style="color: darkblue;">${attackZone}</strong> ${defender} tried to block but ${attacker} was very lucky and crit his oppenent for <strong style="color: darkred;">15 damage.</strong>`;
  fightLog.appendChild(attack);
  fightLog.scrollTop = fightLog.scrollHeight;
  saveLogArray.push(attack.outerHTML);
}

const critOrNormalAttack = () => {
  const randomNumber = Math.floor(Math.random() * 10);
  return randomNumber > 7 ? critAttackPower : normalAttackPower;
}

function enemyAttack(enemyAttackPower, enemyAttackZone, playerDefense1, playerDefense2, enemyNameForAttackBtn) {
  if (enemyAttackPower === 15) {
    playerHealthBar.value = playerHealthBar.value - enemyAttackPower;
    playerLivesLeft.textContent = playerHealthBar.value;
    if (enemyAttackZone === playerDefense1 || enemyAttackZone === playerDefense2) {
      critAttackLog(enemyNameForAttackBtn, playerName, enemyAttackZone, enemyAttackPower);
    }
    else {
      attackLog(enemyNameForAttackBtn, playerName, enemyAttackZone, enemyAttackPower);
    }
  }
  else if (enemyAttackZone !== playerDefense1 && enemyAttackZone !== playerDefense2) {
    playerHealthBar.value = playerHealthBar.value - enemyAttackPower;
    playerLivesLeft.textContent = playerHealthBar.value;
    attackLog(enemyNameForAttackBtn, playerName, enemyAttackZone, enemyAttackPower);
  }
  else {
    defenseLog(enemyNameForAttackBtn, playerName, enemyAttackZone);
  }
}

function winLoseDraw() {
  localStorage.setItem('turnCount', turnCount);
  if (enemy.querySelector('.enemy-health-bar').value <= 0 && playerHealthBar.value <= 0) {
    alert('Draw!!!');
    resetBattle();
  }
  else if (enemy.querySelector('.enemy-health-bar').value <= 0) {
    alert('You win!!!');
    wins.textContent = Number(wins.textContent) + 1;
    localStorage.setItem('wins', wins.textContent);
    resetBattle();
  }
  else if (playerHealthBar.value <= 0) {
    alert('You lose!!!');
    loses.textContent = Number(loses.textContent) + 1;
    localStorage.setItem('loses', loses.textContent);
    resetBattle();
  }
}

function resetBattle() {
  attackBtn.style.opacity = '0.5';
  attackBtn.style.cursor = 'not-allowed';
  isBattleInterrupted = 'false';
  localStorage.setItem('isBattleInterrupted', isBattleInterrupted);
  localStorage.removeItem('playerHealth');
  localStorage.removeItem('enemyHealth');
  localStorage.removeItem('saveLogArray');
  localStorage.removeItem('randomNumberEnemy');
  localStorage.removeItem('turnCount');
  location.reload();
}


init();
initEnemy();

