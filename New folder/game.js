const player = document.getElementById("player");
const game = document.getElementById("game");
const hpBar = document.getElementById("hp");

let hp = 100;
let x = 100;
let y = 30;
let velocityY = 0;
let jumping = false;

let weapon = "Sword";

// Enemy system
let enemies = [];

function spawnEnemy() {
  const e = document.createElement("div");
  e.className = "enemy";
  e.innerText = "👹";
  e.style.left = Math.random() * 800 + "px";
  e.hp = 40;
  game.appendChild(e);
  enemies.push(e);
}
for (let i = 0; i < 3; i++) spawnEnemy();

// Player movement
function move(dx) {
  x += dx;
  if (x < 0) x = 0;
  if (x > 850) x = 850;
  player.style.left = x + "px";
}

// Jump system (fake 3D)
function jump() {
  if (!jumping) {
    jumping = true;
    velocityY = 12;
  }
}

// Gravity loop
setInterval(() => {
  if (jumping) {
    y += velocityY;
    velocityY -= 1;
    if (y <= 30) {
      y = 30;
      jumping = false;
    }
    player.style.bottom = y + "px";
  }
}, 30);

// Keyboard controls
document.addEventListener("keydown", e => {
  if (e.key === "a") move(-20);
  if (e.key === "d") move(20);
  if (e.key === "w") jump();
  if (e.key === "j") attack();
  if (e.key === "k") comboAttack();
  if (e.key === "l") changeWeapon();
});

// Sword animation
function attack() {
  const sword = document.createElement("div");
  sword.className = "sword";
  sword.style.left = x + 40 + "px";
  sword.style.bottom = y + 40 + "px";
  game.appendChild(sword);

  setTimeout(() => sword.remove(), 150);

  damageEnemies(20);
  particles(x + 40, y + 40);
}

// Combo attack
function comboAttack() {
  for (let i = 0; i < 3; i++) {
    setTimeout(attack, i * 100);
  }
}

// Weapon system
function changeWeapon() {
  if (weapon === "Sword") weapon = "Axe 🪓";
  else weapon = "Sword ⚔️";
  document.getElementById("weapon").innerText = "Weapon: " + weapon;
}

// Damage enemies
function damageEnemies(dmg) {
  enemies.forEach((e, i) => {
    let ex = parseInt(e.style.left);
    if (Math.abs(ex - x) < 100) {
      e.hp -= dmg;
      if (e.hp <= 0) {
        e.remove();
        enemies.splice(i, 1);
        spawnEnemy();
      }
    }
  });
}

// Particle effects
function particles(px, py) {
  for (let i = 0; i < 10; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = px + "px";
    p.style.bottom = py + "px";
    game.appendChild(p);

    let dx = (Math.random() - 0.5) * 10;
    let dy = Math.random() * 10;

    let interval = setInterval(() => {
      px += dx;
      py += dy;
      dy -= 0.5;
      p.style.left = px + "px";
      p.style.bottom = py + "px";
    }, 30);

    setTimeout(() => {
      clearInterval(interval);
      p.remove();
    }, 400);
  }
}

// Enemy AI attack
setInterval(() => {
  enemies.forEach(e => {
    let ex = parseInt(e.style.left);
    if (Math.abs(ex - x) < 80) {
      hp -= 2;
      hpBar.style.width = hp + "%";
      if (hp <= 0) {
        alert("💀 Kratos died! Game Over!");
        location.reload();
      }
    }
  });
}, 500);
